import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Statistics } from "@/components/Statistics";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import ComprehensiveServices from "@/components/ComprehensiveServices";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-24">
        <Hero />
        <section id="about" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-gray-700 mb-4">
                  Marut Narayan Sewa Sansthan (MNSS) is a Rajasthan-based NGO
                  established in 2009. We focus on women&apos;s safety,
                  rehabilitation, skill development, and sustainable community
                  programs spanning multiple districts. Our work combines
                  grassroots outreach with government partnerships to create
                  lasting impact.
                </p>

                <h3 className="text-lg font-semibold mt-4">Our Mission</h3>
                <p className="text-gray-600">
                  To create a comprehensive social safety net for vulnerable
                  populations through empowerment, rehabilitation, and
                  livelihood programs that restore dignity and create economic
                  opportunity.
                </p>

                <h3 className="text-lg font-semibold mt-4">Our Vision</h3>
                <p className="text-gray-600">
                  A Rajasthan where every woman and family has access to safety,
                  skills, and sustainable livelihoods.
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href="#services"
                    className="inline-flex items-center px-5 py-3 bg-primary-600 text-gray-900  rounded-lg shadow hover:opacity-95 bg-purple-400"
                  >
                    Explore Services
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center px-5 py-3 border border-gray-200 rounded-lg text-gray-700"
                  >
                    Get Help
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  Core Programs
                </h4>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>• Women&apos;s Safety & Crisis Counseling (24/7)</li>
                  <li>• Residential Drug Rehabilitation & Mental Health</li>
                  <li>• Multi-district Skill Development & Job Placement</li>
                  <li>
                    • Government Partnership Programs (KVIC, NABARD, Ministry of
                    Textiles)
                  </li>
                </ul>

                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  Impact Highlights
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-sm text-gray-500">
                      Lives positively impacted
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm text-gray-500">
                      Districts served
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold">200+</div>
                    <div className="text-sm text-gray-500">
                      Programs & trainings
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold">16</div>
                    <div className="text-sm text-gray-500">
                      Years of service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

  {/* <ComprehensiveServices /> */}
  <Services />
        <Statistics />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
