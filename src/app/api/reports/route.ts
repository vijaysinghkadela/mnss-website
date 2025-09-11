import { NextResponse } from "next/server";

// Supabase removed. Return static placeholder list.
export async function GET() {
  const sample = [
    { id: 1, year: "2024-25", title: "Annual Progress Report 2024-25" },
    { id: 2, year: "2023-24", title: "Annual Progress Report 2023-24" },
  ];
  return NextResponse.json(sample);
}

export const revalidate = 60;
