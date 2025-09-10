"use client";

import { useEffect, useState } from 'react';

interface PaymentRow {
  _id: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  reference: string;
  donor_name?: string | null;
  donor_email?: string | null;
  created_at?: string;
}

interface SummaryData {
  success: boolean;
  totals?: { paymentsCount: number; totalAmount: number };
  recentPayments?: PaymentRow[];
  message?: string;
}

export default function AdminSummary() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/summary', { cache: 'no-store' });
        const json: SummaryData = await res.json();
        if (!json.success) throw new Error(json.message || 'Failed');
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <aside className="p-6 bg-white border border-gray-200 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-bold text-gray-800">Donation Summary</h2>
      {loading && <p className="text-sm mt-2">Loading...</p>}
      {error && <p className="text-sm mt-2 text-red-600">{error}</p>}
      {!loading && !error && data && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-gray-500">Total Payments</p>
              <p className="text-lg font-semibold">{data.totals?.paymentsCount ?? 0}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-gray-500">Total Amount</p>
              <p className="text-lg font-semibold">₹{(data.totals?.totalAmount ?? 0).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Recent Payments</h3>
            <ul className="space-y-2 max-h-64 overflow-auto pr-1">
              {data.recentPayments && data.recentPayments.length ? (
                data.recentPayments.map(p => (
                  <li key={p._id} className="text-xs p-2 border border-gray-100 rounded flex flex-col bg-white/50">
                    <div className="flex justify-between">
                      <span className="font-medium">₹{p.amount}</span>
                      <span className="text-gray-500">{p.method}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 mt-1">
                      <span>{p.status}</span>
                      <span>{new Date(p.created_at || '').toLocaleDateString()}</span>
                    </div>
                    {p.donor_name && <span className="mt-1 text-gray-600">{p.donor_name}</span>}
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-500">No payments yet.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}
