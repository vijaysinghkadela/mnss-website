"use client";

import React from "react";
import Reveal from "./ui/Reveal";
import Image from "next/image";
import {
  getAllProgressReports,
  getYears,
  getTotalPrograms,
  getTotalBeneficiaries,
} from "@/data/progressReports";
import { useLanguage } from "@/context/LanguageContext";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  imageSrc?: string;
  imageAlt?: string;
  details?: string[];
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  description,
  color,
  bgColor,
  imageSrc,
  imageAlt,
  details,
}) => (
  <div
    className={`${bgColor} rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden transform transition-transform duration-300 hover:scale-[1.04]`}
  >
    {imageSrc && (
      <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none select-none w-32 h-32">
        <Image
          src={imageSrc}
          alt={imageAlt || label}
          fill
          className="object-contain"
        />
      </div>
    )}
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      <div className="w-12 h-12 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-3xl font-bold text-gray-900 leading-tight">
          {value}
        </div>
        <div className="text-xs uppercase tracking-wide font-semibold text-gray-600">
          {label}
        </div>
      </div>
    </div>
    <div className="text-sm text-gray-700 mb-3 leading-relaxed">
      {description}
    </div>
    {details && details.length > 0 && (
      <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
        {details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    )}
  </div>
);

export const EnhancedStatistics: React.FC = () => {
  const { t, lang } = useLanguage();
  const reports = getAllProgressReports();
  const years = getYears();
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();

  const programsPerYear = Math.round(totalPrograms / years.length);
  const avgBeneficiariesPerProgram = Math.round(
    totalBeneficiaries / totalPrograms
  );

  // Categorize programs dynamically by simple keyword grouping
  const categoryKeywords: Record<string, RegExp[]> = {
    "Skill Development": [
      /sewing/i,
      /cutting/i,
      /beauty/i,
      /training/i,
      /computer/i,
      /digital/i,
      /footwear/i,
      /pottery/i,
    ],
    "Social Awareness": [
      /legal/i,
      /awareness/i,
      /drug/i,
      /campaign/i,
      /child/i,
      /water/i,
      /swachh/i,
    ],
    "Economic Empowerment": [
      /entrepreneur/i,
      /livelihood/i,
      /micro/i,
      /enterprise/i,
      /apparel/i,
      /market/i,
    ],
  };

  const categoryCounts: Record<string, number> = {
    "Skill Development": 0,
    "Social Awareness": 0,
    "Economic Empowerment": 0,
  };
  reports.forEach((r) => {
    r.programs.forEach((p) => {
      const name = p.name;
      for (const cat of Object.keys(categoryKeywords)) {
        if (categoryKeywords[cat].some((rx) => rx.test(name))) {
          categoryCounts[cat] += 1;
          break;
        }
      }
    });
  });
  const totalCategorized =
    Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
  const pct = (n: number) => Math.round((n / totalCategorized) * 100);

  const stats: StatCardProps[] = [
    {
      icon: <span className="text-2xl">📅</span>,
      value: `${years.length}`,
      label: t("yearsOfServiceLabel"),
      description:
        t("yearsOfServiceLabel") === "Years of service"
          ? "Documented program years in repository"
          : "दस्तावेजीकृत कार्यक्रम वर्ष",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      imageSrc: "/globe.svg",
      details: [
        `${lang === "hi" ? "से" : ""} ${years[0]} ${
          lang === "hi" ? "तक" : "to"
        } ${years[years.length - 1]}`,
      ],
    },
    {
      icon: <span className="text-2xl">🎯</span>,
      value: `${totalPrograms}`,
      label: t("phCardPrograms"),
      description:
        t("phCardPrograms") === "Total Programs"
          ? "Unique program entries across all years"
          : "सभी वर्षों में विशिष्ट कार्यक्रम",
      color: "text-green-600",
      bgColor: "bg-green-50",
      imageSrc: "/window.svg",
      details: [
        `${programsPerYear} ${lang === "hi" ? "औसत/वर्ष" : "avg / year"}`,
      ],
    },
    {
      icon: <span className="text-2xl">👥</span>,
      value: `${totalBeneficiaries.toLocaleString()}`,
      label: t("livesPositivelyImpacted"),
      description:
        t("livesPositivelyImpacted") === "Lives positively impacted"
          ? "Numeric beneficiaries where recorded"
          : "जहाँ दर्ज है वहाँ संख्या आधारित लाभार्थी",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      imageSrc: "/file.svg",
      details: [
        `${avgBeneficiariesPerProgram} ${
          lang === "hi" ? "औसत/कार्यक्रम" : "avg / program"
        }`,
      ],
    },
    {
      icon: <span className="text-2xl">📈</span>,
      value: `${programsPerYear}`,
      label: t("programsPerYearLabel"),
      description: t("programsPerYearDesc"),
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      imageSrc: "/next.svg",
      details: [`${years.length} ${t("activeYearsLabel")}`],
    },
    {
      icon: <span className="text-2xl">📊</span>,
      value: `${avgBeneficiariesPerProgram}`,
      label: t("avgBeneficiariesLabel"),
      description: t("avgBeneficiariesDesc"),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      imageSrc: "/logo.svg",
      details: [
        lang === "hi"
          ? "गुणात्मक आँकड़े शामिल नहीं"
          : "Excludes qualitative counts",
      ],
    },
    {
      icon: <span className="text-2xl">🧩</span>,
      value: Object.keys(categoryCounts).length.toString(),
      label: t("coreCategoriesLabel"),
      description: t("coreCategoriesDesc"),
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      imageSrc: "/globe.svg",
      details: Object.entries(categoryCounts).map(([k, v]) => `${k}: ${v}`),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("statisticsTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === "hi"
              ? "ये आँकड़े 2014-2018 के हमारे प्रलेखित प्रगति को दर्शाते हैं, जो राजस्थान भर में सामुदायिक विकास पहलों के ठोस प्रभाव को प्रदर्शित करते हैं।"
              : "These statistics reflect our documented progress from 2014-2018, showcasing the tangible impact of our community development initiatives across Rajasthan."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>

  <Reveal delay={120} className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t("programCategoriesOverviewTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg
                bg-gradient-to-br from-blue-500 to-indigo-600"
                  aria-hidden
                >
                  <span className="text-lg font-bold">{pct(count)}%</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{cat}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {t("programCategoriesOverviewDesc")}
                </p>
                <div className="text-xs font-semibold text-indigo-600">
                  {count} {t("programsLabel")}
                </div>
              </div>
            ))}
          </div>
  </Reveal>

  <Reveal delay={240} className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            {t("growthOverTimeTitle")}
          </h3>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {years.map((year, index) => {
                const yearData = reports.find((r) => r.year === year);
                const programCount = yearData?.programs.length || 0;
                return (
                  <div key={year} className="text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        index === years.length - 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <span className="font-bold text-sm">
                        {year.split("-")[0]}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-800">
                      {programCount}
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("programsLabel")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  </Reveal>

        <Reveal delay={360} className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">
              {t("isoCertifiedOrgHeading")}
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              {t("isoCertifiedOrgDesc")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EnhancedStatistics;
