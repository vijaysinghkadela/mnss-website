"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// avoid framer-motion and lucide-react typing issues; use simple divs and emoji
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToElement } from "@/lib/utils";

const navigation = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "impact", href: "#impact" },
  { key: "reports", href: "#reports" },
  { key: "contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // scroll progress
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      // active section detection
      let current: string = "home";
      for (const item of navigation) {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToElement(id);
    setIsMobileMenuOpen(false);
  };

  const { lang, setLang, t } = useLanguage();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200/50"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="h-0.5 bg-gradient-to-r from-blue-600 via-amber-500 to-purple-600"
          style={{ width: `${scrollProgress}%` }}
        />
        <Container>
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md bg-white flex items-center justify-center border border-gray-200">
                <Image
                  src="/Logo MNSS.jpg"
                  alt="MNSS logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xs font-bold text-slate-900 leading-tight">
                  {t("siteName")}
                </h1>
                <p className=" text-slate-600 leading-tight">
                  {t("siteTagline")}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm ">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-medium transition-all duration-300 relative group cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50/50 ${
                    activeSection === item.href.replace('#','')
                      ? 'text-blue-700'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {t(item.key)}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-amber-500 transition-all duration-300 rounded-full ${
                    activeSection === item.href.replace('#','') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="hidden md:inline-flex text-sm"
              >
                {t("Help")}
              </Button>

              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-all duration-300 text-sm"
                aria-label="Toggle language"
              >
                {lang === "en" ? "EN" : "हिं"}
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
          <div className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 shadow-xl border-t border-gray-200 dark:border-gray-700 animate-fade-in-up">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                    activeSection === item.href.replace('#','')
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
              <div className="px-4 py-3 border-t border-gray-200">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleNavClick("#contact")}
                >
                  {t("getHelp")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
