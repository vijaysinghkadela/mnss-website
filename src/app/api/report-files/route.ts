import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// Accepts multipart/form-data with fields: description (string), file (PDF)
// Saves file under public/uploads/reports and stores metadata in MongoDB collection 'report_files'

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["application/pdf"];

function error(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(req: Request) {
  try {
  const noDb = !process.env.MONGODB_URI || !process.env.MONGODB_DB;

    const form = await req.formData();
    const rawDesc = form.get("description");
    const fileField = form.get("file");

    const description = typeof rawDesc === "string" ? rawDesc.trim() : "";
    if (!description) return error("Description required", 422);
    if (!(fileField instanceof File)) return error("File required", 422);

    const file = fileField;
    if (!ALLOWED_TYPES.includes(file.type))
      return error("Only PDF allowed", 415);
    if (file.size > MAX_FILE_BYTES)
      return error("File too large (max 15MB)", 413);

    const reportsDir = path.join(process.cwd(), "public", "uploads", "reports");
    await fs.mkdir(reportsDir, { recursive: true });
    const ext = path.extname(file.name) || ".pdf";
    const base = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}_${base}${ext}`;
    const fullPath = path.join(reportsDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(fullPath, Buffer.from(arrayBuffer));
    const publicUrl = `/uploads/reports/${filename}`;

    const doc = {
      description,
      file_url: publicUrl,
      original_name: file.name,
      size: file.size,
      mime: file.type,
      created_at: new Date(),
      persisted: !noDb,
    };
    if (!noDb) {
      const db = await getDb();
      await db.collection("report_files").insertOne(doc);
    }
    return NextResponse.json({ success: true, message: "Report uploaded", data: doc });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unexpected error";
    return error(msg, 500);
  }
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
      return NextResponse.json([]);
    }
    const db = await getDb();
    const docs = await db
      .collection("report_files")
      .find(
        {},
        {
          projection: {
            description: 1,
            file_url: 1,
            created_at: 1,
            original_name: 1,
            size: 1,
          },
        }
      )
      .sort({ created_at: -1 })
      .limit(50)
      .toArray();
  return NextResponse.json(docs);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
