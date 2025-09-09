"use client";
import { Container } from "./ui/Container";
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <Container className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Organization Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">{t('siteName')}</h3>
            <p className="text-slate-300 leading-relaxed">
              {t('siteTagline')}
            </p>
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-lg">📍</span>
              <span>Rajasthan, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="#about" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300">
                About Us
              </Link>
              <Link href="#services" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300">
                Our Services
              </Link>
              <Link href="#impact" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300">
                Our Impact
              </Link>
              <Link href="#contact" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300">
                <span className="text-lg">📧</span>
                <Link href="mailto:marutnarayan7181@gmail.com" className="hover:text-blue-400 transition-colors duration-300">
                  marutnarayan7181@gmail.com
                </Link>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <span className="text-lg">📞</span>
                <Link href="tel:9772062226" className="hover:text-blue-400 transition-colors duration-300">
                  9772062226
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-slate-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} {t('siteName')}. All rights reserved.
          </div>
          <div className="text-sm text-slate-500">
            Made with ❤️ for the community
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
