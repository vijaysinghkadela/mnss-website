import { NextResponse } from "next/server";

// Supabase auth removed: middleware now pass-through.
// TODO: Implement custom auth or JWT verification if needed later.
export function middleware() {
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
