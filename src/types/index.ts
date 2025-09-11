export interface Organization {
  name: string;
  tagline: string;
  established: string;
  yearsOfService: number;
  headquarters: string;
  phone: string;
  email: string;
  mission: string;
  vision: string;
}

export interface HeroStat {
  number: number;
  label: string;
  suffix: string;
  description: string;
  icon: string;
  color: string;
}

export interface Service {
  id: number;
  title: string;
  shortDesc: string;
  icon: string;
  bgGradient: string;
  beneficiaries: string;
  locations: string;
  features: string[];
  contacts?: string[];
  districts?: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  milestone: string;
  impact: string;
  image?: string; // optional path under /public/assets/
}

export interface Partnership {
  name: string;
  program: string;
  logo: string;
  color: string;
  impact: string;
}

export interface District {
  name: string;
  status: string;
  services: string[];
  color: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
  available: string;
  type: string;
}

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string; // public path under /public
  title: string;
  description?: string;
  createdAt: string; // ISO string
  filename: string;
}
