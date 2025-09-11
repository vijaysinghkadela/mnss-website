"use client";

import React from 'react';
// Removed framer-motion & lucide-react; using simple CSS animations / emojis
import { getAllProgressReports, getYears, getTotalPrograms, getTotalBeneficiaries } from '@/data/progressReports';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, description, color, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-lg border border-gray-100 transition-transform hover:-translate-y-1 animate-fade-in`}>    
    <div className={`${color} mb-4`}>
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">
      {value}
    </div>
    <div className="text-lg font-semibold text-gray-800 mb-2">
      {label}
    </div>
    <div className="text-sm text-gray-600">
      {description}
    </div>
  </div>
);

export const EnhancedStatistics: React.FC = () => {
  const reports = getAllProgressReports();
  const years = getYears();
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();

  const programsPerYear = Math.round(totalPrograms / years.length);
  // const avgBeneficiariesPerProgram = Math.round(totalBeneficiaries / totalPrograms);

  const stats = [
    { icon: <span aria-hidden>📅</span>, value: `${years.length}`, label: 'Years of Service', description: 'Consistent community development since 2014', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: <span aria-hidden>🎯</span>, value: `${totalPrograms}+`, label: 'Total Programs', description: 'Diverse initiatives across multiple sectors', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: <span aria-hidden>👥</span>, value: `${totalBeneficiaries.toLocaleString()}+`, label: 'Lives Impacted', description: 'Direct beneficiaries of our programs', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: <span aria-hidden>📈</span>, value: `${programsPerYear}`, label: 'Programs per Year', description: 'Average programs executed annually', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These statistics reflect our documented progress from 2014-2018, showcasing the tangible impact of our community development initiatives across Rajasthan.
          </p>
  </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Program Categories Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                🎯
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Skill Development</h4>
              <p className="text-sm text-gray-600">Comprehensive training programs in sewing, beauty services, computer skills, and traditional crafts</p>
              <div className="mt-3 text-lg font-bold text-blue-600">40% of Programs</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                👥
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Social Awareness</h4>
              <p className="text-sm text-gray-600">Legal literacy, women&apos;s rights, environmental awareness, and community health programs</p>
              <div className="mt-3 text-lg font-bold text-green-600">35% of Programs</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                📈
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Economic Empowerment</h4>
              <p className="text-sm text-gray-600">Entrepreneurship support, micro-enterprises, and livelihood generation initiatives</p>
              <div className="mt-3 text-lg font-bold text-purple-600">25% of Programs</div>
            </div>
          </div>
        </div>

  <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '700ms' }}>
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

        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '900ms' }}>
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


