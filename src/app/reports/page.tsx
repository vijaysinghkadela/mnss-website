"use client";
import { useState, useEffect, FormEvent } from "react";

interface ReportFile {
  _id?: string;
  description: string;
  file_url: string;
  created_at?: string;
  original_name?: string;
  size?: number;
}

export default function ReportsUploadPage() {
  const [list, setList] = useState<ReportFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/report-files", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) setList(data);
      else setList([]);
    } catch {
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Uploading...");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/report-files", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Upload failed");
      setMessage("✅ Uploaded");
      e.currentTarget.reset();
      load();
    } catch (err) {
      setMessage(
        err instanceof Error ? `❌ ${err.message}` : "❌ Upload failed"
      );
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Upload Reports (PDF)
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Upload annual or project PDF reports (max 15MB).
          </p>
        </header>
        <section className="grid md:grid-cols-2 gap-10 items-start">
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-xl shadow p-6 border border-gray-200 space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-800">New Report</h2>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="file"
              >
                PDF File
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                required
                className="block w-full text-sm border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full text-sm border border-gray-300 rounded px-2 py-1"
                placeholder="Short description"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Upload
            </button>
            {message && <p className="text-xs text-gray-600">{message}</p>}
          </form>
          <aside className="bg-white rounded-xl shadow p-6 border border-gray-200 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Reports
              </h2>
              <button
                onClick={load}
                className="text-xs text-blue-600 hover:underline"
              >
                Refresh
              </button>
            </div>
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : list.length ? (
              <ul className="space-y-3 max-h-96 overflow-auto pr-1">
                {list.map((r) => (
                  <li
                    key={r._id || r.file_url}
                    className="border border-gray-200 rounded p-3 text-sm bg-white/60"
                  >
                    <p className="font-medium text-gray-800 line-clamp-2">
                      {r.description}
                    </p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>
                        {r.size ? (r.size / 1024 / 1024).toFixed(2) : "?"} MB
                      </span>
                      {r.created_at && (
                        <span>
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <a
                      href={r.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-blue-600 hover:underline text-xs"
                    >
                      Open PDF →
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No reports uploaded yet.</p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
