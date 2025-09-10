import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = (formData.get("title") || "").toString().trim();
    if (!title)
      return NextResponse.json(
        { success: false, message: "Title required" },
        { status: 422 }
      );

    const db = await getDb();
    await db
      .collection("todos")
      .insertOne({ title, created_at: new Date(), completed: false });
    return NextResponse.redirect(new URL("/todos", request.url));
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
