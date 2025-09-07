 'use client'

import React from 'react'
import { Container } from './ui/Container'
import { Card } from './ui/Card'
import { useCounter } from '@/hooks/useCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const statistics = [
  {
    number: 10000,
    suffix: '+',
    label: 'Lives Transformed',
    description: 'Individuals directly impacted across all programs',
  },
  {
    number: 200,
    suffix: '+',
    label: 'Programs Completed',
    description: 'Successful training and empowerment initiatives',
  },
  {
    number: 5,
    suffix: '+',
    label: 'Districts Served',
    description: 'Multi-district operations across Rajasthan',
  },
  {
    number: 16,
    suffix: '',
    label: 'Years of Service',
    description: 'Continuous community transformation since 2009',
  }
]

export function Statistics() {
  const { elementRef, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
      <Container>
  <div ref={elementRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{' '}
            <span className="text-gray-900 bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Impact
            </span>{' '}
            in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Measurable outcomes that reflect our commitment to community transformation 
            and sustainable social development across Rajasthan.
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
    <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              24/7
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Support</h3>
            <p className="text-gray-600 text-sm">
              Round-the-clock crisis intervention and emergency services across all centers
            </p>
          </Card>

          <Card className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              ISO
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Certified</h3>
            <p className="text-gray-600 text-sm">
              ISO 9001:2015 certified organization with government recognition
            </p>
          </Card>

          <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
              126+
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Village Coverage</h3>
            <p className="text-gray-600 text-sm">
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

    // render a simple emoji icon instead of external icon components
    const IconEmoji = '📊'

  return (
    <div>
      <Card 
        hover 
        className={`text-center p-8 relative overflow-hidden group border-0`}>
        {/* Background Gradient */}
  <div className={`absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Icon */}
        <div className="relative z-10 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
              <span className="text-2xl">{IconEmoji}</span>
            </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
            {count.toLocaleString()}{stat.suffix}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {stat.label}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
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
