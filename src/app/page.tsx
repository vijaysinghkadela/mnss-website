import React from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Statistics } from '@/components/Statistics'
import { Timeline } from '@/components/Timeline'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-24">
        <Hero />
        <section id="about" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600">Marut Narayan Sewa Sansthan (MNSS) is a Rajasthan-based NGO focused on women&apos;s safety, rehabilitation, and community development. We partner with government bodies to deliver sustained impact across multiple districts.</p>
          </div>
        </section>

        <Services />
        <Statistics />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
