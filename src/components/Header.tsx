"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// avoid framer-motion and lucide-react typing issues; use simple divs and emoji
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { scrollToElement } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Impact", href: "#impact" },
  { name: "Contact", href: "#contact" },
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg bg-white flex items-center justify-center">
                {/* prefer a provided logo at /public/logo.png (place the PNG exported from your PDF) */}
                <Image
                  src="/logo.png"
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
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Emergency Contact & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-lg">📞</span>
                <span className="text-gray-700">Emergency: </span>
                <Link
                  href="tel:9772062226"
                  className="text-accent-600 font-semibold hover:text-accent-700"
                >
                  9772062226
                </Link>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="hidden md:inline-flex text-gray-900 bg-purple-400"
              >
                Get Help
              </Button>

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
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <span className="text-base">📞</span>
                  <span>Emergency: </span>
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
                  Get Help Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
