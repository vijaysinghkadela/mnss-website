"use client";

import React from "react";
import Reveal from "./ui/Reveal";
// Removed framer-motion & lucide-react to eliminate type errors
import {
  getTotalPrograms,
  getTotalBeneficiaries,
  getAllProgressReports,
} from "@/data/progressReports";
import { useLanguage } from "@/context/LanguageContext";

// We'll map keys to translation keys; content resolved at render
const baseProgramHighlights = [
  {
    id: "skills",
    titleKey: "phSkillTitle",
    descKey: "phSkillDesc",
    impactKey: "phSkillImpact",
    icon: "📘",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "awareness",
    titleKey: "phAwarenessTitle",
    descKey: "phAwarenessDesc",
    impactKey: "phAwarenessImpact",
    icon: "🛡️",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "handicrafts",
    titleKey: "phHandicraftsTitle",
    descKey: "phHandicraftsDesc",
    impactKey: "phHandicraftsImpact",
    icon: "🎨",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "empowerment",
    titleKey: "phEmpowermentTitle",
    descKey: "phEmpowermentDesc",
    impactKey: "phEmpowermentImpact",
    icon: "❤️",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    id: "environment",
    titleKey: "phEnvironmentTitle",
    descKey: "phEnvironmentDesc",
    impactKey: "phEnvironmentImpact",
    icon: "💧",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    id: "recognition",
    titleKey: "phRecognitionTitle",
    descKey: "phRecognitionDesc",
    impactKey: "phRecognitionImpact",
    icon: "🏆",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
] as const;

export const ProgramHighlights: React.FC = () => {
  const { t } = useLanguage();
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();
  const reports = getAllProgressReports();

  return (
  <section id="program-highlights" className="py-16 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("programHighlightsTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("programHighlightsIntro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalPrograms}+
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {t("phCardPrograms")}
            </div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalBeneficiaries.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {t("phCardBeneficiaries")}
            </div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {reports.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {t("phCardYears")}
            </div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
            <div className="text-3xl font-bold text-pink-600 mb-2">5+</div>
            <div className="text-sm text-gray-600 font-medium">
              {t("phCardDistricts")}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {baseProgramHighlights.map((h, i) => {
            const title = t(h.titleKey);
            const desc = t(h.descKey);
            const impact = t(h.impactKey);
            return (
              <Reveal
                key={h.id}
                delay={i * 90}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className={`${h.bgColor} ${h.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-xl" aria-hidden>
                    {h.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {desc}
                </p>
                <div
                  className={`${h.color} font-medium text-sm flex items-center`}
                >
                  <span className="mr-2">👥</span>
                  {impact}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">{t("phCtaTitle")}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t("phCtaDesc")}
            </p>
            <a
              href="/progress-reports"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t("phCtaButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
