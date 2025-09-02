"use client";

import Link from "next/link";
import { Container } from "./ui/Container";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Shield,
  HeartHandshake,
} from "lucide-react";

interface FooterProps {
  showEmergencyRibbon?: boolean;
}

export function Footer({ showEmergencyRibbon = true }: FooterProps) {
  const year = new Date().getFullYear();

  const socials = [
    { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
    { name: "Twitter", href: "https://twitter.com", Icon: Twitter },
    { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
    { name: "YouTube", href: "https://youtube.com", Icon: Youtube },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Programs", href: "#services" },
    { name: "Women's Safety", href: "#services" },
    { name: "Rehabilitation", href: "#services" },
    { name: "Skill Development", href: "#services" },
    { name: "Financial Literacy", href: "#services" },
    { name: "Cultural Heritage", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const districts = [
    "Nagaur (HQ)",
    "Churu (Ratangarh)",
    "Pratapgarh (Dhariyawad)",
    "Bikaner",
    "Ganganagar",
  ];

  return (
    <footer
      aria-label="Site footer"
      className="relative mt-24 border-t border-gray-200 bg-gradient-to-br from-slate-50 to-white"
    >
      {/* Emergency ribbon */}
      {showEmergencyRibbon && (
        <div
          className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white"
          role="region"
          aria-label="Emergency assistance"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-white/90" aria-hidden="true" />
              <p className="text-sm font-semibold tracking-wide">
                24/7 Emergency Support • Women's Safety & Crisis Counseling
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:9772062226"
                className="inline-flex items-center rounded-md bg-white/15 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                Women's Safety: 9772062226
              </a>
              <a
                href="tel:102"
                className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-white/60 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                General Emergency: 102
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main footer content */}
      <div className="relative">
        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 translate-x-10 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 opacity-50 blur-3xl" />
        <Container className="relative z-10">
          <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand + mission */}
            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                  MN
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">
                    Marut Narayan Sewa Sansthan
                  </p>
                  <p className="text-xs text-gray-600">
                    Transforming Communities Since 2009
                  </p>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-6 text-gray-600">
                Integrated social services with government partnerships across
                Rajasthan focusing on women's safety, rehabilitation, and skill
                development.
              </p>
              {/* Socials */}
              <div className="mt-5 flex items-center gap-3">
                {socials.map(({ name, href, Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    aria-label={name}
                    className="group rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer sitemap">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Quick Links
              </p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {quickLinks.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-600 transition hover:text-primary-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Service coverage */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Service Coverage
              </p>
              <ul className="grid gap-2">
                {districts.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <HeartHandshake
                      className="h-4 w-4 text-secondary-600"
                      aria-hidden="true"
                    />
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Partners
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  Ministry of Textiles
                </span>
                <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  NABARD
                </span>
                <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  Ministry of Culture
                </span>
                <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  KVIC
                </span>
                <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  Social Justice Dept.
                </span>
              </div>
            </div>

            {/* Contact */}
            <address className="not-italic">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Contact
              </p>

              <div className="mb-3 flex items-start gap-3 text-sm text-gray-700">
                <MapPin className="mt-0.5 h-4 w-4 text-primary-600" />
                <div>
                  Rampole Choraya Station Road, Nagaur 341001, Rajasthan
                </div>
              </div>

              <div className="mb-3 flex items-center gap-3 text-sm text-gray-700">
                <Phone className="h-4 w-4 text-primary-600" />
                <a
                  href="tel:01582240408"
                  className="hover:text-primary-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  01582-240408
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-primary-600" />
                <a
                  href="mailto:marutnarayan7181@gmail.com"
                  className="hover:text-primary-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  marutnarayan7181@gmail.com
                </a>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Mon–Sat: 9 AM – 6 PM
              </div>
            </address>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-white/70 backdrop-blur">
        <Container className="py-6">
          <div className="flex flex-col items-start justify-between gap-3 text-xs text-gray-600 md:flex-row md:items-center">
            <p>© {year} Marut Narayan Sewa Sansthan • All rights reserved</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>UNIQUE ID: RJ/2016/0109033</span>
              <span>Reg.: 190/Nagaur/2009-10</span>
              <span>ISO 9001:2015</span>
              <span>GST: 08AACAM2564N1Z8</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-primary-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Privacy
              </Link>
              <span aria-hidden="true" className="text-gray-300">
                |
              </span>
              <Link
                href="/terms"
                className="hover:text-primary-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Terms
              </Link>
              <span aria-hidden="true" className="text-gray-300">
                |
              </span>
              <Link
                href="/accessibility"
                className="hover:text-primary-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
