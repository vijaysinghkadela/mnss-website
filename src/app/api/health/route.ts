import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  const result: { ok: boolean; db: string; timestamp: string } = {
    ok: true,
    db: "unknown",
    timestamp: new Date().toISOString(),
  };
  try {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
      result.db = "unconfigured";
      return NextResponse.json(result, { status: 200 });
    }
    const db = await getDb();
    // quick ping by running a lightweight command
    await db.command({ ping: 1 });
    result.db = "connected";
    return NextResponse.json(result, { status: 200 });
  } catch {
    result.db = "error";
    return NextResponse.json(result, { status: 200 });
  }
}
