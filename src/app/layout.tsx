import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Marut Narayan Sewa Sansthan - Transforming Communities Since 2009",
  description: "MNSS is a Rajasthan-based NGO providing women's safety, rehabilitation, skill development, and sustainable community programs across multiple districts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <main className="pt-24">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
