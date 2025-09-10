"use client";
import { useState, FormEvent } from "react";

interface DonationResponse {
  success: boolean;
  data?: { reference: string; upiLink: string };
  message?: string;
}

export default function DonationForm() {
  const [amount, setAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("");
  const [upiLink, setUpiLink] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Creating donation...");
    setIsSubmitting(true);
    setUpiLink(null);
    setReference(null);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donor_name: donorName || undefined,
            donor_email: email || undefined,
            note: "Website Donation",
        }),
      });
      const json: DonationResponse = await res.json();
      if (!json.success) throw new Error(json.message || "Failed");
      setUpiLink(json.data!.upiLink);
      setReference(json.data!.reference);
      setStatus("Donation intent created. Use the UPI link or scan the QR below.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Donate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
          <input
            type="number"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (optional)</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Generate UPI Link"}
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
      {upiLink && (
        <div className="mt-4 space-y-2">
          <a
            href={upiLink}
            className="text-blue-600 text-sm underline break-all"
          >
            {upiLink}
          </a>
          {reference && <p className="text-xs text-gray-500">Reference: {reference}</p>}
          {/* Future: show QR code (e.g., use a lightweight QR lib) */}
        </div>
      )}
    </div>
  );
}