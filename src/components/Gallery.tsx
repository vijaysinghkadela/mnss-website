"use client";

import React from "react";
import Image from "next/image";
import type { MediaItem } from "@/types";

export default function Gallery() {
	const [items, setItems] = React.useState<MediaItem[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [visibleCount, setVisibleCount] = React.useState(6);

	React.useEffect(() => {
		let mounted = true;
		const run = async () => {
			try {
				setLoading(true);
				const res = await fetch("/api/gallery", { cache: "no-store" });
				if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
				const data = await res.json();
				if (mounted) setItems(Array.isArray(data.items) ? data.items : []);
			} catch (e) {
				if (mounted) setError(e instanceof Error ? e.message : "Failed to load gallery.");
			} finally {
				if (mounted) setLoading(false);
			}
		};
		run();
		return () => {
			mounted = false;
		};
	}, []);

	if (loading) {
		return <div className="py-8 text-center text-gray-500">Loading gallery…</div>;
	}
	if (error) {
		return <div className="py-8 text-center text-red-600">{error}</div>;
	}

	const images = items.filter((it) => it.type === "image");

	if (!images.length) {
		return <div className="py-8 text-center text-gray-500">No media uploaded yet.</div>;
	}

	return (
		<section className="py-12 bg-gray-50">
			<div className="max-w-6xl mx-auto px-6">
				<h2 className="text-2xl font-bold mb-6">Gallery</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{images.slice(0, visibleCount).map((it) => (
						<figure key={it.id} className="relative group bg-white rounded-lg overflow-hidden shadow-sm">
							<Image src={it.url} alt={it.title} width={800} height={600} className="w-full h-56 object-cover" />
							<figcaption className="p-3 border-t">
								<div className="text-sm font-medium truncate">{it.title}</div>
								{it.description ? (
									<div className="text-xs text-gray-500 line-clamp-2">{it.description}</div>
								) : null}
							</figcaption>
						</figure>
					))}
				</div>
				{visibleCount < images.length ? (
					<div className="mt-6 text-center">
						<button
							className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={() => setVisibleCount((c) => c + 6)}
						>
							View More
						</button>
					</div>
				) : null}
			</div>
		</section>
	);
}

