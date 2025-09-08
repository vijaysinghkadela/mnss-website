"use client"

import React from 'react'
import { Container } from './ui/Container'
import { Card, CardContent } from './ui/Card'
import { Button } from './ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const reports = [
  { year: '2014-15', file: '/documents/2014-15 Progress Report.pdf' },
  { year: '2015-16', file: '/documents/2015-16 Progress Report.pdf' },
  { year: '2016-17', file: '/documents/2016-17 Progress Report.pdf' },
  { year: '2017-18', file: '/documents/2017-18 Progress Report.pdf' },
  { year: '2018-19', file: '/documents/2018-19 Progress Report.pdf' },
  { year: '2019-20', file: '/documents/2019-20 Progress Report.pdf' },
  { year: '2020-21', file: '/documents/2020-21 Progress Report.pdf' },
  { year: '2021-22', file: '/documents/2021-22 Progress Report.pdf' },
  { year: '2022-23', file: '/documents/2022-23 Progress Report.pdf' },
  { year: '2023-24', file: '/documents/2023-24 Progress Report.pdf' },
  { year: '2024-25', file: '/documents/2024-25 Progress Report.pdf' },
]

export function Reports() {
  const { t } = useLanguage()
  return (
    <section id="reports" className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">{t('reportsTitle')}</h2>
          <p className="text-gray-600 mt-2">{t('reportsDescription') || ''}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reports.map((r) => (
            <Card key={r.year} className="p-4 flex items-center justify-between">
              <CardContent className="flex items-center justify-between w-full">
                <div>
                  <div className="text-lg font-semibold">{r.year}</div>
                  <div className="text-sm text-gray-500">{t('downloadReport')}</div>
                </div>

                <div>
                  <a href={r.file} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">{t('downloadReport')}</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
