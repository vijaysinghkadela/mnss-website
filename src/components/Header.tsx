"use client";

import { useState, useEffect, useRef } from "react";
// Removed phone contact; Link no longer needed
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
  { key: "contact", href: "#contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc] = useState<string>("/logo.svg");
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToElement(id);
    setIsMobileMenuOpen(false);
  };

  const { lang, setLang, t } = useLanguage();

  // Removed remote JPG probe (was causing repeated invalid image console noise); always use SVG which is crisp at all sizes.

  // Scroll state for background / shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const ids = navigation.map(n => n.href.replace('#',''));
    const elements = ids
      .map(id => typeof document !== 'undefined' ? document.getElementById(id) : null)
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
            const navItem = navigation.find(n => n.href === `#${id}`);
            if (navItem) setActiveKey(navItem.key);
        }
      });
    }, { root: null, threshold: 0.45 });
    elements.forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/90 shadow-sm border-gray-200' : 'bg-transparent'} border-b`}
      >
        <Container>
          <div className={`flex items-center justify-between ${scrolled ? 'h-16' : 'h-20'} animate-in fade-in-down transition-[height] duration-300`}>
            {/* Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-md bg-white ring-1 ring-gray-100 flex items-center justify-center">
                <Image
                  src={logoSrc}
                  alt="MNSS logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full p-1.5"
                  priority
                />
              </div>
              <div className="leading-tight min-w-0 select-none">
                <h1 className="font-bold tracking-tight text-gray-900 text-lg sm:text-xl md:text-2xl truncate">
                  <span className="sm:hidden">MNSS</span>
                  <span className="hidden sm:inline">Marut Narayan Sewa Sansthan</span>
                </h1>
                <p className="mt-0.5 text-[10px] sm:text-xs md:text-sm text-gray-500 md:text-gray-600 whitespace-nowrap">
                  Transforming Communities Since 2009
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8"
              data-animate-stagger
              aria-label="Main navigation"
            >
              {navigation.map((item) => {
                const isActive = activeKey === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className={`font-medium tracking-wide text-sm xl:text-[15px] transition-colors duration-200 relative group cursor-pointer opacity-0 ${isActive ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'} `}
                    data-animate-child
                    onAnimationEnd={(e) =>
                      e.currentTarget.classList.add('is-visible')
                    }
                    style={{
                      animation: `fade-in-up .6s both ${0.05 * navigation.findIndex(n => n.key === item.key)}s`,
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(item.key)}
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary-600 rounded-full transition-all duration-300 ${isActive ? 'w-5' : 'w-0 group-hover:w-5'}`}></span>
                  </button>
                );
              })}
            </nav>

            {/* Utility Controls & Mobile Menu */}
      <div className="flex items-center gap-3 xl:gap-4">
              {/* Donate button (desktop) */}
              <a
                href="/donate"
        className="hidden md:inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-xs xl:text-sm font-semibold px-3.5 py-2 rounded-md shadow-sm transition-colors"
              >
                {t('donate')}
              </a>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#contact")}
        className="hidden md:inline-flex text-gray-100 bg-purple-500 hover:bg-purple-600 text-xs xl:text-sm px-3.5"
              >
                {t("getHelp")}
              </Button>

              {/* Single Language toggle */}
        <div className="ml-1 xl:ml-2">
                <button
                  onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-2.5 py-1 rounded-md border bg-white/60 backdrop-blur hover:bg-white text-gray-700 text-xs xl:text-sm font-medium shadow-sm"
                  aria-label="Toggle language"
                >
                  {lang === "en" ? "EN" : "हिं"}
                </button>
              </div>

              {/* Theme toggle removed as requested */}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="text-base">{isMobileMenuOpen ? "✕" : "☰"}</span>
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
          <div className="absolute top-20 left-0 right-0 bg-white/90 backdrop-blur-md shadow-xl border-t border-gray-200 menu-panel-animate">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors animate-in fade-in-up"
                >
                  {t(item.key)}
                </button>
              ))}
              <div className="px-4 py-3 border-t border-gray-200">
                <a
                  href="/donate"
                  className="w-full inline-flex justify-center mb-3 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 animate-in scale-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('donate')}
                </a>
                <Button
                  variant="primary"
                  className="w-full animate-in fade-in-up"
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
