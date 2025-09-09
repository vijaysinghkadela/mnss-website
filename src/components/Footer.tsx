"use client";
import { Container } from "./ui/Container";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden min-h-[500px]">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-amber-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 flex flex-col min-h-[500px]">
        <Container className="py-16 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Organization Info - Enhanced */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-5">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text ">
                    {t("siteName")}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg max-w-lg">
                    {t("siteTagline")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-slate-300 bg-slate-800/40 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Rajasthan, India
                      </p>
                      <p className="text-sm text-slate-400">
                        Serving multiple districts across the state
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-slate-300 bg-slate-800/40 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Since 2009</p>
                      <p className="text-sm text-slate-400">
                        16+ years of community service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - Enhanced */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full"></div>
              </h4>
              <div className="space-y-4">
                {[
                  { href: "#about", label: "About Us", icon: "👥" },
                  { href: "#services", label: "Our Services", icon: "🛠️" },
                  { href: "#impact", label: "Our Impact", icon: "📊" },
                  { href: "#contact", label: "Contact Us", icon: "📞" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center space-x-4 text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 p-2 rounded-lg hover:bg-slate-800/30"
                  >
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <span className="text-sm">{link.icon}</span>
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info - Enhanced */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white mb-6 relative">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full"></div>
              </h4>
              <div className="space-y-4">
                <div className="group flex items-start space-x-4 p-4 bg-slate-800/40 rounded-xl hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm border border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-lg">
                    <span className="text-xl">📧</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-1 font-medium">
                      Email Address
                    </p>
                    <Link
                      href="mailto:marutnarayan7181@gmail.com"
                      className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium break-all text-sm"
                    >
                      marutnarayan7181@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 bg-slate-800/40 rounded-xl hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm border border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-lg">
                    <span className="text-xl">📞</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-1 font-medium">
                      Phone Number
                    </p>
                    <Link
                      href="tel:9772062226"
                      className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium text-lg"
                    >
                      9772062226
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="pt-8 border-t border-slate-700/50 mt-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-slate-400 text-center lg:text-left">
                <p className="text-sm font-medium">
                  © {new Date().getFullYear()} {t("siteName")}. All rights
                  reserved.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Dedicated to transforming communities since 2009
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3 text-slate-400 bg-slate-800/40 rounded-full px-4 py-2 backdrop-blur-sm border border-slate-700/50">
                  <span className="text-lg">❤️</span>
                  <span className="text-sm font-medium">
                    Made with love for the community
                  </span>
                </div>
                <div className="hidden lg:flex items-center space-x-2 text-slate-500">
                  <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                  <span className="text-xs">Empowering Rajasthan</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
