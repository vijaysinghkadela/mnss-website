"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// avoid framer-motion and lucide-react typing issues; use simple divs and emoji
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { useLanguage } from '@/context/LanguageContext'
import { scrollToElement } from "@/lib/utils";

const navigation = [
  { key: 'home', href: "#home" },
  { key: 'about', href: "#about" },
  { key: 'services', href: "#services" },
  { key: 'impact', href: "#impact" },
  { key: 'contact', href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>("/Logo%20MNSS.jpg");

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white/90 backdrop-blur-md border-b border-gray-200"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-md overflow-hidden shadow bg-white flex items-center justify-center">
                {/* prefer a provided logo at /public/logo.svg (exported from your PDF) */}
                <Image
                  src={logoSrc}
                  alt="MNSS logo"
                  width={48}
                  height={48}
                  className="object-contain bg-white"
                  onError={() => setLogoSrc("/logo.png")}
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Marut Narayan Sewa Sansthan
                </h1>
                <p className="text-xs text-gray-600">
                  Transforming Communities Since 2009
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-primary-600 font-medium text-sm transition-colors duration-200 relative group cursor-pointer"
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu, Language & Theme toggles */}
            <div className="flex items-center space-x-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="hidden md:inline-flex text-gray-900 bg-purple-400 px-3 py-2 text-sm"
              >
                {t('getHelp')}
              </Button>

              {/* Single Language toggle */}
              <div className="ml-2">
                <button
                  onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                  className="px-2.5 py-1.5 rounded-md border bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
                  aria-label="Toggle language"
                >
                  {lang === 'en' ? 'EN' : 'हिं'}
                </button>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="ml-2 px-2.5 py-1.5 rounded-md border border-gray-200 text-sm"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
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
          <div className="absolute top-20 left-0 right-0 bg-white shadow-xl border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
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
