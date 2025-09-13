"use client";

import React from "react";
import { Statistics } from "@/components/Statistics";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ImpactPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* <section className="bg-white text-black py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            {t("impactHeroTitle") || t("statisticsTitle")}
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            {t("impactHeroDesc") || t("statisticsDescription")}
          </p>
          <div className="mt-6">
            <Link href="/donate">
              <Button variant="success" size="lg" className="shadow-md">
                {t("donateNow")}
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
      <Statistics />
      {/* Keep sections contrasting on dark background */}
      {/* <ProgramHighlights /> */}
      <section className="py-16 bg-white text-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
            {t("impactCtaTitle") || "Help Us Expand Our Impact"}
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto mb-6">
            {t("impactCtaDesc") ||
              "Your contribution enables us to reach more villages, support women’s safety, and create sustainable livelihoods."}
          </p>
          <Link href="/donate">
            <Button variant="success" size="lg" className="shadow-md">
              {t("donateNow")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
