"use client";

import Image from 'next/image';
import React from 'react';
import type { ProgramItem } from '@/data/constants';

interface ProgramCardProps {
  program: ProgramItem;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-44">
        <Image src={program.image} alt={program.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {program.category}
          </span>
          {program.isActive && (
            <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{program.shortDescription}</p>
        <div className="mt-4 text-xs text-gray-500">
          Trained: {program.outcomes.participantsTrained.toLocaleString()}
        </div>
      </div>
    </div>
  );
}


