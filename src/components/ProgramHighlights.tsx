"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Heart, Shield, Palette, Droplets } from 'lucide-react';
import { getTotalPrograms, getTotalBeneficiaries, getAllProgressReports } from '@/data/progressReports';

interface ProgramHighlight {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
  color: string;
  bgColor: string;
}

const programHighlights: ProgramHighlight[] = [
  { id: 'skills', title: 'Skill Development Programs', description: 'Comprehensive training in sewing, beauty services, computer skills, and traditional crafts', icon: <BookOpen size={24} />, impact: '500+ women trained across multiple skills', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'awareness', title: 'Social Awareness Campaigns', description: "Legal literacy, drug awareness, and women's rights education programs", icon: <Shield size={24} />, impact: 'Community-wide impact across multiple districts', color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 'handicrafts', title: 'Traditional Handicrafts', description: 'Preserving traditional arts while creating modern market opportunities', icon: <Palette size={24} />, impact: 'Market access for 100+ artisans', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { id: 'empowerment', title: "Women's Empowerment", description: 'Economic independence through entrepreneurship and skill building', icon: <Heart size={24} />, impact: '200+ women entrepreneurs created', color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { id: 'environment', title: 'Environmental Initiatives', description: 'Water conservation, sanitation, and clean city campaigns', icon: <Droplets size={24} />, impact: 'Improved sanitation for thousands', color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { id: 'recognition', title: 'ISO Certified Organization', description: 'ISO 9001:2015 certified for quality management systems', icon: <Award size={24} />, impact: 'Recognized for excellence in service delivery', color: 'text-amber-600', bgColor: 'bg-amber-50' }
];

export const ProgramHighlights: React.FC = () => {
  const totalPrograms = getTotalPrograms();
  const totalBeneficiaries = getTotalBeneficiaries();
  const reports = getAllProgressReports();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Highlights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover the diverse range of programs that have been transforming lives and building stronger communities since 2009.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalPrograms}+</div>
            <div className="text-sm text-gray-600 font-medium">Total Programs</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalBeneficiaries.toLocaleString()}+</div>
            <div className="text-sm text-gray-600 font-medium">Direct Beneficiaries</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">{reports.length}</div>
            <div className="text-sm text-gray-600 font-medium">Years Documented</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
            <div className="text-3xl font-bold text-pink-600 mb-2">5+</div>
            <div className="text-sm text-gray-600 font-medium">Districts Served</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programHighlights.map((highlight, index) => (
            <motion.div key={highlight.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className={`${highlight.bgColor} ${highlight.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{highlight.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{highlight.description}</p>
              <div className={`${highlight.color} font-medium text-sm flex items-center`}>
                <Users size={16} className="mr-2" />
                {highlight.impact}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Interested in Our Detailed Progress Reports?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Explore our comprehensive annual reports that showcase the detailed impact, beneficiaries, and outcomes of each program from 2014-2018.</p>
            <a href="/progress-reports" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg">View Annual Reports →</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramHighlights;


