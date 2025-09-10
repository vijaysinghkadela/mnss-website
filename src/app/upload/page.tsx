"use client";
import ImageUploadForm from "../../components/ImageUploadForm";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ReportDoc {
  _id?: string;
  image_url?: string | null;
  description?: string;
  created_at?: string;
}

function RecentImages() {
  const [items, setItems] = useState<ReportDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/reports", { cache: "no-store" });
        const data = await res.json();
        const filtered = Array.isArray(data)
          ? data.filter((d: ReportDoc) => d.image_url)
          : [];
        setItems(filtered.slice(0, 8));
      } catch {
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!items.length)
    return <p className="text-sm text-gray-500">No images yet.</p>;

  return (
    <ul className="grid grid-cols-2 gap-3">
      {items.map((img) => (
        <li
          key={img._id || img.image_url}
          className="group relative rounded overflow-hidden border border-gray-200 bg-gray-50"
        >
          {img.image_url && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.image_url}
                alt={img.description || "Uploaded image"}
                className="w-full h-32 object-cover group-hover:opacity-90 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-1">
                <p className="text-[10px] text-white line-clamp-2 leading-tight">
                  {img.description}
                </p>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Upload Images</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add a new image with a short description. Supported formats: JPG,
            PNG, WEBP, GIF, SVG (max 10MB).
          </p>
          <p className="text-sm text-gray-500">
            Need full dashboard features?{" "}
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              Go to Dashboard
            </Link>
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <ImageUploadForm />
          <aside className="bg-white rounded-xl shadow p-6 border border-gray-200 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recently Uploaded
            </h2>
            <RecentImages />
          </aside>
        </div>
      </div>
    </main>
  );
}
