import {
  Organization,
  HeroStat,
  Service,
  TimelineItem,
  Partnership,
  District,
  EmergencyContact,
} from "@/types";

export const organizationData: Organization = {
  name: "Marut Narayan Sewa Sansthan",
  tagline: "Transforming Communities Since 2009",
  established: "2009",
  yearsOfService: 16,
  headquarters: "Rampole Choraya Station Road, Nagaur 341001, Rajasthan",
  phone: "01582-240408",
  email: "marutnarayan7181@gmail.com",
  mission:
    "To create a comprehensive social safety net through women's empowerment, rehabilitation services, skill development, and community transformation across multiple districts of Rajasthan.",
  vision:
    "A society where every individual has access to safety, dignity, skill development, and sustainable livelihoods through integrated social services and government partnerships.",
};

export const heroStats: HeroStat[] = [
  {
    number: 10000,
    label: "Lives Transformed",
    suffix: "+",
    description: "Individuals directly impacted across 5+ districts",
    icon: "users",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 16,
    label: "Years of Service",
    suffix: "",
    description: "Continuous community transformation",
    icon: "calendar",
    color: "from-emerald-500 to-teal-500",
  },
  {
    number: 200,
    label: "Programs Completed",
    suffix: "+",
    description: "Successful training and empowerment courses",
    icon: "target",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: 5,
    label: "Districts Served",
    suffix: "+",
    description: "Multi-district operations across Rajasthan",
    icon: "map",
    color: "from-orange-500 to-red-500",
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: "Women's Safety & Counseling",
    shortDesc:
      "Comprehensive safety network with professional counseling centers",
    icon: "shield",
    bgGradient: "from-rose-500 to-pink-500",
    beneficiaries: "2000+",
    locations: "4 Centers",
    features: [
      "24/7 Crisis Counseling",
      "Legal Aid & Court Support",
      "Police Station Integration",
      "Emergency Shelter",
    ],
    contacts: ["9772062226", "Emergency: 102"],
    districts: [
      "Churu (Ratangarh)",
      "Pratapgarh (Dhariyawad)",
      "Nagaur",
      "Hanumangath",
    ],
  },
  {
    id: 2,
    title: "Drug Rehabilitation & Mental Health",
    shortDesc:
      "Residential treatment centers with integrated therapy approaches",
    icon: "heart",
    bgGradient: "from-emerald-500 to-green-500",
    beneficiaries: "500+",
    locations: "2 Centers",
    features: [
      "Residential Treatment",
      "CBT Therapy",
      "Yoga & Meditation",
      "24/7 Medical Care",
    ],
    contacts: ["Bikaner: 7737631828", "Nagaur: 9414327181"],
  },
  {
    id: 3,
    title: "Government Partnership Programs",
    shortDesc: "Ministry-level collaborations for comprehensive development",
    icon: "handshake",
    bgGradient: "from-blue-500 to-indigo-500",
    beneficiaries: "1000+",
    locations: "5+ Ministries",
    features: [
      "ITDP Furniture Craft",
      "NABARD Financial Literacy",
      "Cultural Heritage",
      "KVIC Training",
    ],
  },
  {
    id: 4,
    title: "Multi-District Skill Development",
    shortDesc: "Comprehensive training across 5+ districts with job placement",
    icon: "graduation",
    bgGradient: "from-purple-500 to-pink-500",
    beneficiaries: "2000+",
    locations: "5+ Districts",
    features: [
      "92-day Programs",
      "Job Placement",
      "Entrepreneurship Support",
      "Multi-trade Training",
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2009",
    title: "Foundation & Vision",
    description:
      "Established in Nagaur with the mission to empower women and children through local outreach programs and community engagement.",
    icon: "star",
    milestone: "Organization Founded",
    impact: "Local community focus",
    image: "/assets/timeline-2009.svg",
    titleHi: "स्थापना और दृष्टि",
    descriptionHi:
      "नागौर में महिलाओं और बच्चों को सशक्त बनाने के उद्देश्य से स्थानीय पहुँच कार्यक्रमों और सामुदायिक भागीदारी के साथ स्थापना की गई।",
    milestoneHi: "संस्था की स्थापना",
    impactHi: "स्थानीय समुदाय पर ध्यान",
  },
  {
    year: "2014-17",
    title: "Growth & Recognition",
    description:
      "Scaled training programs, gained formal government registration, and launched the first multi-district initiatives focused on skills and livelihoods.",
    icon: "book",
    milestone: "Programs Launched",
    impact: "Government recognition",
    image: "/assets/timeline-2014-17.svg",
    titleHi: "विकास और मान्यता",
    descriptionHi:
      "प्रशिक्षण कार्यक्रमों का विस्तार, औपचारिक सरकारी पंजीकरण प्राप्त किया, और कौशल व आजीविका पर केंद्रित बहु-जिला पहलों की शुरुआत की।",
    milestoneHi: "कार्यक्रम शुरू",
    impactHi: "सरकारी मान्यता",
  },
  {
    year: "2022-23",
    title: "Craft Innovation",
    description:
      "Launched craft innovation and handicraft modernization programs in partnership with KVIC and the Ministry of Textiles, enabling artisan incomes and market access.",
    icon: "palette",
    milestone: "Craft Programs",
    impact: "Traditional skills modernized",
    image: "/assets/timeline-2022-23.svg",
    titleHi: "शिल्प नवाचार",
    descriptionHi:
      "KVIC और वस्त्र मंत्रालय के साथ साझेदारी में शिल्प नवाचार और हस्तशिल्प आधुनिकीकरण कार्यक्रम शुरू किए, जिससे कारीगरों की आय और बाजार पहुँच सक्षम हुई।",
    milestoneHi: "शिल्प कार्यक्रम",
    impactHi: "पारंपरिक कौशल का आधुनिकीकरण",
  },
  {
    year: "2024-25",
    title: "Integrated Social Services",
    description:
      "Rolled out integrated women&apos;s safety centers, rehabilitation facilities, and emergency response systems across multiple districts.",
    icon: "hospital",
    milestone: "Specialized Centers",
    impact: "Comprehensive care network",
    image: "/assets/timeline-2024-25.svg",
    titleHi: "समेकित सामाजिक सेवाएँ",
    descriptionHi:
      "कई जिलों में समेकित महिला सुरक्षा केंद्र, पुनर्वास सुविधाएँ और आपातकालीन प्रतिक्रिया प्रणालियाँ लागू की गईं।",
    milestoneHi: "विशेषीकृत केंद्र",
    impactHi: "व्यापक देखभाल नेटवर्क",
  },
];

export const partnerships: Partnership[] = [
  {
    name: "Ministry of Textiles",
    program: "ITDP - Handicrafts Development",
    logo: "🏛️",
    color: "bg-blue-100 text-blue-700",
    impact: "50 artisans with toolkit",
  },
  {
    name: "NABARD",
    program: "Financial Inclusion Fund",
    logo: "🏦",
    color: "bg-green-100 text-green-700",
    impact: "126+ village societies",
  },
  {
    name: "Ministry of Culture",
    program: "Heritage Preservation",
    logo: "🎭",
    color: "bg-purple-100 text-purple-700",
    impact: "Cultural programs",
  },
  {
    name: "KVIC",
    program: "Advanced Craft Training",
    logo: "⚙️",
    color: "bg-orange-100 text-orange-700",
    impact: "Machine distribution",
  },
];

export const districts: District[] = [
  {
    name: "Nagaur",
    status: "Headquarters",
    services: ["All Programs", "Women's Safety", "Rehabilitation"],
    color: "bg-blue-500",
  },
  {
    name: "Churu",
    status: "Active Operations",
    services: ["Women's Safety (Ratangarh)", "126 Societies", "Training"],
    color: "bg-green-500",
  },
  {
    name: "Pratapgarh",
    status: "Active Operations",
    services: ["Women's Safety (Dhariyawad)", "Skill Development"],
    color: "bg-purple-500",
  },
  {
    name: "Bikaner",
    status: "Active Operations",
    services: ["Rehabilitation Center", "KVIC Training", "Navjeevan"],
    color: "bg-orange-500",
  },
];

export const emergencyContacts: EmergencyContact[] = [
  {
    service: "Women's Safety Emergency",
    number: "9772062226",
    available: "24/7",
    type: "crisis",
  },
  {
    service: "General Emergency",
    number: "102",
    available: "24/7",
    type: "emergency",
  },
  {
    service: "Rehabilitation Bikaner",
    number: "7737631828",
    available: "24/7",
    type: "rehabilitation",
  },
  {
    service: "Main Office",
    number: "01582-240408",
    available: "9 AM - 6 PM",
    type: "office",
  },
];
