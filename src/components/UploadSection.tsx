"use client";

import { useState, FormEvent } from "react";

export default function UploadSection() {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Uploading...");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setMessage(`✅ ${result.message}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("❌ Upload failed. Please try again.");
    }
  };

  return (
    <section className="w-full max-w-lg p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Upload Media</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image-upload"
            name="image"
            accept="image/*"
            className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label
            htmlFor="video-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Video
          </label>
          <input
            type="file"
            id="video-upload"
            name="video"
            accept="video/*"
            className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Add a description..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
      )}
    </section>
  );
}
