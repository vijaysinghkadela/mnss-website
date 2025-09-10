"use client";

import React from "react";
// avoid framer-motion and lucide-react typing issues; use plain divs and emoji icons
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { useCounter } from "@/hooks/useCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { heroStats } from "@/lib/data";
import Icon from "./icons";
import { scrollToElement } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(59,130,246,0.05)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      <Container className="relative z-10 pt-24 pb-16">
        <div className="grid xl:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 xl:col-span-6 col-span-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-blue-200 bg-white/70 backdrop-blur text-xs sm:text-sm font-medium shadow-sm">
                <span className="flex w-6 h-6 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  {new Date().getFullYear() - 2009}
                </span>
                <span>{t("yearsOfServiceLabel")} • ISO 9001:2015</span>
              </div>

              <h1 className="font-bold tracking-tight text-gray-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
                <span className="block">
                  {t('heroTransforming')}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {t('heroLives')}
                  </span>
                </span>
                <span className="block mt-1">
                  {t('heroBuilding')}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {t('heroCommunities')}
                  </span>
                </span>
              </h1>

              {/* <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {t('aboutTitle')} — Comprehensive social services spanning women&apos;s safety, rehabilitation, skill development, and community empowerment across 5+ districts of Rajasthan through trusted government partnerships.
              </p> */}
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-lg">📍</span>
              <span className="font-medium">{t("serving")}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => scrollToElement("services")}
                className="group text-gray-900 bg-purple-300"
              >
                {t("exploreHero")}
                <span className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                  ➤
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToElement("contact")}
              >
                {t("emergencyHelp")}
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-base">🏛️</span>
                <span>Government Certified</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div ref={elementRef} className="xl:col-span-6 col-span-12">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-5 lg:gap-6">
              {heroStats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Floating Emergency Button */}
      <a
        href="tel:9772062226"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <span className="text-2xl">📞</span>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
      </a>
    </section>
  );
}

interface StatCardProps {
  stat: (typeof heroStats)[0];
  index: number;
  isVisible: boolean;
}

function StatCard({ stat, index, isVisible }: StatCardProps) {
  const { count, startAnimation, isAnimating } = useCounter({
    end: stat.number,
    duration: 2200,
  });
  const { t } = useLanguage();
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (startedRef.current) return;
    // Start when visible OR after short delay to guarantee firing
    if (isVisible) {
      startedRef.current = true;
      const t = setTimeout(startAnimation, index * 160);
      return () => clearTimeout(t);
    }
    // Safety kickoff after 1s if intersection never triggers
    const safety = setTimeout(() => {
      if (!startedRef.current) {
        startedRef.current = true;
        startAnimation();
      }
    }, 1000 + index * 50);
    return () => clearTimeout(safety);
  }, [isVisible, index, startAnimation]);

  return (
    <div
      className={`relative p-5 sm:p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/60 overflow-hidden group hover:-translate-y-1.5`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl">
            {stat.icon ? (
              <Icon name={String(stat.icon)} className="w-8 h-8" />
            ) : (
              <span className="text-2xl">🌐</span>
            )}
          </div>
          <div className="text-[10px] uppercase tracking-wide font-semibold text-gray-400">
            {t(stat.label)}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900 tabular-nums">
            {count.toLocaleString()}{stat.suffix}
            {!isAnimating && count === 0 && stat.number > 0 && (
              <span className="opacity-0">{stat.number}</span>
            )}
          </div>
          <div className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[2rem]">
            {t(stat.description)}
          </div>
        </div>
      </div>
    </div>
  );
}
