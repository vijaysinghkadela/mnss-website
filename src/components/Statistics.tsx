"use client";

import React from "react";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { useCounter } from "@/hooks/useCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/context/LanguageContext";

type StatItem = {
  number: number;
  suffix?: string;
  label: string;
  description: string;
  trend?: "up" | "down";
  trendValue?: string; // e.g., +12% vs last year
  percent?: number; // optional progress toward a goal
};

export function Statistics() {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const yearsOfService = Math.max(0, new Date().getFullYear() - 2009);

  const statistics: StatItem[] = [
    {
      number: 10000,
      suffix: "+",
      label: "Lives Transformed",
      description: "Individuals directly impacted across all programs",
      trend: "up",
      trendValue: "+8% vs last year",
      percent: 80,
    },
    {
      number: 200,
      suffix: "+",
      label: "Programs Completed",
      description: "Successful training and empowerment initiatives",
      trend: "up",
      trendValue: "+5%",
      percent: 65,
    },
    {
      number: 5,
      suffix: "+",
      label: "Districts Served",
      description: "Multi-district operations across Rajasthan",
      trend: "up",
      trendValue: "+1 district",
      percent: 50,
    },
    {
      number: yearsOfService,
      suffix: "",
      label: "Years of Service",
      description: "Continuous community transformation since 2009",
      trend: "up",
      trendValue: "+1 year",
      percent: 100,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
      <Container>
        <div ref={elementRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("statisticsTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("statisticsDescription")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

  {/* Impact Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              24/7
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Emergency Support
            </h3>
            <p className="text-gray-600 text-sm">
              Round-the-clock crisis intervention and emergency services across
              all centers
            </p>
          </Card>

          <Card className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              ISO
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quality Certified
            </h3>
            <p className="text-gray-600 text-sm">
              ISO 9001:2015 certified organization with government recognition
            </p>
          </Card>

          <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
              126+
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Village Coverage
            </h3>
            <p className="text-gray-600 text-sm">
              Financial literacy and banking services across village cooperative
              societies
            </p>
          </Card>
        </div>

        {/* Program Breakdown */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Program Breakdown</h3>
            <p className="text-gray-600 text-sm">Key areas of impact across initiatives</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Education & Digital Literacy", value: 72, color: "from-indigo-500 to-blue-500" },
              { label: "Livelihood & Skill Training", value: 64, color: "from-emerald-500 to-green-500" },
              { label: "Health & Nutrition", value: 48, color: "from-rose-500 to-pink-500" },
              { label: "Financial Inclusion", value: 58, color: "from-amber-500 to-orange-500" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

interface StatisticCardProps {
  stat: StatItem;
  index: number;
  isVisible: boolean;
}

function StatisticCard({ stat, index, isVisible }: StatisticCardProps) {
  const { count, startAnimation } = useCounter({
    end: stat.number,
    duration: 2500,
  });

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => startAnimation(), index * 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, startAnimation]);

  // render a simple emoji icon instead of external icon components
  const IconEmoji = "📊";

  return (
    <div>
      <Card
        hover
        className={`text-center p-8 relative overflow-hidden group border-0`}
      >
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Icon */}
        <div className="relative z-10 mb-6">
          <div
            className={`w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
          >
            <span className="text-2xl">{IconEmoji}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
            {count.toLocaleString()}
            {stat.suffix}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {stat.label}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {stat.description}
          </p>
          {stat.trend && stat.trendValue && (
            <div className={`inline-flex items-center gap-1 mt-3 text-xs font-medium px-2 py-1 rounded-full ${
              stat.trend === "up"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              <span aria-hidden>{stat.trend === "up" ? "▲" : "▼"}</span>
              <span>{stat.trendValue}</span>
            </div>
          )}
          {typeof stat.percent === "number" && (
            <div className="mt-4">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                  style={{ width: `${Math.max(0, Math.min(100, stat.percent))}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75" />
      </Card>
    </div>
  );
}
