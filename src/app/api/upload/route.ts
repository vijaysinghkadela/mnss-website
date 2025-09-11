import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { MediaItem, MediaType } from "@/types";

export const dynamic = "force-dynamic"; // ensure Node runtime and no edge caching

const publicDir = path.join(process.cwd(), "public");
const imagesDir = path.join(publicDir, "uploads", "images");
const videosDir = path.join(publicDir, "uploads", "videos");

const IMAGE_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const VIDEO_MIME: Record<string, string> = {
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/ogg": ".ogv",
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function ensureDirs() {
  await fs.mkdir(imagesDir, { recursive: true });
  await fs.mkdir(videosDir, { recursive: true });
}

export async function POST(req: Request) {
  try {
    await ensureDirs();

    const form = await req.formData();
    const file = form.get("file");
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const explicitType = String(form.get("type") || "").trim() as MediaType | "";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: "No file uploaded." }, { status: 400 });
    }

    const mime = file.type || "";
  const isVideoByMime = mime.startsWith("video/");

    let type: MediaType;
    if (explicitType === "image" || explicitType === "video") {
      type = explicitType;
    } else if (isVideoByMime) {
      type = "video";
    } else {
      type = "image"; // default to image
    }

    const allowedMap = type === "image" ? IMAGE_MIME : VIDEO_MIME;
    const allowedMimes = Object.keys(allowedMap);
    if (!allowedMimes.includes(mime)) {
      return NextResponse.json(
        { success: false, message: `Unsupported ${type} mime type: ${mime || "unknown"}` },
        { status: 400 }
      );
    }

    const originalName = (file as File).name || `upload-${Date.now()}`;
    const origExt = path.extname(originalName);
    const mappedExt = allowedMap[mime] || origExt || (type === "image" ? ".jpg" : ".mp4");
    const baseName = slugify(originalName.replace(/\.[^.]+$/, "")) || `file-${Date.now()}`;
    const filename = `${baseName}-${Date.now()}${mappedExt}`;
    const targetDir = type === "image" ? imagesDir : videosDir;
    const targetPath = path.join(targetDir, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(targetPath, buffer);

    const url = `/uploads/${type === "image" ? "images" : "videos"}/${filename}`;
    const item: MediaItem = {
      id: `${type}-${filename}`,
      type,
      url,
      title: title || filename,
      description,
      createdAt: new Date().toISOString(),
      filename,
    };

    return NextResponse.json({ success: true, item });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
