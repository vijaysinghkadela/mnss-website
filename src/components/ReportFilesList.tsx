"use client";
import { useEffect, useState } from "react";

interface ReportFile {
  _id?: string;
  description: string;
  file_url: string;
  created_at?: string;
  original_name?: string;
  size?: number;
}

export function ReportFilesList({ limit }: { limit?: number }) {
  const [list, setList] = useState<ReportFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/report-files");
        const data = await res.json();
        if (Array.isArray(data)) {
          setList(limit ? data.slice(0, limit) : data);
        } else setList([]);
      } catch {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [limit]);

  if (loading)
    return <p className="text-sm text-gray-500">Loading reports...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!list.length)
    return <p className="text-sm text-gray-500">No reports yet.</p>;

  return (
    <ul className="space-y-2">
      {list.map((r) => (
        <li
          key={r._id || r.file_url}
          className="text-sm flex items-center justify-between gap-4 bg-white/60 border border-gray-200 rounded px-3 py-2"
        >
          <span className="truncate" title={r.description}>
            {r.description}
          </span>
          <a
            href={r.file_url}
            target="_blank"
            rel="noopener"
            className="text-blue-600 hover:underline shrink-0"
          >
            PDF
          </a>
        </li>
      ))}
    </ul>
  );
}
