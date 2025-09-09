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
    <section id="progress" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <span className="text-2xl text-white">📸</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Progress</h2>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Highlights from our programs, workshops, trainings, and community activities across Rajasthan
          </p>
          <div className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
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
              <div className="relative h-72 bg-gradient-to-br from-blue-50 to-indigo-50">
                <GalleryImage src={img.src} alt={img.caption || 'Progress photo'} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium truncate">{img.caption || 'Progress Photo'}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Load More Photos
              <span className="ml-2">📸</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {active !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <div className="relative h-96 md:h-[70vh]">
              {active !== null && (
                <ModalImage src={visibleImages[active].src} alt={visibleImages[active].caption || 'Progress photo'} />
              )}
            </div>
            {visibleImages[active].caption && (
              <div className="p-6 bg-white">
                <p className="text-slate-900 font-medium">{visibleImages[active].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-blue-600">
        <div className="text-center">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm font-medium">Progress Photo</div>
          <div className="text-xs text-slate-500">Coming Soon</div>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-500"
      onError={() => setFailed(true)}
    />
  );
}

function ModalImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-blue-600">
        <div className="text-center">
          <div className="text-6xl mb-4">📷</div>
          <div className="text-lg font-medium">Progress Photo</div>
          <div className="text-sm text-slate-500">Coming Soon</div>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}