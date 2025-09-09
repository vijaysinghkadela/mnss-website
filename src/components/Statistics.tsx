'use client'

import React from 'react'
import { Container } from './ui/Container'
import { Card } from './ui/Card'
import { useCounter } from '@/hooks/useCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/context/LanguageContext'

const statistics = [
  {
    number: 10000,
    suffix: '+',
    label: 'Lives Transformed',
    description: 'Individuals directly impacted across all programs',
    icon: '👥',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100'
  },
  {
    number: 200,
    suffix: '+',
    label: 'Programs Completed',
    description: 'Successful training and empowerment initiatives',
    icon: '🎯',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'from-emerald-50 to-emerald-100'
  },
  {
    number: 5,
    suffix: '+',
    label: 'Districts Served',
    description: 'Multi-district operations across Rajasthan',
    icon: '🗺️',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'from-amber-50 to-amber-100'
  },
  {
    number: 16,
    suffix: '',
    label: 'Years of Service',
    description: 'Continuous community transformation since 2009',
    icon: '⏰',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100'
  }
]

export function Statistics() {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div ref={elementRef} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-amber-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">📊</span>
            Impact Metrics
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('statisticsTitle')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('statisticsDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Impact Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              24/7
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Emergency Support</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Round-the-clock crisis intervention and emergency services across all centers
            </p>
          </Card>

          <Card className="text-center p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              ISO
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Quality Certified</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              ISO 9001:2015 certified organization with government recognition
            </p>
          </Card>

          <Card className="text-center p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              126+
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Village Coverage</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Financial literacy and banking services across village cooperative societies
            </p>
          </Card>
        </div>
      </Container>
    </section>
  )
}

interface StatisticCardProps {
  stat: typeof statistics[0]
  index: number
  isVisible: boolean
}

function StatisticCard({ stat, index, isVisible }: StatisticCardProps) {
  const { count, startAnimation } = useCounter({
    end: stat.number,
    duration: 2500,
  })

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => startAnimation(), index * 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, index, startAnimation])

  return (
    <div className="group">
      <Card 
        hover 
        className={`text-center p-8 relative overflow-hidden border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2`}>
        
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
        
        {/* Icon */}
        <div className="relative z-10 mb-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-5xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">
            {count.toLocaleString()}{stat.suffix}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            {stat.label}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {stat.description}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75" />
      </Card>
    </div>
  )
}