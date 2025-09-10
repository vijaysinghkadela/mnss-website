import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
      // Gracefully degrade with empty array so UI still renders
      return NextResponse.json([], { status: 200 });
    }
    const db = await getDb();
    const docs = await db
      .collection("reports")
      .find(
        {},
        {
          projection: {
            description: 1,
            image_url: 1,
            video_url: 1,
            status: 1,
            created_at: 1,
          },
        }
      )
      .sort({ created_at: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json(docs);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("/api/reports MongoDB error", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}

// Revalidate data every 10 seconds to ensure freshness
export const revalidate = 0; // dynamic with MongoDB
