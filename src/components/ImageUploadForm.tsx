"use client";
import { useState, FormEvent } from "react";

export default function ImageUploadForm() {
  const [msg, setMsg] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMsg("Uploading...");
    const form = new FormData(e.currentTarget);
    // Ensure only image field is sent (clear video field if empty)
    if (!form.get("video")) form.delete("video");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Upload failed");
      setMsg("✅ Uploaded");
      e.currentTarget.reset();
    } catch (err) {
      setMsg(err instanceof Error ? `❌ ${err.message}` : "❌ Upload failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow p-6 border border-gray-200 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">New Image</h2>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="image"
        >
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
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
        disabled={submitting}
        type="submit"
        className="w-full py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? "Uploading..." : "Upload"}
      </button>
      {msg && <p className="text-xs text-gray-600">{msg}</p>}
    </form>
  );
}
