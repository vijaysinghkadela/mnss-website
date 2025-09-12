"use client";

import { Container } from "./ui/Container";
import Link from "next/link";
import { Button } from "./ui/Button";
import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="py-8 bg-gray-50">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Marut Narayan Sewa Sansthan. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 hidden sm:block">{t('contact')}: marutnarayan7181@gmail.com</div>
          <Link href="/donate">
            <Button variant="success" size="sm">{t('donateNow')}</Button>
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
