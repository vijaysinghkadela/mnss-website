"use client";

import { useState, useEffect } from "react";

// Define a type for the report structure matching the database
interface Report {
  _id?: string;          // MongoDB document id (stringified ObjectId)
  id?: number;           // Legacy Supabase id (backwards compatibility)
  created_at?: string;   // may be missing if older docs; default handled
  description: string;
  image_url: string | null;
  video_url: string | null;
  status: "Processing" | "Complete" | "Failed" | string;
}
const statusStyles = {
  Complete: "bg-green-100 text-green-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
};

export default function ReportsSection() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports", { cache: "no-store" });
        if (!response.ok) {
          let info = "";
          try {
            const body = await response.json();
            info = body?.message || "";
          } catch {}
          throw new Error(info || `API error (${response.status})`);
        }
        const data = await response.json();
        setReports(Array.isArray(data) ? data : []);
        setErrorMessage("");
      } catch (err) {
        console.error("Reports fetch error", err);
        const msg = err instanceof Error ? err.message : "Unknown error";
        if (/env vars missing/i.test(msg)) {
          setErrorMessage("MongoDB not configured. Set MONGODB_URI and MONGODB_DB in .env.local then restart the dev server.");
        } else if (msg === "Failed to fetch") {
          setErrorMessage("Cannot reach /api/reports. Ensure dev server is running.");
        } else {
          setErrorMessage(msg);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
    const interval = setInterval(fetchReports, 10000);
    return () => clearInterval(interval);
  }, []);

    return (
      <section className="w-full max-w-2xl p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Process Reports</h2>
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <p>Loading reports...</p>
          ) : errorMessage ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">{errorMessage}</div>
          ) : reports.length > 0 ? (
            reports.map((report) => {
              const style = (report.status && typeof report.status === 'string'
                ? statusStyles[report.status as keyof typeof statusStyles]
                : undefined) || 'bg-gray-100 text-gray-600';
              return (
                <div
                  key={report._id || String(report.id) || Math.random()}
                  className="p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Report {report._id ? `#${report._id.slice(-6)}` : report.id ? `#${report.id}` : ''}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${style}`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{report.description}</p>
                  <div className="flex gap-4 mt-2">
                    {report.image_url && (
                      <a
                        href={report.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        View Image
                      </a>
                    )}
                    {report.video_url && (
                      <a
                        href={report.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        View Video
                      </a>
                    )}
                  </div>
                  {report.created_at && (
                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No reports found.</p>
          )}
        </div>
      </section>
    );
  }
