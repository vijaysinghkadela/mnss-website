import { NextResponse } from "next/server";
import { getDb } from '@/lib/mongodb';

// Simple donations endpoint creating a donation intent and returning a UPI deep link.
// For real-time confirmation integrate a payment gateway (Razorpay/Cashfree) and verify signatures.

const UPI_VPA = process.env.NEXT_PUBLIC_UPI_VPA || "example@upi"; // Replace with real VPA
const UPI_PAYEE_NAME = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME || "MNSS";

function buildUpiLink(amount: number, note: string, reference?: string) {
  const params = new URLSearchParams({
    pa: UPI_VPA,
    pn: UPI_PAYEE_NAME,
    am: amount.toFixed(2),
    cu: "INR",
    tn: note.slice(0, 40),
  });
  if (reference) params.set("tr", reference);
  return `upi://pay?${params.toString()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
    const { amount, donor_name, donor_email, note = 'Donation' } = body;
    if (typeof amount !== 'number' || amount <= 0) return NextResponse.json({ success: false, message: 'Amount must be positive' }, { status: 422 });

    const reference = `DON-${Date.now()}`;
    const upiLink = buildUpiLink(amount, note, reference);

    const db = await getDb();
    await db.collection('payments').insertOne({
      amount,
      currency: 'INR',
      method: 'upi',
      status: 'initiated',
      reference,
      donor_name: donor_name || null,
      donor_email: donor_email || null,
      meta: { note },
      created_at: new Date()
    });

    return NextResponse.json({ success: true, data: { reference, upiLink } });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unexpected error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}