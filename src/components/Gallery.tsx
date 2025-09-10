"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

interface GalleryItem {
  name: string;
  path: string;
  url: string;
  kind: "image" | "video";
  size: number | null;
  createdAt: string | null;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const { t } = useLanguage();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const kindParam = filter === "all" ? "" : `?kind=${filter}`;
      const res = await fetch(`/api/gallery${kindParam}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Unknown error");
      setItems(data.items);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('galleryTitle')}
            </h2>
            <p className="text-gray-600 text-sm max-w-xl">
              {t('galleryDescription')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "image" | "video")
              }
              className="border rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="all">{t('galleryFilterAll')}</option>
              <option value="image">{t('galleryFilterImages')}</option>
              <option value="video">{t('galleryFilterVideos')}</option>
            </select>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`px-3 py-2 text-sm ${
                  view === "grid"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {t('galleryGrid')}
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-3 py-2 text-sm ${
                  view === "list"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {t('galleryList')}
              </button>
            </div>
            <button
              onClick={load}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {t('galleryRefresh')}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-6 text-sm text-gray-600">{t('loading')}</div>
        )}

        {items.length === 0 && !loading && !error && (
          <div className="p-10 bg-white rounded-xl shadow text-center text-gray-600">
            {t('galleryEmpty')}
          </div>
        )}

        {view === "grid" && items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {items.map((item) => (
              <div
                key={item.path}
                className="group relative bg-white rounded-lg shadow hover:shadow-lg overflow-hidden border border-gray-200"
              >
                {item.kind === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-40 object-cover"
                    controls
                    preload="metadata"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
                  <div className="p-2 w-full opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white">
                    <div className="font-semibold truncate" title={item.name}>
                      {item.name}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-300 mt-1">
                      <span>{item.kind}</span>
                      {item.size && (
                        <span>{(item.size / 1024).toFixed(1)} KB</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "list" && items.length > 0 && (
          <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">{t('galleryPreview')}</th>
                  <th className="text-left px-4 py-2 font-semibold">{t('galleryName')}</th>
                  <th className="text-left px-4 py-2 font-semibold">{t('galleryType')}</th>
                  <th className="text-left px-4 py-2 font-semibold">{t('gallerySize')}</th>
                  <th className="text-left px-4 py-2 font-semibold">{t('galleryCreated')}</th>
                  <th className="text-left px-4 py-2 font-semibold">{t('galleryAction')}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.path} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {item.kind === "image" ? (
                        <Image
                          src={item.url}
                          alt={item.name}
                          width={60}
                          height={40}
                          className="object-cover rounded"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-16 h-10 object-cover rounded"
                        />
                      )}
                    </td>
                    <td
                      className="px-4 py-2 max-w-xs truncate"
                      title={item.name}
                    >
                      {item.name}
                    </td>
                    <td className="px-4 py-2 capitalize">{item.kind === 'image' ? t('galleryImage') : t('galleryVideo')}</td>
                    <td className="px-4 py-2">
                      {item.size ? (item.size / 1024).toFixed(1) + " KB" : "—"}
                    </td>
                    <td className="px-4 py-2">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener"
                        className="text-purple-600 hover:underline"
                      >
                        {t('galleryOpen')}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
