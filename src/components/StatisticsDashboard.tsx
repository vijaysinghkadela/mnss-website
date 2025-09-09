"use client";

import React from 'react';
import { STATISTICS } from '@/data/constants';

export default function StatisticsDashboard() {
  const stats = [
    { label: 'Total Beneficiaries', value: STATISTICS.overall.totalBeneficiaries },
    { label: 'Programs Completed', value: STATISTICS.overall.programsCompleted },
    { label: 'Jobs Created', value: STATISTICS.overall.employmentGenerated },
    { label: 'Villages Reached', value: STATISTICS.overall.villagesReached },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">{s.value.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


