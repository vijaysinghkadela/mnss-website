"use client";

import React, { useEffect } from "react";

// Global error boundary UI for App Router.
// Keep markup simple (no <html>/<body>) to avoid hydration issues.
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
		useEffect(() => {
			// Optional: log to console / monitoring
			console.error("App Error:", error);
		}, [error]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-red-50 via-white to-white text-center">
			<div className="max-w-md">
				<h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
				<p className="text-gray-600 text-sm mb-6 break-words">
					{error?.message || "An unexpected error occurred."}
				</p>
				<button
					onClick={() => reset()}
					className="inline-flex items-center px-5 py-2.5 rounded-md bg-red-600 text-white text-sm font-semibold shadow hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
