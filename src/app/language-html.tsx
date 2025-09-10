"use client";
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

type Props = { children: React.ReactNode; fontsClass?: string };

export default function LanguageHtml({ children, fontsClass }: Props) {
  const { lang } = useLanguage();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <html lang={lang}>
      <body className={`${fontsClass || ''} antialiased`}>
        {children}
      </body>
    </html>
  );
}
