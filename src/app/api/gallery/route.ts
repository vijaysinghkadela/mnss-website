import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { promises as fs } from 'fs';
import path from 'path';

// Gallery listing now derives from MongoDB 'reports' collection (image_url / video_url fields).
// Query params supported: kind=image|video, limit (default 50)
// If both image & video exist in a single report, both are emitted as separate entries.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kind = searchParams.get("kind"); // optional filter
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "50", 10),
      200
    );

    const noDb = !process.env.MONGODB_URI || !process.env.MONGODB_DB;
    if (noDb) {
      // Fallback: list files from /public/uploads/images and /public/uploads/videos
      const uploadsRoot = path.join(process.cwd(), 'public', 'uploads');
      const imagesDir = path.join(uploadsRoot, 'images');
      const videosDir = path.join(uploadsRoot, 'videos');
      let imageFiles: string[] = [];
      let videoFiles: string[] = [];
      try { imageFiles = await fs.readdir(imagesDir); } catch { /* ignore */ }
      try { videoFiles = await fs.readdir(videosDir); } catch { /* ignore */ }

      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const videoExts = ['.mp4', '.webm', '.ogg', '.mpeg', '.mov'];

      const imgItems = imageFiles.filter(f => imageExts.some(ext => f.toLowerCase().endsWith(ext)))
        .map(f => ({
          name: f,
          path: `/uploads/images/${f}`,
          url: `/uploads/images/${f}`,
          kind: 'image' as const,
          description: '',
          createdAt: null
        }));

      const vidItems = videoFiles.filter(f => videoExts.some(ext => f.toLowerCase().endsWith(ext)))
        .map(f => ({
          name: f,
          path: `/uploads/videos/${f}`,
          url: `/uploads/videos/${f}`,
          kind: 'video' as const,
          description: '',
          createdAt: null
        }));

      let all = [...imgItems, ...vidItems];
      if (kind === 'image') all = all.filter(i => i.kind === 'image');
      else if (kind === 'video') all = all.filter(i => i.kind === 'video');

      return NextResponse.json({ success: true, items: all.slice(0, limit) });
    }

    const db = await getDb();
    // Fetch recent reports containing at least one media asset
    const cursor = db
      .collection("reports")
      .find(
        { $or: [{ image_url: { $ne: null } }, { video_url: { $ne: null } }] },
        {
          projection: {
            description: 1,
            image_url: 1,
            video_url: 1,
            created_at: 1,
          },
        }
      )
      .sort({ created_at: -1 })
      .limit(limit);
    const docs = await cursor.toArray();

    type GalleryItem = {
      name: string;
      path: string;
      url: string;
      kind: "image" | "video";
      description?: string;
      createdAt?: Date | string | null;
    };

    const items: GalleryItem[] = [];
    for (const doc of docs) {
      const createdAt = doc.created_at || null;
      if (doc.image_url) {
        items.push({
          name: doc.image_url.split("/").pop() || "image",
          path: doc.image_url,
          url: doc.image_url,
          kind: "image",
          description: doc.description,
          createdAt,
        });
      }
      if (doc.video_url) {
        items.push({
          name: doc.video_url.split("/").pop() || "video",
          path: doc.video_url,
          url: doc.video_url,
          kind: "video",
          description: doc.description,
          createdAt,
        });
      }
    }

    const filtered = kind ? items.filter((i) => i.kind === kind) : items;
    return NextResponse.json({
      success: true,
      items: filtered.slice(0, limit),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
