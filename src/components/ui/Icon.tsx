"use client";
import React from 'react';

type IconName = 'star' | 'book' | 'palette' | 'hospital' | 'shield' | 'heart' | 'droplet' | 'trophy' | 'users' | 'program' | 'growth' | 'award';

interface IconProps extends React.SVGProps<SVGSVGElement> { name: IconName; }

const paths: Record<IconName, React.ReactElement> = {
  star: <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.3 6.9 20l.98-5.73L4 9.75l5.9-.86L12 3l2.1 5.89 5.9.86-3.88 4.52L17.1 20z" />, // simplified star
  book: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Zm0 0V18" />,
  palette: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c-4.4 0-8 3.13-8 7 0 2.63 1.86 4.44 4 4 .86-.17 1.5-.94 1.5-1.75 0-.69-.5-1.25-1.25-1.25-.7 0-1.25.56-1.25 1.25M12 4c1.5 0 2 1 2 2s-.5 2-2 2m0-4c2.5 0 4 2 4 4s-1.5 4-4 4m0 0c-1.5 0-2 .94-2 2s.5 2 2 2c4.4 0 8-3.13 8-7s-3.6-7-8-7" />,
  hospital: <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M2 21h20M9 8h6m-3-3v6" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5-2.1-7.5-5.3-7.5-9.5V5.4L12 3l7.5 2.4v6.1C19.5 15.7 16.5 18.9 12 21Z" />,
  heart: <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-5.5-3.4-8-7.6C1.4 8.7 2.2 5.2 5 4c2-.9 4 .2 5 2 1-1.8 3-2.9 5-2 2.8 1.2 3.6 4.7 1 8.4-2.5 4.2-8 7.6-8 7.6Z" />,
  droplet: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5S7 9 7 13a5 5 0 0 0 10 0c0-4-5-9.5-5-9.5Z" />,
  trophy: <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-5a5 5 0 0 1-5-5V4h10v7a5 5 0 0 1-5 5Zm0 0v5M5 4H3v2a4 4 0 0 0 4 4M19 4h2v2a4 4 0 0 1-4 4" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m18 0v-2a6 6 0 0 0-6-6h-1m1-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a4 4 0 0 1-5 3.87" />,
  program: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v4H4zm0 6h10v4H4zm0 6h16v4H4z" />,
  growth: <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h4v4H3zM9 13h4v8H9zM15 9h4v12h-4zM3 13l6-6 4 4 7-7" />,
  award: <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0 0 3 9-3-2-3 2 3-9Z" />
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6', strokeWidth = 1.8, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    {paths[name]}
  </svg>
);

export default Icon;