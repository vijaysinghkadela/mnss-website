import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marut Narayan Sewa Sansthan - Transforming Communities Since 2009",
  description:
    "Comprehensive social services spanning women's safety, rehabilitation, skill development, and community empowerment across 5+ districts of Rajasthan through trusted government partnerships.",
  keywords:
    "NGO, social services, women safety, rehabilitation, skill development, Rajasthan, community empowerment",
  authors: [{ name: "Marut Narayan Sewa Sansthan" }],
  creator: "Marut Narayan Sewa Sansthan",
  publisher: "Marut Narayan Sewa Sansthan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mnss.org",
    title: "Marut Narayan Sewa Sansthan - Transforming Communities Since 2009",
    description:
      "Comprehensive social services spanning women's safety, rehabilitation, skill development, and community empowerment across 5+ districts of Rajasthan.",
    siteName: "Marut Narayan Sewa Sansthan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marut Narayan Sewa Sansthan - Transforming Communities Since 2009",
    description:
      "Comprehensive social services spanning women's safety, rehabilitation, skill development, and community empowerment across 5+ districts of Rajasthan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ any: children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="antialiased bg-white text-gray-900"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
