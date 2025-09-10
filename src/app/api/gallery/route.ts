import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// Gallery listing now derives from MongoDB 'reports' collection (image_url / video_url fields).
// Query params supported: kind=image|video, limit (default 50)
// If both image & video exist in a single report, both are emitted as separate entries.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kind = searchParams.get('kind'); // optional filter
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

    const db = await getDb();
    // Fetch recent reports containing at least one media asset
    const cursor = db.collection('reports')
      .find({ $or: [ { image_url: { $ne: null } }, { video_url: { $ne: null } } ] }, {
        projection: { description: 1, image_url: 1, video_url: 1, created_at: 1 }
      })
      .sort({ created_at: -1 })
      .limit(limit);
    const docs = await cursor.toArray();

    type GalleryItem = {
      name: string;
      path: string;
      url: string;
      kind: 'image' | 'video';
      description?: string;
      createdAt?: Date | string | null;
    };

    const items: GalleryItem[] = [];
    for (const doc of docs) {
      const createdAt = doc.created_at || null;
      if (doc.image_url) {
        items.push({
          name: doc.image_url.split('/').pop() || 'image',
            path: doc.image_url,
            url: doc.image_url,
            kind: 'image',
            description: doc.description,
            createdAt
        });
      }
      if (doc.video_url) {
        items.push({
          name: doc.video_url.split('/').pop() || 'video',
          path: doc.video_url,
          url: doc.video_url,
          kind: 'video',
          description: doc.description,
          createdAt
        });
      }
    }

    const filtered = kind ? items.filter(i => i.kind === kind) : items;
    return NextResponse.json({ success: true, items: filtered.slice(0, limit) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
