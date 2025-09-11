"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
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

	// Handle keyboard navigation in modal
	React.useEffect(() => {
		if (activeIndex === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveIndex(null);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [activeIndex]);

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

// Lightbox Modal (internal component)
function Lightbox({
		item,
		zoom,
		setZoom,
		onClose,
		onWheel,
	}: {
		item: MediaItem | null;
		zoom: number;
		setZoom: (v: number) => void;
		onClose: () => void;
		onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
	}) {
	React.useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
			if (e.key === "+" || e.key === "=") setZoom(Math.min(5, zoom + 0.25));
			if (e.key === "-" || e.key === "_") setZoom(Math.max(1, zoom - 0.25));
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose, setZoom, zoom]);

	if (!item) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" role="dialog" aria-modal="true">
			<button aria-label="Close" className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl" onClick={onClose}>
				×
			</button>
			<div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
				<button className="px-3 py-1 rounded bg-white/90 hover:bg-white text-gray-900" onClick={() => setZoom(Math.max(1, zoom - 0.25))}>-</button>
				<div className="px-2 py-1 text-white text-sm min-w-[64px] text-center">{Math.round(zoom * 100)}%</div>
				<button className="px-3 py-1 rounded bg-white/90 hover:bg-white text-gray-900" onClick={() => setZoom(Math.min(5, zoom + 0.25))}>+</button>
				<button className="ml-2 px-3 py-1 rounded bg-white/90 hover:bg-white text-gray-900" onClick={() => setZoom(1)}>Reset</button>
			</div>

			<div className="max-w-6xl w-[92vw] max-h-[86vh] h-[86vh] bg-black/20 rounded shadow-lg overflow-auto" onWheel={onWheel}>
				{/* Use <img> inside modal for simpler sizing with large zoom */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={item.url} alt={item.title} style={{ width: `${Math.max(100, 100 * zoom)}%`, height: "auto" }} className="block mx-auto select-none" draggable={false} />
			</div>
		</div>
	);
}

