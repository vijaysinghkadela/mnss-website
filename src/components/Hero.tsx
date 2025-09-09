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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(59,130,246,0.03)_50%,transparent_51%)] bg-[length:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-amber-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium">
                <span className="mr-2 text-lg">🏆</span>
                {new Date().getFullYear() - 2009} {t("yearsOfService")} • ISO 9001:2015 Certified
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                  {t("siteTagline")}
                </span>
                <br />
                <span className="text-white">Communities</span>
              </h1>

              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Comprehensive social services spanning women&apos;s safety, rehabilitation, skill development, and community empowerment across 5+ districts of Rajasthan through trusted government partnerships.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-slate-300 bg-slate-800/40 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
              <span className="text-xl">📍</span>
              <span className="font-medium">{t("serving")}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToElement("services")}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
                className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
              >
                {t("emergencyHelp")}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <span className="text-base">🏛️</span>
                <span>Government Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-400">
                <span className="text-base">🤝</span>
                <span>Community Trusted</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div ref={elementRef} className="grid grid-cols-2 gap-6">
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
      </Container>

      {/* Floating Emergency Button */}
      <a
        href="tel:9772062226"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110"
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
    <div
      className={`relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden group hover:-translate-y-2`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div className="relative z-10">
        <div className="text-3xl mb-2">
          {stat.icon ? (
            <Icon name={String(stat.icon)} className="w-8 h-8" />
          ) : (
            <span className="text-2xl">🌐</span>
          )}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white">
            {count.toLocaleString()}
            {stat.suffix}
          </div>
          <div className="text-sm font-semibold text-slate-200">
            {stat.label}
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            {stat.description}
          </div>
        </div>
      </div>
    </div>
  );
}