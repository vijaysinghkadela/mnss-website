import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Marut Narayan Sewa Sansthan (MNSS)";
const siteDescription =
  "MNSS is a non-governmental organization in Nagaur, Rajasthan working on education, livelihood, women's safety, health, and community welfare since 2009.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mnssindia.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Empowering Communities`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "MNSS",
    "Marut Narayan Sewa Sansthan",
    "NGO Nagaur",
    "NGO Rajasthan",
    "non profit",
    "women safety",
    "education",
    "livelihood",
    "health",
    "skill development",
    "Rajasthan NGO",
  ],
  applicationName: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Empowering Communities`,
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${siteName} Logo`,
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Empowering Communities`,
    description: siteDescription,
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add actual tokens in env and spread here if needed
    // google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    // other: { me: ["https://twitter.com/<handle>"] },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>

        {/* Structured Data for SEO */}
        <Script id="ld-org" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteName,
            url: siteUrl,
            logo: `${siteUrl}/logo.png`,
            sameAs: [
              // Add your social links here when available
            ],
            contactPoint: [{
              '@type': 'ContactPoint',
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['en', 'hi'],
            }],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN'
            }
          })}
        </Script>
        <Script id="ld-website" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteName,
            url: siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          })}
        </Script>
      </body>
    </html>
  );
}
