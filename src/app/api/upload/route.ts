import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient"; // still using Supabase storage for now
import { getDb } from '@/lib/mongodb';

/**
 * Constraints (adjust if needed)
 */
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/mpeg"];

type UploadedAsset = { kind: "image" | "video"; path: string; publicUrl: string };

// Helper to build consistent error responses
function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

async function uploadToBucket(opts: { file: File; folder: string; kind: "image" | "video" }): Promise<UploadedAsset> {
  const { file, folder, kind } = opts;
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const objectPath = `${folder}/${timestamp}_${sanitizedName}`;

  const { data, error } = await supabase.storage.from("media").upload(objectPath, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(`${kind} upload failed: ${error.message}`);
  const { data: pub } = supabase.storage.from("media").getPublicUrl(data.path);
  return { kind, path: data.path, publicUrl: pub.publicUrl };
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

    const description = typeof rawDescription === "string" ? rawDescription.trim() : "";
    const imageFile = imageField instanceof File ? imageField : null;
    const videoFile = videoField instanceof File ? videoField : null;

    if (!description) return jsonError("Description is required", 422);
    if (!imageFile && !videoFile) return jsonError("At least one of image or video is required", 422);

    // Validate image constraints
    if (imageFile) {
      if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
        return jsonError(`Unsupported image type: ${imageFile.type}`, 415);
      }
      if (imageFile.size > MAX_IMAGE_BYTES) {
        return jsonError(`Image too large. Max ${(MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(0)}MB`, 413);
      }
    }

    // Validate video constraints
    if (videoFile) {
      if (!ALLOWED_VIDEO_TYPES.includes(videoFile.type)) {
        return jsonError(`Unsupported video type: ${videoFile.type}`, 415);
      }
      if (videoFile.size > MAX_VIDEO_BYTES) {
        return jsonError(`Video too large. Max ${(MAX_VIDEO_BYTES / (1024 * 1024)).toFixed(0)}MB`, 413);
      }
    }

    // Perform uploads (parallel where possible)
    const uploads: Promise<UploadedAsset>[] = [];
    if (imageFile) uploads.push(uploadToBucket({ file: imageFile, folder: "images", kind: "image" }));
    if (videoFile) uploads.push(uploadToBucket({ file: videoFile, folder: "videos", kind: "video" }));

    let uploaded: UploadedAsset[] = [];
    try {
      uploaded = await Promise.all(uploads);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Upload failed";
      return jsonError(message, 500);
    }

    const imageUrl = uploaded.find(u => u.kind === "image")?.publicUrl || null;
    const videoUrl = uploaded.find(u => u.kind === "video")?.publicUrl || null;

    // Insert metadata into MongoDB reports collection
    const db = await getDb();
    try {
      await db.collection('reports').insertOne({
        description,
        image_url: imageUrl,
        video_url: videoUrl,
        status: 'Processing',
        created_at: new Date()
      });
    } catch (dbErr) {
      // Attempt best-effort cleanup of uploaded assets
      const pathsToRemove = uploaded.map(u => u.path);
      if (pathsToRemove.length) {
        await supabase.storage.from('media').remove(pathsToRemove);
      }
      const message = dbErr instanceof Error ? dbErr.message : 'Database error';
      return jsonError(`Database error: ${message}`, 500);
    }

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      data: { description, imageUrl, videoUrl },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected server error";
    console.error("/api/upload error", err);
    return jsonError(message, 500);
  }
}
