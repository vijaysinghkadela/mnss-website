import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

/*
  Contact API
  POST /api/contact  -> store message
  GET  /api/contact?limit=20 -> list recent messages (for future admin use)
*/

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  created_at: Date;
  status: "new" | "read";
  _id?: import("mongodb").ObjectId;
}

function validate(body: unknown) {
  const errors: string[] = [];
  if (!body) return ["No body"];
  const b = body as Record<string, unknown>;
  if (!b.name || typeof b.name !== "string") errors.push("Name required");
  if (!b.email || typeof b.email !== "string") errors.push("Email required");
  if (!b.phone || typeof b.phone !== "string") errors.push("Phone required");
  if (!b.message || typeof b.message !== "string")
    errors.push("Message required");
  if (
    b.email &&
    typeof b.email === "string" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)
  )
    errors.push("Invalid email");
  return errors;
}

export async function POST(req: NextRequest) {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    return NextResponse.json(
      { success: false, message: "Database not configured" },
      { status: 503 }
    );
  }
  try {
    const json = await req.json();
    const errors = validate(json);
    if (errors.length) {
      return NextResponse.json(
        { success: false, message: errors.join(", ") },
        { status: 400 }
      );
    }
    const db = await getDb();
    const doc: ContactMessage = {
      name: json.name.trim(),
      email: json.email.trim().toLowerCase(),
      phone: json.phone.trim(),
      service: json.service || "",
      message: json.message.trim(),
      created_at: new Date(),
      status: "new",
    };
    const result = await db
      .collection<ContactMessage>("contact_messages")
      .insertOne(doc);
    return NextResponse.json(
      { success: true, id: result.insertedId, message: "Message stored" },
      { status: 201 }
    );
  } catch (err) {
    console.error("CONTACT_POST_ERROR", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    return NextResponse.json([], { status: 200 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "20", 10),
      100
    );
    const db = await getDb();
    const docs = await db
      .collection<ContactMessage>("contact_messages")
      .find(
        {},
        {
          projection: {
            message: 1,
            name: 1,
            email: 1,
            phone: 1,
            service: 1,
            created_at: 1,
            status: 1,
          },
        }
      )
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();
    return NextResponse.json(docs, { status: 200 });
  } catch (err) {
    console.error("CONTACT_GET_ERROR", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
