"use client";

import React, { useState } from "react";
// Removed framer-motion to avoid type stub warnings in build

// Lightweight internal icon components to avoid lucide-react dependency issues
const IconChevronDown = (props: { size?: number; className?: string }) => (
  <span className={props.className} style={{ fontSize: props.size || 16 }}>
    ▾
  </span>
);
const IconChevronUp = (props: { size?: number; className?: string }) => (
  <span className={props.className} style={{ fontSize: props.size || 16 }}>
    ▴
  </span>
);
const IconCalendar = (props: { size?: number; className?: string }) => (
  <span className={props.className} style={{ fontSize: props.size || 16 }}>
    📅
  </span>
);
const IconUsers = (props: { size?: number; className?: string }) => (
  <span className={props.className} style={{ fontSize: props.size || 16 }}>
    👥
  </span>
);
const IconTarget = (props: { size?: number; className?: string }) => (
  <span className={props.className} style={{ fontSize: props.size || 16 }}>
    🎯
  </span>
);
const IconTrendingUp = (props: { size?: number; className?: string }) => (
  <span className={props.className} style={{ fontSize: props.size || 16 }}>
    📈
  </span>
);
import {
  progressReportsData,
  getYears,
  getTotalPrograms,
  getTotalBeneficiaries,
  type ProgressReport,
  type Program,
} from "@/data/progressReports";

interface ProgramCardProps {
  program: Program;
  index: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-4">
            {program.name}
          </h3>
          <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <IconUsers size={14} className="mr-1" />
            {program.beneficiaries}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {program.description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          View Outcome
          {isExpanded ? (
            <IconChevronUp size={16} className="ml-1" />
          ) : (
            <IconChevronDown size={16} className="ml-1" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
            <div className="flex items-start">
              <IconTarget
                size={16}
                className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-medium text-green-700">Impact:</span>{" "}
                {program.outcome}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface YearlyReportProps {
  report: ProgressReport;
  isExpanded: boolean;
  onToggle: () => void;
}

const YearlyReport: React.FC<YearlyReportProps> = ({
  report,
  isExpanded,
  onToggle,
}) => {
  const totalBeneficiaries = report.programs.reduce((total, program) => {
    if (typeof program.beneficiaries === "number") {
      return total + program.beneficiaries;
    }
    return total;
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <IconCalendar className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {report.title}
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600 flex items-center">
                  <IconTarget size={14} className="mr-1" />
                  {report.programs.length} Programs
                </span>
                {totalBeneficiaries > 0 && (
                  <span className="text-sm text-gray-600 flex items-center">
                    <IconUsers size={14} className="mr-1" />
                    {totalBeneficiaries.toLocaleString()} Direct Beneficiaries
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isExpanded ? (
              <IconChevronUp size={24} className="text-gray-400" />
            ) : (
              <IconChevronDown size={24} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 animate-fade-in">
          <div className="p-6">
            <div className="grid gap-4 md:gap-6">
              {report.programs.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </div>
            {report.staff && report.staff.length > 0 && (
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Team Members ({report.year})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {report.staff.map((member, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-gray-800">
                        {member.name}
                      </div>
                      <div className="text-gray-600">{member.position}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/70 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-5">
            Annual Progress Reports
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Comprehensive documentation of MNSS&apos;s impactful programs and community development initiatives (2014–2018).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <IconCalendar className="text-blue-600 mr-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">
                  {years.length}
                </span>
              </div>
              <p className="text-gray-600 font-medium">Years Documented</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <IconTarget className="text-green-600 mr-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">
                  {totalPrograms}
                </span>
              </div>
              <p className="text-gray-600 font-medium">Total Programs</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <IconTrendingUp className="text-purple-600 mr-2" size={24} />
                <span className="text-2xl font-bold text-gray-900">
                  {totalBeneficiaries.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 font-medium">Direct Beneficiaries</p>
            </div>
          </div>
        </div>
        <div className="space-y-8 max-w-5xl mx-auto">
          {years.reverse().map((year) => {
            const report = progressReportsData[year];
            if (!report) return null;
            return (
              <YearlyReport
                key={year}
                report={report}
                isExpanded={expandedYear === year}
                onToggle={() => handleToggle(year)}
              />
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <div className="relative overflow-hidden rounded-2xl p-10 bg-white shadow-xl border border-gray-200 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-transparent" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 tracking-tight">
                Our Commitment to Transparency
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                These annual progress reports reflect our dedication to accountability and transparency. Each program is carefully documented to showcase the real impact we&apos;re making across Rajasthan. From skill development to social awareness, every initiative contributes to our mission of empowering marginalized communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnualProgressReports;
