"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// avoid framer-motion and lucide-react typing issues; use simple divs and emoji
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { useLanguage } from '@/context/LanguageContext'
import { scrollToElement } from "@/lib/utils";
import logo from "@/public/Logo MNSS.jpg";

const navigation = [
  { key: 'home', href: "#home" },
  { key: 'about', href: "#about" },
  { key: 'services', href: "#services" },
  { key: 'impact', href: "#impact" },
  { key: 'reports', href: "#reports" },
  { key: 'contact', href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToElement(id);
    setIsMobileMenuOpen(false);
  };

  const { lang, setLang, theme, toggleTheme, t } = useLanguage()

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200/50"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md bg-white flex items-center justify-center border border-gray-200">
                <Image
                  src="/Logo MNSS.jpg"
                  alt="MNSS logo"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight">
                  {t('siteName')}
                </h1>
                <p className="text-xs text-slate-600 leading-tight">
                  {t('siteTagline')}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 relative group cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50/50"
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-amber-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </button>
              ))}
            </nav>

            {/* Emergency Contact & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-lg">📞</span>
                <span className="text-gray-700 dark:text-gray-300">{t('emergency')}: </span>
                <Link
                  href="tel:9772062226"
                  className="text-accent-600 font-semibold hover:text-accent-700 cursor-pointer"
                >
                  9772062226
                </Link>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="hidden md:inline-flex"
              >
                {t('getHelp')}
              </Button>

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-all duration-300 text-sm"
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'EN' : 'हिं'}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{isMobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 shadow-xl border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {t(item.key)}
                </button>
              ))}
              <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span className="text-base">📞</span>
                  <span>{t('emergency')}: </span>
                  <Link
                    href="tel:9772062226"
          className="text-accent-600 font-semibold"
                  >
                    9772062226
                  </Link>
                </div>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleNavClick("#contact")}
                >
                  {t('getHelp')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
