'use client'

import React from 'react'
// avoid framer-motion and lucide-react typing issues; use plain divs and emoji icons
import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { useCounter } from '@/hooks/useCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { heroStats } from '@/lib/data'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  const { elementRef, isVisible } = useScrollAnimation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(59,130,246,0.05)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      <Container className="relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full text-sm font-medium">
                <span className="mr-2">🏅</span>
                16 Years of Trusted Service • ISO 9001:2015 Certified
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transforming{' '}
                <span className=" bg-clip-text bg-gradient-to-r from-primary-600 text-gray-900 to-secondary-600">
                  Lives
                </span>
                <br />
                <span className="text-gray-900 bg-clip-text bg-gradient-to-r from-secondary-600 to-accent-600">
                  Building
                </span>{' '}
                Communities
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Comprehensive social services spanning women&apos;s safety, rehabilitation, skill development,
                and community empowerment across 5+ districts of Rajasthan through trusted government partnerships.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-lg">📍</span>
              <span className="font-medium">Serving Nagaur, Churu, Pratapgarh, Bikaner, Ganganagar</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToElement('services')}
                className="group text-gray-900 bg-purple-300"
            
              >
                Explore Our Services
                <span className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">➤</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToElement('contact')}
              >
                Get Emergency Help
              </Button>
            </div>

      <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
        <span className="text-base">🏛️</span>
                <span>Government Certified</span>
              </div>
            </div>
      </div>

          {/* Stats Cards */}
          <div ref={elementRef} className="grid grid-cols-2 gap-6">
            {heroStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </Container>

      {/* Floating Emergency Button */}
      <a href="tel:9772062226" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group">
        <span className="text-2xl">📞</span>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
      </a>
    </section>
  )
}

interface StatCardProps {
  stat: typeof heroStats[0]
  index: number
  isVisible: boolean
}

function StatCard({ stat, index, isVisible }: StatCardProps) {
  const { count, startAnimation } = useCounter({
    end: stat.number,
    duration: 2500,
    suffix: stat.suffix
  })

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => startAnimation(), index * 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, index, startAnimation])

  return (
    <div className={`relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 overflow-hidden group hover:-translate-y-2`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className="relative z-10">
        <div className="text-3xl mb-2">{stat.icon ?? '🌐'}</div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">{count}</div>
          <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
          <div className="text-xs text-gray-500 leading-relaxed">{stat.description}</div>
        </div>
      </div>
    </div>
  )
}
