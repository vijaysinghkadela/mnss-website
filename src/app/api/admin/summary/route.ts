import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// Admin summary: totals + recent payments (donations)
export async function GET() {
  try {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
      return NextResponse.json({
        success: true,
        totals: { paymentsCount: 0, totalAmount: 0 },
        recentPayments: [],
        degraded: true,
      });
    }
    const db = await getDb();
    const paymentsCol = db.collection("payments");

    const [counts, sumResult, recent] = await Promise.all([
      paymentsCol.estimatedDocumentCount(),
      paymentsCol
        .aggregate([
          { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
        ])
        .toArray(),
      paymentsCol
        .find(
          {},
          {
            projection: {
              amount: 1,
              currency: 1,
              method: 1,
              status: 1,
              reference: 1,
              donor_name: 1,
              donor_email: 1,
              created_at: 1,
            },
          }
        )
        .sort({ created_at: -1 })
        .limit(10)
        .toArray(),
    ]);

    const totalAmount = sumResult[0]?.totalAmount || 0;

    return NextResponse.json({
      success: true,
      totals: {
        paymentsCount: counts,
        totalAmount,
      },
      recentPayments: recent,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
