import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align='left', className }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : ''} ${className || ''}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/60 text-[11px] font-semibold tracking-wide text-blue-700 uppercase shadow-sm mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionHeading;