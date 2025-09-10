"use client";

import React from 'react';
import Image from 'next/image';
import { getAllProgressReports, getYears, getTotalPrograms, getTotalBeneficiaries } from '@/data/progressReports';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  imageSrc?: string;
  imageAlt?: string;
  details?: string[];
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, description, color, bgColor, imageSrc, imageAlt, details }) => (
  <div
    className={`${bgColor} rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden transform transition-transform duration-300 hover:scale-[1.04]`}
  >
    {imageSrc && (
      <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none select-none w-32 h-32">
        <Image src={imageSrc} alt={imageAlt || label} fill className="object-contain" />
      </div>
    )}
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      <div className="w-12 h-12 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-3xl font-bold text-gray-900 leading-tight">{value}</div>
        <div className="text-xs uppercase tracking-wide font-semibold text-gray-600">{label}</div>
      </div>
    </div>
    <div className="text-sm text-gray-700 mb-3 leading-relaxed">
      {description}
    </div>
    {details && details.length > 0 && (
      <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
        {details.map(d => <li key={d}>{d}</li>)}
      </ul>
    )}
  </div>
);

export const EnhancedStatistics: React.FC = () => {
  const reports = getAllProgressReports();
  const years = getYears();
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();

  const programsPerYear = Math.round(totalPrograms / years.length);
  const avgBeneficiariesPerProgram = Math.round(totalBeneficiaries / totalPrograms);

  // Categorize programs dynamically by simple keyword grouping
  const categoryKeywords: Record<string, RegExp[]> = {
    'Skill Development': [/sewing/i, /cutting/i, /beauty/i, /training/i, /computer/i, /digital/i, /footwear/i, /pottery/i],
    'Social Awareness': [/legal/i, /awareness/i, /drug/i, /campaign/i, /child/i, /water/i, /swachh/i],
    'Economic Empowerment': [/entrepreneur/i, /livelihood/i, /micro/i, /enterprise/i, /apparel/i, /market/i],
  };

  const categoryCounts: Record<string, number> = { 'Skill Development': 0, 'Social Awareness': 0, 'Economic Empowerment': 0 };
  reports.forEach(r => {
    r.programs.forEach(p => {
      const name = p.name;
      for (const cat of Object.keys(categoryKeywords)) {
        if (categoryKeywords[cat].some(rx => rx.test(name))) {
          categoryCounts[cat] += 1;
          break;
        }
      }
    });
  });
  const totalCategorized = Object.values(categoryCounts).reduce((a,b)=>a+b,0) || 1;
  const pct = (n:number)=> Math.round((n/ totalCategorized)*100);

  const stats: StatCardProps[] = [
    { icon: <span className="text-2xl">📅</span>, value: `${years.length}`, label: 'Years of Service', description: 'Documented program years in repository', color: 'text-blue-600', bgColor: 'bg-blue-50', imageSrc: '/globe.svg', details: [ `From ${years[0]} to ${years[years.length-1]}` ] },
    { icon: <span className="text-2xl">🎯</span>, value: `${totalPrograms}`, label: 'Total Programs', description: 'Unique program entries across all years', color: 'text-green-600', bgColor: 'bg-green-50', imageSrc: '/window.svg', details: [ `${programsPerYear} avg / year` ] },
    { icon: <span className="text-2xl">👥</span>, value: `${totalBeneficiaries.toLocaleString()}`, label: 'Lives Impacted', description: 'Numeric beneficiaries where recorded', color: 'text-purple-600', bgColor: 'bg-purple-50', imageSrc: '/file.svg', details: [ `${avgBeneficiariesPerProgram} avg / program` ] },
    { icon: <span className="text-2xl">📈</span>, value: `${programsPerYear}`, label: 'Programs per Year', description: 'Mean programs executed annually', color: 'text-amber-600', bgColor: 'bg-amber-50', imageSrc: '/next.svg', details: [ `${years.length} active years` ] },
    { icon: <span className="text-2xl">📊</span>, value: `${avgBeneficiariesPerProgram}`, label: 'Avg Beneficiaries', description: 'Average numeric beneficiaries per program', color: 'text-indigo-600', bgColor: 'bg-indigo-50', imageSrc: '/logo.svg', details: [ 'Excludes qualitative counts' ] },
    { icon: <span className="text-2xl">🧩</span>, value: Object.keys(categoryCounts).length.toString(), label: 'Core Categories', description: 'Program thematic clusters detected', color: 'text-teal-600', bgColor: 'bg-teal-50', imageSrc: '/globe.svg', details: Object.entries(categoryCounts).map(([k,v])=> `${k}: ${v}`) },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These statistics reflect our documented progress from 2014-2018, showcasing the tangible impact of our community development initiatives across Rajasthan.
          </p>
  </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

  <div className="bg-white rounded-xl p-8 shadow-lg fade-in-up delay-150">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Program Categories Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg
                bg-gradient-to-br from-blue-500 to-indigo-600" aria-hidden>
                  <span className="text-lg font-bold">{pct(count)}%</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{cat}</h4>
                <p className="text-sm text-gray-600 mb-2">Programs classified via keyword scan</p>
                <div className="text-xs font-semibold text-indigo-600">{count} programs</div>
              </div>
            ))}
          </div>
  </div>

  <div className="mt-16 text-center fade-in-up delay-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Growth Over Time</h3>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {years.map((year, index) => {
                const yearData = reports.find(r => r.year === year);
                const programCount = yearData?.programs.length || 0;
                return (
                  <div key={year} className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${index === years.length - 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      <span className="font-bold text-sm">{year.split('-')[0]}</span>
                    </div>
                    <div className="font-semibold text-gray-800">{programCount}</div>
                    <div className="text-xs text-gray-600">Programs</div>
                  </div>
                );
              })}
            </div>
          </div>
  </div>

  <div className="mt-12 text-center fade-in-up delay-500">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">ISO 9001:2015 Certified Organization</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">Our commitment to quality and systematic approach to community development has been recognized with ISO certification, ensuring the highest standards in all our programs and services.</p>
          </div>
  </div>
      </div>
    </section>
  );
};

export default EnhancedStatistics;


