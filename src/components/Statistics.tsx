"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { Icon } from "./icons";
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
  icon?: "star" | "book" | "palette" | "hospital";
};

export function Statistics() {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const yearsOfService = Math.max(0, new Date().getFullYear() - 2009);
  const pathname = usePathname();

  const statistics: StatItem[] = [
    {
      number: 10000,
      suffix: "+",
      label: t("livesPositivelyImpacted"),
      description: t("statLivesDesc"),
      trend: "up",
      trendValue: t("trendLivesUp"),
      percent: 80,
      icon: "star",
    },
    {
      number: 200,
      suffix: "+",
      label: t("programsCompleted"),
      description: t("programsCompletedDesc"),
      trend: "up",
      trendValue: t("trendProgramsUp"),
      percent: 65,
      icon: "book",
    },
    {
      number: 5,
      suffix: "+",
      label: t("districtsServed"),
      description: t("statDistrictsDesc"),
      trend: "up",
      trendValue: t("trendDistrictsUp"),
      percent: 50,
      icon: "palette",
    },
    {
      number: yearsOfService,
      suffix: "",
      label: t("yearsOfServiceLabel"),
      description: t("yearsOfServiceDesc"),
      trend: "up",
      trendValue: t("trendYearsUp"),
      percent: 100,
      icon: "hospital",
    },
  ];

  return (
    <section className="py-24 bg-white text-black">
      <Container>
        <div ref={elementRef} className="mb-16">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                {t("statisticsTitle")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                {t("statisticsDescription")}
              </p>
            </div>
            {pathname !== "/programs" && (
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "self-center md:self-auto"
                )}
              >
                {t("viewAllPrograms")}
              </Link>
            )}
          </div>
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
          <Card className="text-center p-8 bg-white border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              24/7
            </div>
            <Icon
              name="hospital"
              className="w-6 h-6 text-indigo-600 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("emergencySupportTitle")}
            </h3>
            <p className="text-gray-700 text-sm">{t("emergencySupportDesc")}</p>
          </Card>

          <Card className="text-center p-8 bg-white border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              ISO
            </div>
            <Icon
              name="star"
              className="w-6 h-6 text-emerald-600 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("qualityCertifiedTitle")}
            </h3>
            <p className="text-gray-700 text-sm">{t("qualityCertifiedDesc")}</p>
          </Card>

          <Card className="text-center p-8 bg-white border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
              126+
            </div>
            <Icon name="map" className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("villageCoverageTitle")}
            </h3>
            <p className="text-gray-700 text-sm">{t("villageCoverageDesc")}</p>
          </Card>
        </div>

        {/* Program Breakdown */}
        <ProgramBreakdown t={t} isParentVisible={isVisible} />
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

        {/* Icon removed as requested (circle badge) */}

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
            <div
              className={`inline-flex items-center gap-1 mt-3 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === "up"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <span aria-hidden>{stat.trend === "up" ? "▲" : "▼"}</span>
              <span>{stat.trendValue}</span>
            </div>
          )}
          {typeof stat.percent === "number" && (
            <div className="mt-4">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                  style={{
                    width: `${Math.max(0, Math.min(100, stat.percent))}%`,
                  }}
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

// Program Breakdown with processing animation
function ProgramBreakdown({
  t,
  isParentVisible,
}: {
  t: (key: string) => string;
  isParentVisible: boolean;
}) {
  const breakdownItems = React.useMemo(
    () => [
      { label: t("pbEducation"), value: 72, color: "from-indigo-500 to-blue-500" },
      { label: t("pbLivelihood"), value: 64, color: "from-emerald-500 to-green-500" },
      { label: t("pbHealth"), value: 48, color: "from-rose-500 to-pink-500" },
      { label: t("pbFinance"), value: 58, color: "from-amber-500 to-orange-500" },
    ],
    [t]
  );

  const [animatedValues, setAnimatedValues] = React.useState<number[]>(
    breakdownItems.map(() => 0)
  );
  const [isProcessing, setIsProcessing] = React.useState(false);
  const timeoutsRef = React.useRef<number[]>([]);

  // Reset when items change (e.g., language switch)
  React.useEffect(() => {
    setAnimatedValues(breakdownItems.map(() => 0));
  }, [breakdownItems]);

  React.useEffect(() => {
    // Start animation when section becomes visible
    if (!isParentVisible) return;
    setIsProcessing(true);
    // Clear any previous timeouts
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];

    breakdownItems.forEach((item, i) => {
      const timeoutId = window.setTimeout(() => {
        setAnimatedValues((prev) => {
          const next = [...prev];
          next[i] = item.value;
          return next;
        });
      }, 200 + i * 200);
      timeoutsRef.current.push(timeoutId);
    });

    // Mark processing done after last bar finishes animating
    const endId = window.setTimeout(() => setIsProcessing(false), 200 + breakdownItems.length * 200 + 1200);
    timeoutsRef.current.push(endId);

    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, [isParentVisible, breakdownItems]);

  return (
    <div className="mt-16">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 inline-flex items-center gap-2">
          {t("programBreakdownTitle")}
          {isProcessing && (
            <span
              aria-label={t("processing")}
              className="inline-flex items-center justify-center"
            >
              <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-indigo-500 animate-spin" />
            </span>
          )}
        </h3>
        <p className="text-gray-600 text-sm">{t("programBreakdownDesc")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {breakdownItems.map((item, i) => {
          const current = animatedValues[i] ?? 0;
          const isBarAnimating = current < item.value;
          return (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.value}%
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} ${
                    isBarAnimating ? "animate-pulse" : ""
                  }`}
                  style={{
                    width: `${current}%`,
                    transition: "width 1000ms ease-out",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
