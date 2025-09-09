"use client";

// avoid framer-motion for compatibility; use plain divs and emoji
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
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <Container>
        <div ref={elementRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('timelineTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('timelineDescription')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ul className="relative space-y-8 before:absolute before:top-6 before:bottom-6 before:left-10 before:w-0.5 before:bg-blue-200">
            {timeline.map((item) => (
              <li key={item.year} className="relative pl-16">
                <div className="absolute left-4 top-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center shadow-lg">
                  <div className="text-white text-lg">
                    {item.icon === 'star' && '⭐'}
                    {item.icon === 'book' && '📚'}
                    {item.icon === 'palette' && '🎨'}
                    {item.icon === 'hospital' && '🏥'}
                  </div>
                </div>

                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="text-sm text-blue-600 font-semibold">{item.year}</div>
                      <h3 className="text-xl font-bold text-slate-800 mt-1">
                        {item.title}
                      </h3>
                      <div className="text-sm text-slate-600 mt-1 font-medium">{item.milestone}</div>
                      <p className="text-slate-700 mt-3 leading-relaxed">{item.description}</p>
                    </div>
                    {item.image && (
                      <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-2">
                        <Image
                          src={item.image}
                          alt={`${item.title} illustration`}
                          width={128}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
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
