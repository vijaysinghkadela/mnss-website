export type ProgramCategory = 'women-empowerment' | 'traditional-crafts' | 'social-awareness' | 'environmental' | 'government-schemes';

export const ORGANIZATION = {
  fullName: 'Marut Narayan Sewa Sansthan',
  established: '2009',
  registration: {
    rajasthanAct: { number: '87/Nagaur/2009-10' },
    darpanId: 'RJ/2009/0123456',
    gstNumber: '08ABCDE1234F1Z5',
    isoRating: 'ISO 9001:2015',
  },
  location: {
    address: 'Rampole Choraya Station Road',
    city: 'Nagaur',
    state: 'Rajasthan',
    pincode: '341001',
    phone: '01582-240408',
    email: 'marutnarayan7181@gmail.com',
  },
};

export const STATISTICS = {
  overall: {
    totalBeneficiaries: 10000,
    yearsOfService: new Date().getFullYear() - 2009,
    womenEmpowered: 5000,
    programsCompleted: 200,
    employmentGenerated: 800,
    villagesReached: 75,
  },
};

export interface ProgramOutcomes {
  participantsTrained: number;
}

export interface ProgramItem {
  id: string;
  title: string;
  titleHindi: string;
  category: ProgramCategory;
  isActive: boolean;
  shortDescription: string;
  image: string;
  outcomes: ProgramOutcomes;
}

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'p1',
    title: 'Women Entrepreneurship Training',
    titleHindi: 'महिला उद्यमिता प्रशिक्षण',
    category: 'women-empowerment',
    isActive: true,
    shortDescription: 'Skill building and entrepreneurship support for rural women.',
    image: '/images/programs/women-entrepreneurship.jpg',
    outcomes: { participantsTrained: 1200 },
  },
  {
    id: 'p2',
    title: 'Traditional Handicrafts Revival',
    titleHindi: 'पारंपरिक हस्तशिल्प पुनर्जीवन',
    category: 'traditional-crafts',
    isActive: true,
    shortDescription: 'Modernizing traditional crafts and market linkages.',
    image: '/images/programs/handicrafts.jpg',
    outcomes: { participantsTrained: 800 },
  },
  {
    id: 'p3',
    title: 'Community Health Awareness',
    titleHindi: 'समुदाय स्वास्थ्य जागरूकता',
    category: 'social-awareness',
    isActive: false,
    shortDescription: 'Awareness drives on hygiene, nutrition, and well-being.',
    image: '/images/programs/health-awareness.jpg',
    outcomes: { participantsTrained: 1500 },
  },
  {
    id: 'p4',
    title: 'Environmental Conservation',
    titleHindi: 'पर्यावरण संरक्षण',
    category: 'environmental',
    isActive: true,
    shortDescription: 'Tree plantation and water conservation initiatives.',
    image: '/images/programs/environment.jpg',
    outcomes: { participantsTrained: 600 },
  },
  {
    id: 'p5',
    title: 'Government Schemes Awareness',
    titleHindi: 'सरकारी योजनाओं की जानकारी',
    category: 'government-schemes',
    isActive: true,
    shortDescription: 'Workshops to improve access to government benefits.',
    image: '/images/programs/government-schemes.jpg',
    outcomes: { participantsTrained: 900 },
  },
];


