"use client";

import React from "react";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Statistics } from "@/components/Statistics";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
// ComprehensiveServices intentionally not included on the home page by default
import { useLanguage } from "@/context/LanguageContext";
import Gallery from "@/components/Gallery";

export default function Home() {
  const { t } = useLanguage();
  return (
    
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        <Hero />
    <section id="about" className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">{t("aboutTitle")}</h2>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-gray-700 mb-4">{t("aboutParagraph")}</p>

                <h3 className="text-base font-semibold mt-3">{t("mission")}</h3>
                <p className="text-gray-600">{t("missionText")}</p>

                <h3 className="text-base font-semibold mt-3">{t("vision")}</h3>
                <p className="text-gray-600">{t("visionText")}</p>

                <div className="mt-6 flex gap-3">
                  <a
                    href="#services"
                    className="inline-flex items-center px-5 py-3 bg-primary-600 text-gray-900  rounded-lg shadow hover:opacity-95 bg-purple-400"
                  >
                    {t("exploreServices")}
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center px-5 py-3 border border-gray-200 rounded-lg text-gray-700"
                  >
                    {t("getHelpShort")}
                  </a>
                </div>
              </div>

              <div>
                {/* Responsive image placeholder - replace /mnss-hero.jpg with the image you provide in /public */}
                <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden shadow-sm mb-5 bg-white">
                  <Image
                    src="/Logo%20MNSS.jpg"
                    alt="MNSS logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  {t("corePrograms")}
                </h4>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>• {t("coreProgram1")}</li>
                  <li>• {t("coreProgram2")}</li>
                  <li>• {t("coreProgram3")}</li>
                  <li>• {t("coreProgram4")}</li>
                </ul>

                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  {t("impactHighlights")}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold">10,000+</div>
                    <div className="text-xs text-gray-500">
                      {t("livesPositivelyImpacted")}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold">5+</div>
                    <div className="text-xs text-gray-500">
                      {t("districtsServed")}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold">200+</div>
                    <div className="text-xs text-gray-500">
                      {t("programsTrainings")}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold">16</div>
                    <div className="text-xs text-gray-500">
                      {t("yearsOfServiceLabel")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <ComprehensiveServices /> */}
        <Services />
        {/* Gallery & Upload */}
        {/* <div className="max-w-6xl mx-auto px-6">
          <ImageUploadForm />
        </div> */}
        <Gallery />
        {/* <ProgramHighlights /> */}
        {/* <ReportsSection /> */}
        <Statistics />
        <Timeline />
        <Contact />
      </main>
    </div>
  );
}
