"use client";

import React, { useEffect, useRef, useState } from "react";
// Removed framer-motion & lucide-react to eliminate type errors
import {
  getTotalPrograms,
  getTotalBeneficiaries,
} from "@/data/progressReports";
import { useLanguage } from "@/context/LanguageContext";
import { useCounter } from "@/hooks/useCounter";

// removed old highlights grid; now using compact metrics + three info cards

export const ProgramHighlights: React.FC = () => {
  const { t } = useLanguage();
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();
  const yearsOfService = Math.max(0, new Date().getFullYear() - 2009);

  // visibility detection for triggering counters once
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const el = statsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // counters (start at 0 so SSR markup matches, then animate when visible)
  const programsCounter = useCounter({ end: totalPrograms, duration: 1600 });
  const beneficiariesCounter = useCounter({ end: totalBeneficiaries, duration: 2000 });
  const yearsCounter = useCounter({ end: yearsOfService, duration: 1400 });
  const districtsCounter = useCounter({ end: 5, duration: 1500 });

  useEffect(() => {
    if (visible) {
      programsCounter.startAnimation();
      beneficiariesCounter.startAnimation();
      yearsCounter.startAnimation();
      districtsCounter.startAnimation();
    }
    // we intentionally exclude counter objects from deps to avoid restarting animations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
  <section id="program-highlights" className="py-12 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t("programHighlightsTitle")}
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            {t("programHighlightsIntro")}
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            value={beneficiariesCounter.count}
            label={t("phCardBeneficiaries")}
            desc={t("phBeneficiariesDesc") || "Individuals directly impacted across all programs"}
            suffix="+"
          />
          <StatCard
            value={programsCounter.count}
            label={t("phCardPrograms")}
            desc={t("phProgramsDesc") || "Successful training and empowerment initiatives"}
            suffix="+"
          />
          <StatCard
            value={districtsCounter.count}
            label={t("phCardDistricts")}
            desc={t("phDistrictsDesc") || "Multi-district operations across Rajasthan"}
            suffix="+"
          />
          <StatCard
            value={yearsCounter.count}
            label={t("phCardYears")}
            desc={t("phYearsDesc") || "Continuous community transformation since 2009"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              badge: "24/7",
              title: t("phEmergencySupport") || "Emergency Support",
              text:
                t("phEmergencySupportDesc") ||
                "Round-the-clock crisis intervention and emergency services across all centers",
              color: "from-indigo-50 to-indigo-100",
            },
            {
              badge: "ISO",
              title: t("phQualityCertified") || "Quality Certified",
              text:
                t("phQualityCertifiedDesc") ||
                "ISO 9001:2015 certified organization with government recognition",
              color: "from-emerald-50 to-emerald-100",
            },
            {
              badge: "126+",
              title: t("phVillageCoverage") || "Village Coverage",
              text:
                t("phVillageCoverageDesc") ||
                "Financial literacy and banking services across village cooperative societies",
              color: "from-pink-50 to-pink-100",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border border-gray-200 bg-gradient-to-br ${item.color} p-6 shadow-sm hover:shadow-md transition`}
            >
              <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center text-indigo-600 font-bold text-base mb-4">
                {item.badge}
              </div>
              <div className="text-gray-900 font-semibold mb-1">{item.title}</div>
              <div className="text-gray-600 text-sm leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type StatCardProps = {
  value: number;
  label: string;
  desc: string;
  suffix?: string;
};

function StatCard({ value, label, desc, suffix = "" }: StatCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md p-6">
      <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
        <span aria-hidden>📊</span>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-extrabold text-gray-900 tabular-nums">
          {value.toLocaleString()}
          {suffix}
        </div>
        <div className="mt-1 font-semibold text-gray-900">{label}</div>
        <div className="mt-1 text-sm text-gray-600 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

export default ProgramHighlights;
