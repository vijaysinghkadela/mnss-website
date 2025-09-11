import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({
		ok: true,
		message: 'Summary endpoint temporarily stubbed',
		data: {
			reports: 0,
			uploadsEnabled: false
		}
	});
}
