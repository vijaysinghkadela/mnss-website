import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json([]);
}

export async function POST(req: Request) {
	const body = await req.json().catch(() => ({}));
	return NextResponse.json({ ok: true, todo: body }, { status: 201 });
}
