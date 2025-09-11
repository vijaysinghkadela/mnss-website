"use client";

import React from "react";
import Image from "next/image";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Statistics } from "@/components/Statistics";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
// ComprehensiveServices intentionally not included on the home page by default
import { useLanguage } from "@/context/LanguageContext";
// Removed AnnualProgressReports (unused on home page)
import ProgramHighlights from "@/components/ProgramHighlights";
import Gallery from "@/components/Gallery";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-24">
        <Hero />
        <section id="about" className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-white">
          <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[radial-gradient(circle_at_30%_40%,#6366f1,transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-6">
            <SectionHeading
              eyebrow={t('aboutTitle')}
              title={t('mission') + ' & ' + t('vision')}
              subtitle={t('aboutParagraph')}
              align="center"
            />
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border border-white/50">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('mission')}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{t('missionText')}</p>
                </div>
                <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border border-white/50">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('vision')}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{t('visionText')}</p>
                </div>
                <div className="flex gap-4 pt-2">
                  <a href="#services" className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow hover:shadow-md transition-all">
                    {t('exploreServices')}
                  </a>
                  <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all">
                    {t('getHelpShort')}
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/40 mb-10">
                  <Image
                    src="/mnss-hero.jpg"
                    alt="MNSS community outreach"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-transparent" />
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: '10,000+', label: t('livesPositivelyImpacted') },
                    { value: '5+', label: t('districtsServed') },
                    { value: '200+', label: t('programsTrainings') },
                    { value: '16', label: t('yearsOfServiceLabel') },
                  ].map(card => (
                    <div key={card.label} className="relative bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/60 hover:shadow-md transition group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-colors" />
                      <div className="text-2xl font-bold text-gray-900 tracking-tight">{card.value}</div>
                      <div className="mt-1 text-xs font-medium text-gray-500 leading-snug min-h-[2.2rem]">{card.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <h4 className="text-sm font-semibold tracking-wide text-gray-700 uppercase mb-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {t('corePrograms')}
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span>{t('coreProgram1')}</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span>{t('coreProgram2')}</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span>{t('coreProgram3')}</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span>{t('coreProgram4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <ComprehensiveServices /> */}
        <Services />
        {/* <AnnualProgressReports /> */}
        {/* <AnnualProgressReports /> */}
        <ProgramHighlights />
        {/* <ReportsSection /> */}
        <Gallery />
        <Statistics />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
