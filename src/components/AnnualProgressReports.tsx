"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, Users, Target, TrendingUp } from 'lucide-react';
import { progressReportsData, getYears, getTotalPrograms, getTotalBeneficiaries, type ProgressReport, type Program } from '@/data/progressReports';

interface ProgramCardProps {
  program: Program;
  index: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-4">{program.name}</h3>
          <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <Users size={14} className="mr-1" />
            {program.beneficiaries}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{program.description}</p>
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          View Outcome
          {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-start">
                <Target size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium text-green-700">Impact:</span> {program.outcome}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface YearlyReportProps {
  report: ProgressReport;
  isExpanded: boolean;
  onToggle: () => void;
}

const YearlyReport: React.FC<YearlyReportProps> = ({ report, isExpanded, onToggle }) => {
  const totalBeneficiaries = report.programs.reduce((total, program) => {
    if (typeof program.beneficiaries === 'number') {
      return total + program.beneficiaries;
    }
    return total;
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{report.title}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600 flex items-center">
                  <Target size={14} className="mr-1" />
                  {report.programs.length} Programs
                </span>
                {totalBeneficiaries > 0 && (
                  <span className="text-sm text-gray-600 flex items-center">
                    <Users size={14} className="mr-1" />
                    {totalBeneficiaries.toLocaleString()} Direct Beneficiaries
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isExpanded ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-100 bg-gray-50">
            <div className="p-6">
              <div className="grid gap-4 md:gap-6">
                {report.programs.map((program, index) => (
                  <ProgramCard key={index} program={program} index={index} />
                ))}
              </div>
              {report.staff && report.staff.length > 0 && (
                <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Team Members ({report.year})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {report.staff.map((member, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-gray-800">{member.name}</div>
                        <div className="text-gray-600">{member.position}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AnnualProgressReports: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const years = getYears();
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();

  const handleToggle = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Annual Progress Reports</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Comprehensive documentation of MNSS's impactful programs and community development initiatives from 2014-2018.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="text-blue-600 mr-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">{years.length}</span>
              </div>
              <p className="text-gray-600 font-medium">Years Documented</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Target className="text-green-600 mr-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">{totalPrograms}</span>
              </div>
              <p className="text-gray-600 font-medium">Total Programs</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="text-purple-600 mr-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">{totalBeneficiaries.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 font-medium">Direct Beneficiaries</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {years.reverse().map((year) => {
            const report = progressReportsData[year];
            if (!report) return null;
            return <YearlyReport key={year} report={report} isExpanded={expandedYear === year} onToggle={() => handleToggle(year)} />;
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Transparency</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">These annual progress reports reflect our dedication to accountability and transparency. Each program is carefully documented to showcase the real impact we're making in communities across Rajasthan. From skill development to social awareness, every initiative contributes to our mission of empowering marginalized communities.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnnualProgressReports;


