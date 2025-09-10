"use client";

import { useState, useEffect } from "react";
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
  const [logoSrc, setLogoSrc] = useState<string>("/logo.svg");

  // Removed scroll background behavior; header remains transparent

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToElement(id);
    setIsMobileMenuOpen(false);
  };

  const { lang, setLang, t } = useLanguage();

  // Attempt to use JPG logo only if the resource actually is an image (not a PDF placeholder)
  useEffect(() => {
    const encodedJpg = "/Logo%20MNSS.jpg";
    fetch(encodedJpg, { method: "HEAD" })
      .then((res) => {
        const ct = res.headers.get("content-type") || "";
        if (res.ok && ct.startsWith("image/")) {
          setLogoSrc(encodedJpg);
        } else {
          setLogoSrc("/logo.svg");
        }
      })
      .catch(() => setLogoSrc("/logo.svg"));
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent`}
      >
        <Container>
          <div className="flex items-center justify-between h-20 animate-in fade-in-down">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg bg-white flex items-center justify-center">
                <Image
                  src={logoSrc}
                  alt="MNSS logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Marut Narayan Sewa Sansthan
                </h1>
                <p className="text-sm text-gray-600">
                  Transforming Communities Since 2009
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-8"
              data-animate-stagger
            >
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group cursor-pointer opacity-0"
                  data-animate-child
                  onAnimationEnd={(e) =>
                    e.currentTarget.classList.add("is-visible")
                  }
                  style={{
                    animation: `fade-in-up .6s both ${
                      0.05 * navigation.findIndex((n) => n.key === item.key)
                    }s`,
                  }}
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Utility Controls & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Donate button (desktop) */}
              <a
                href="/donate"
                className="hidden md:inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow transition-colors"
              >
                {t('donate')}
              </a>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="hidden md:inline-flex text-gray-100 bg-purple-400"
              >
                {t("getHelp")}
              </Button>

              {/* Single Language toggle */}
              <div className="ml-2">
                <button
                  onClick={() => setLang(lang === "en" ? "hi" : "en")}
                  className="px-3 py-1 rounded-md border bg-transparent hover:bg-gray-100 dark:hover:bg-gray-200 hover:cursor-pointer font-medium"
                  aria-label="Toggle language"
                >
                  {lang === "en" ? "EN" : "हिं"}
                </button>
              </div>

              {/* Theme toggle removed as requested */}

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
