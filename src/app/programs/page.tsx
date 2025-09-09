"use client";

import React, { useState } from 'react';
import ProgramCard from '@/components/ProgramCard';
import { PROGRAMS, ProgramCategory } from '@/data/constants';

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'all'>('all');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const categories: { value: ProgramCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Programs' },
    { value: 'women-empowerment', label: 'Women Empowerment' },
    { value: 'traditional-crafts', label: 'Traditional Crafts' },
    { value: 'social-awareness', label: 'Social Awareness' },
    { value: 'environmental', label: 'Environmental' },
    { value: 'government-schemes', label: 'Government Schemes' },
  ];

  const filteredPrograms = PROGRAMS.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.titleHindi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesStatus = !showActiveOnly || program.isActive;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive training and development programs designed to empower communities and create sustainable livelihoods
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProgramCategory | 'all')}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active only</span>
              </label>
            </div>
            <div className="text-sm text-gray-500">{filteredPrograms.length} results</div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all programs</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setShowActiveOnly(false); }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


