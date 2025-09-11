import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const body = await req.json().catch(() => ({}));
	// Stub: echo the received payload
	return NextResponse.json({ ok: true, received: body });
}
