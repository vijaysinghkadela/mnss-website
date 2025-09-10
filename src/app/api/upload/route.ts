import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Constraints (adjust if needed)
 */
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg", // some browsers / environments still emit this legacy form
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "image/heic",
  "image/heif",
];
const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/mpeg",
];

type UploadedAsset = {
  kind: "image" | "video";
  path: string;
  publicUrl: string;
};

// Helper to build consistent error responses
function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

async function saveToLocal(opts: {
  file: File;
  folder: string;
  kind: "image" | "video";
}): Promise<UploadedAsset> {
  const { file, folder, kind } = opts;
  const uploadRoot = path.join(process.cwd(), "public", "uploads");
  const subDir = path.join(uploadRoot, folder);
  await fs.mkdir(subDir, { recursive: true });
  const ext = path.extname(file.name) || "";
  const base = crypto.randomBytes(8).toString("hex");
  const filename = `${Date.now()}_${base}${ext}`;
  const filePath = path.join(subDir, filename);
  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  const publicPath = `/uploads/${folder}/${filename}`;
  return { kind, path: filePath, publicUrl: publicPath };
}

export async function POST(request: Request) {
  try {
    if (request.method !== "POST") {
      return jsonError("Method not allowed", 405);
    }

    const form = await request.formData();

    const rawDescription = form.get("description");
    const imageField = form.get("image");
    const videoField = form.get("video");

    const description =
      typeof rawDescription === "string" ? rawDescription.trim() : "";
    const imageFile = imageField instanceof File ? imageField : null;
    const videoFile = videoField instanceof File ? videoField : null;

    if (!description) return jsonError("Description is required", 422);
    if (!imageFile && !videoFile)
      return jsonError("At least one of image or video is required", 422);

    // Validate image constraints
    if (imageFile) {
      const mime = imageFile.type.toLowerCase();
      let allowed = ALLOWED_IMAGE_TYPES.includes(mime);
      // Some environments provide blank type for SVG or others; fallback to extension sniff
      if (!allowed && (!mime || mime === '')) {
        const lowerName = imageFile.name.toLowerCase();
        const exts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".heic", ".heif"]; 
        allowed = exts.some(ext => lowerName.endsWith(ext));
      }
      // Generic image/* acceptance as a final fallback (excluding video types already separate)
      if (!allowed && mime.startsWith('image/')) allowed = true;
      if (!allowed) {
        return jsonError(`Unsupported image type: ${imageFile.type || imageFile.name}`, 415);
      }
      if (imageFile.size > MAX_IMAGE_BYTES) {
        return jsonError(
          `Image too large. Max ${(MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(
            0
          )}MB`,
          413
        );
      }
    }

    // Validate video constraints
    if (videoFile) {
      if (!ALLOWED_VIDEO_TYPES.includes(videoFile.type)) {
        return jsonError(`Unsupported video type: ${videoFile.type}`, 415);
      }
      if (videoFile.size > MAX_VIDEO_BYTES) {
        return jsonError(
          `Video too large. Max ${(MAX_VIDEO_BYTES / (1024 * 1024)).toFixed(
            0
          )}MB`,
          413
        );
      }
    }

    // Perform uploads (parallel where possible)
    const uploads: Promise<UploadedAsset>[] = [];
    if (imageFile)
      uploads.push(
        saveToLocal({ file: imageFile, folder: "images", kind: "image" })
      );
    if (videoFile)
      uploads.push(
        saveToLocal({ file: videoFile, folder: "videos", kind: "video" })
      );

    let uploaded: UploadedAsset[] = [];
    try {
      uploaded = await Promise.all(uploads);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Upload failed";
      return jsonError(message, 500);
    }

    const imageUrl =
      uploaded.find((u) => u.kind === "image")?.publicUrl || null;
    const videoUrl =
      uploaded.find((u) => u.kind === "video")?.publicUrl || null;

    const noDb = !process.env.MONGODB_URI || !process.env.MONGODB_DB;
    if (!noDb) {
      const db = await getDb();
      try {
        await db.collection("reports").insertOne({
          description,
            image_url: imageUrl,
            video_url: videoUrl,
            status: "Processing",
            created_at: new Date(),
          });
      } catch (dbErr) {
        // Attempt best-effort cleanup of written files
        await Promise.all(uploaded.map((u) => fs.unlink(u.path).catch(() => {})));
        const message = dbErr instanceof Error ? dbErr.message : "Database error";
        return jsonError(`Database error: ${message}`, 500);
      }
    }

    return NextResponse.json({ success: true, message: "Upload successful", data: { description, imageUrl, videoUrl, persisted: !noDb } });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error";
    console.error("/api/upload error", err);
    return jsonError(message, 500);
  }
}
