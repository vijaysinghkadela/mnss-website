"use client";

import { useState, useEffect } from "react";

// Define a type for the report structure matching the database
interface Report {
  id: number;
  created_at: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  status: "Processing" | "Complete" | "Failed";
}

const statusStyles = {
  Complete: "bg-green-100 text-green-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
};

export default function ReportsSection() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      // We can keep isLoading true only for the initial fetch
      // setIsLoading(true);
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
    // Poll for new reports every 10 seconds
    const interval = setInterval(fetchReports, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-2xl p-8 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Process Reports</h2>
      <div className="mt-6 space-y-4">
        {isLoading ? (
          <p>Loading reports...</p>
        ) : reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Report #{report.id}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    statusStyles[report.status]
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{report.description}</p>
              {/* Optionally display links to the uploaded media */}
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
              <p className="mt-2 text-xs text-gray-400">
                {new Date(report.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>
    </section>
  );
}
