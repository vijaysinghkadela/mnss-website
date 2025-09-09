"use client";

import React from 'react';
import Image from 'next/image';
import { PROGRESS_IMAGES } from '@/data/progress';

export default function ProgressGallery() {
  const [active, setActive] = React.useState<number | null>(null);
  const [visibleCount, setVisibleCount] = React.useState(12); // Show first 12 images initially

  const visibleImages = PROGRESS_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < PROGRESS_IMAGES.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, PROGRESS_IMAGES.length));
  };

  return (
    <section id="progress" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <span className="text-2xl">📸</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Progress</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Highlights from our programs, workshops, trainings, and community activities across Rajasthan
          </p>
          <div className="mt-6 inline-flex items-center px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            {PROGRESS_IMAGES.length} photos showcasing our impact
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleImages.map((img, idx) => (
            <button
              key={img.src}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 bg-white transition-all duration-500 hover:-translate-y-2"
              onClick={() => setActive(idx)}
              aria-label={img.caption || 'Progress photo'}
            >
              <div className="relative h-72">
                <Image 
                  src={img.src} 
                  alt={img.caption || ''} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="flex items-center justify-center h-full text-blue-600"><div class="text-center"><div class="text-4xl mb-2">📸</div><div class="text-sm font-medium">Progress Photo</div></div></div>';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg">🔍</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-sm font-medium line-clamp-2 leading-relaxed">
                    {img.caption}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {img.caption}
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-400">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  MNSS Program
                </div>
              </div>
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center">
              <button
                onClick={loadMore}
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="mr-3">📸</span>
                Load More Photos
                <span className="ml-3 text-xl">+</span>
              </button>
              <div className="mt-4 text-sm text-gray-500">
                Showing {visibleCount} of {PROGRESS_IMAGES.length} photos
              </div>
            </div>
          </div>
        )}

        {active !== null && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="relative max-w-7xl w-full">
              <button
                className="absolute -top-16 right-0 text-white/80 hover:text-white text-4xl font-light z-10 bg-black/30 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/50 transition-colors"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="relative w-full h-[75vh] sm:h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={visibleImages[active].src}
                  alt={visibleImages[active].caption || ''}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {visibleImages[active].caption && (
                <div className="mt-6 text-center text-white/95 text-lg max-w-3xl mx-auto leading-relaxed">
                  {visibleImages[active].caption}
                </div>
              )}

              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                {visibleImages.length > 1 && (
                  <>
                    <button
                      className="pointer-events-auto px-6 py-4 text-white/90 hover:text-white text-3xl bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all duration-300 hover:scale-110"
                      onClick={(e) => { e.stopPropagation(); setActive((i) => (i! - 1 + visibleImages.length) % visibleImages.length); }}
                      aria-label="Previous"
                    >
                      ‹
                    </button>
                    <button
                      className="pointer-events-auto px-6 py-4 text-white/90 hover:text-white text-3xl bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all duration-300 hover:scale-110"
                      onClick={(e) => { e.stopPropagation(); setActive((i) => (i! + 1) % visibleImages.length); }}
                      aria-label="Next"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                {active + 1} of {visibleImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


