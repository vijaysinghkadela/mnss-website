"use client";

import React from "react";

export default function ImageUploadForm() {
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [type, setType] = React.useState<"image" | "video">("image");
	const [file, setFile] = React.useState<File | null>(null);
	const [status, setStatus] = React.useState<string | null>(null);
	const [busy, setBusy] = React.useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) {
			setStatus("Please choose a file.");
			return;
		}
		try {
			setBusy(true);
			setStatus(null);
			const fd = new FormData();
			fd.append("file", file);
			fd.append("title", title);
			fd.append("description", description);
			fd.append("type", type);
			const res = await fetch("/api/upload", { method: "POST", body: fd });
			const data = await res.json();
			if (!res.ok || !data?.success) {
				throw new Error(data?.message || `Upload failed (${res.status})`);
			}
			setStatus("Uploaded successfully.");
			setTitle("");
			setDescription("");
			setFile(null);
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Upload failed.");
		} finally {
			setBusy(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-3 p-4 bg-white rounded-lg shadow-sm">
			<h3 className="text-base font-semibold">Upload Media</h3>
			<div className="grid md:grid-cols-2 gap-3">
				<label className="block text-sm">
					<span className="text-gray-700">Title</span>
					<input
						className="mt-1 w-full border rounded-md px-3 py-2"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter title"
					/>
				</label>
				<label className="block text-sm">
					<span className="text-gray-700">Type</span>
					<select
						className="mt-1 w-full border rounded-md px-3 py-2"
						value={type}
						onChange={(e) => setType(e.target.value as "image" | "video")}
					>
						<option value="image">Image</option>
						<option value="video">Video</option>
					</select>
				</label>
			</div>
			<label className="block text-sm">
				<span className="text-gray-700">Description</span>
				<textarea
					className="mt-1 w-full border rounded-md px-3 py-2"
					rows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Optional description"
				/>
			</label>
			<label className="block text-sm">
				<span className="text-gray-700">File</span>
				<input
					type="file"
					accept={type === "image" ? "image/*" : "video/*"}
					className="mt-1"
					onChange={(e) => setFile(e.target.files?.[0] || null)}
				/>
			</label>
			<div className="flex items-center gap-3">
				<button
					type="submit"
					className="inline-flex items-center px-4 py-2 rounded-md bg-purple-500 text-white disabled:opacity-50"
					disabled={busy}
				>
					{busy ? "Uploading…" : "Upload"}
				</button>
				{status ? <span className="text-sm text-gray-600">{status}</span> : null}
			</div>
		</form>
	);
}

