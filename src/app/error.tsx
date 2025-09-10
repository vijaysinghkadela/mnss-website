"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
          <p className="text-sm text-gray-600">
            An unexpected error occurred while rendering this page.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="text-left text-xs bg-gray-100 p-3 rounded overflow-auto max-h-48 border border-gray-200">{error.message}</pre>
          )}
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
