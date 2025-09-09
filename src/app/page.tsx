"use client"

import React from "react";
import Image from 'next/image'
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Statistics } from "@/components/Statistics";
import { Timeline } from "@/components/Timeline";
// import { Reports } from "@/components/Reports";
import { Contact } from "@/components/Contact";
// import { Footer } from "@/components/Footer";
import ProgressGallery from "@/components/ProgressGallery";
// ComprehensiveServices intentionally not included on the home page by default
import { useLanguage } from '@/context/LanguageContext'


export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-800">
      <Header />

      <main className="pt-20">
        <Hero />
        <section id="about" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">{t('aboutTitle')}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed">{t('aboutParagraph')}</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-3">🎯</span>
                      {t('mission')}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{t('missionText')}</p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                    <h3 className="text-xl font-semibold text-amber-900 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm mr-3">👁️</span>
                      {t('vision')}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{t('visionText')}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    {t('exploreServices')}
                    <span className="ml-2">→</span>
                  </a>
                  <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                    {t('getHelpShort')}
                  </a>
                </div>
              </div>

              <div className="space-y-8">
                {/* Enhanced image with better styling */}
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="/mnss-hero.jpg"
                    alt="MNSS community outreach"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Core Programs */}
                <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-3">📋</span>
                    {t('corePrograms')}
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-slate-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {t('coreProgram1')}
                    </li>
                    <li className="flex items-center text-slate-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {t('coreProgram2')}
                    </li>
                    <li className="flex items-center text-slate-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {t('coreProgram3')}
                    </li>
                    <li className="flex items-center text-slate-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {t('coreProgram4')}
                    </li>
                  </ul>
                </div>

                {/* Impact Highlights */}
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-6 flex items-center">
                    <span className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs mr-3">📊</span>
                    {t('impactHighlights')}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">10,000+</div>
                      <div className="text-sm text-slate-600">{t('livesPositivelyImpacted')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">5+</div>
                      <div className="text-sm text-slate-600">{t('districtsServed')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">200+</div>
                      <div className="text-sm text-slate-600">{t('programsTrainings')}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">16</div>
                      <div className="text-sm text-slate-600">{t('yearsOfServiceLabel')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

  {/* <ComprehensiveServices /> */}
  <Services />
        <Statistics />
        <ProgressGallery />
  <Timeline />
  {/* <Reports /> */}
        <Contact />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
