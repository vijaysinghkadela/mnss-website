"use client";

// avoid framer-motion for compatibility; use plain divs and emoji
import React from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timeline } from "@/lib/data";
import { useLanguage } from '@/context/LanguageContext'

export function Timeline() {
  const { elementRef } = useScrollAnimation();
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
      </div>

      <Container className="relative z-10">
        <div ref={elementRef} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">📅</span>
            Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('timelineTitle')}
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t('timelineDescription')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ul className="relative space-y-12 before:absolute before:top-8 before:bottom-8 before:left-8 md:before:left-1/2 before:w-1 before:bg-gradient-to-b from-blue-500 via-amber-500 to-purple-500 before:transform before:-translate-x-1/2 before:rounded-full">
            {timeline.map((item, index) => (
              <li key={item.year} className={`relative ${index % 2 === 0 ? 'md:pr-1/2 md:pl-16' : 'md:pl-1/2 md:pr-16'} pl-16`}>
                {/* Timeline Dot */}
                <div className={`absolute ${index % 2 === 0 ? 'md:left-1/2 md:-translate-x-1/2' : 'md:right-1/2 md:translate-x-1/2'} left-8 top-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-white flex items-center justify-center shadow-xl z-10`}>
                  <div className="text-white text-xl">
                    {item.icon === 'star' && '⭐'}
                    {item.icon === 'book' && '📚'}
                    {item.icon === 'palette' && '🎨'}
                    {item.icon === 'hospital' && '🏥'}
                  </div>
                </div>

                {/* Timeline Card */}
                <Card className={`p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-semibold mb-3">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <div className="text-lg text-slate-600 mb-4 font-medium">{item.milestone}</div>
                      <p className="text-slate-700 leading-relaxed text-base">{item.description}</p>
                    </div>
                    
                    {item.image && (
                      <TimelineImageWrapper src={item.image} alt={`${item.title} illustration`} />
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function TimelineImageWrapper({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-3 border border-blue-200 shadow-inner">
        <div className="flex items-center justify-center w-full h-full text-blue-600">
          <div className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-sm font-medium">Timeline Event</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-3 border border-blue-200 shadow-inner">
      <Image
        src={src}
        alt={alt}
        width={192}
        height={128}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}