import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { ProgramHighlights } from '@/components/ProgramHighlights';
import { EnhancedStatistics } from '@/components/EnhancedStatistics';

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs & Impact</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Comprehensive community development programs transforming lives across Rajasthan since 2009.
            Explore our documented journey from 2014-2018 and see the real impact we've made together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/progress-reports" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg flex items-center">
              <FileText size={20} className="mr-2" />
              View Annual Reports
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      <ProgramHighlights />
      <EnhancedStatistics />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Transparency Through Documentation</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe in complete transparency and accountability. Our annual progress reports provide detailed
              documentation of every program, its beneficiaries, outcomes, and impact. These reports cover our activities
              from 2014-2018 and showcase our commitment to measurable social change.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-left p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-2">What You'll Find:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Detailed program descriptions</li>
                  <li>• Number of beneficiaries reached</li>
                  <li>• Specific outcomes and impacts</li>
                  <li>• Team member information</li>
                </ul>
              </div>
              <div className="text-left p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-2">Years Covered:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 2014-15 Annual Report</li>
                  <li>• 2015-16 Annual Report</li>
                  <li>• 2016-17 Annual Report</li>
                  <li>• 2017-18 Annual Report</li>
                </ul>
              </div>
            </div>
            <Link href="/progress-reports" className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg">
              <FileText size={20} className="mr-2" />
              Explore Annual Reports
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


