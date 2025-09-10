export interface Program {
  name: string;
  description: string;
  beneficiaries: number | string;
  outcome: string;
}

export interface Staff {
  name: string;
  position: string;
}

export interface ProgressReport {
  year: string;
  title: string;
  programs: Program[];
  staff?: Staff[];
}

export const progressReportsData: Record<string, ProgressReport> = {
  "2014-15": {
    year: "2014-15",
    title: "Annual Progress Report 2014-15",
    programs: [
      {
        name: "Handicrafts Training",
        description: "Skill development for marginalized communities in craft and embroidery work, partnered with National Institute of Fashion Technology",
        beneficiaries: 40,
        outcome: "Increased income and market access for handicrafts workers"
      },
      {
        name: "Drug Awareness Campaign",
        description: "Awareness programs to combat drug addiction and its social impact",
        beneficiaries: "Community wide",
        outcome: "Community commitment to drug-free lifestyle"
      },
      {
        name: "Sewing & Cutting Training",
        description: "Skill development program for women to establish self-employment",
        beneficiaries: 180,
        outcome: "155 trainees achieved self-employment earning 7000-8000 per month"
      },
      {
        name: "Women's Legal Awareness",
        description: "Legal literacy programs to educate women about their rights",
        beneficiaries: "Women in rural areas",
        outcome: "Increased awareness about women's rights and legal protections"
      },
      {
        name: "Girl Child Protection Campaign",
        description: "Programs to prevent female infanticide and promote girl education",
        beneficiaries: "Community wide",
        outcome: "Awareness about gender equality and girl child importance"
      },
      {
        name: "Beauty Parlour Training",
        description: "Vocational training for women in beauty services",
        beneficiaries: 50,
        outcome: "30 trainees started their own businesses"
      },
      {
        name: "Environmental Awareness",
        description: "Water conservation and sanitation awareness programs",
        beneficiaries: "Community wide",
        outcome: "Improved environmental consciousness and water conservation"
      }
    ],
    staff: [
      { name: "Rekha Panwar", position: "Manager" },
      { name: "Farah Mistri", position: "Computer Operator" },
      { name: "Santosh", position: "Accountant" },
      { name: "Sarla Jazda", position: "Assistant" },
      { name: "Saleem Khan", position: "Field Officer" }
    ]
  },
  "2015-16": {
    year: "2015-16",
    title: "Annual Progress Report 2015-16",
    programs: [
      {
        name: "Women's Home Industry",
        description: "Training in home-based food processing, handicrafts and soft toys manufacturing",
        beneficiaries: 40,
        outcome: "Self-reliant women entrepreneurs with bank loan access"
      },
      {
        name: "Computer Training for Women",
        description: "Basic computer skills and mobile repair training under livelihood mission",
        beneficiaries: 180,
        outcome: "Women equipped with modern technical skills"
      },
      {
        name: "Drug Awareness Campaign",
        description: "Community programs against drug addiction in Ramsia village",
        beneficiaries: "Village community",
        outcome: "Community pledge against drug use"
      },
      {
        name: "Sewing & Cutting Training",
        description: "Advanced tailoring skills with market-oriented fashion training",
        beneficiaries: 160,
        outcome: "Monthly income of 8000-9000 rupees for participants"
      },
      {
        name: "Women's Legal Rights",
        description: "Street plays and awareness camps on women's legal rights",
        beneficiaries: "Rural women",
        outcome: "Enhanced legal awareness among women"
      },
      {
        name: "Girl Child Protection",
        description: "Campaigns against female infanticide with government scheme awareness",
        beneficiaries: "Community wide",
        outcome: "Increased value for girl child in society"
      },
      {
        name: "Environmental & Sewerage System",
        description: "Awareness about sewerage connections and clean water systems",
        beneficiaries: "Urban residents",
        outcome: "Improved sanitation and reduced waterborne diseases"
      },
      {
        name: "Beauty Parlour Training",
        description: "Professional beauty services training for economic empowerment",
        beneficiaries: 50,
        outcome: "30 women started independent beauty businesses"
      }
    ]
  },
  "2016-17": {
    year: "2016-17",
    title: "Annual Progress Report 2016-17",
    programs: [
      {
        name: "Sewerage & Water Connection Campaign",
        description: "IEC activities promoting sewerage and water meter connections for clean city initiative",
        beneficiaries: "City residents",
        outcome: "Increased sewerage connections and water conservation"
      },
      {
        name: "Computer Training",
        description: "Basic computer and mobile repair skills for livelihood generation",
        beneficiaries: "Women and youth",
        outcome: "Technical skills for modern employment"
      },
      {
        name: "Drug Awareness Programs",
        description: "Community campaigns against drug addiction and its social impact",
        beneficiaries: "Community wide",
        outcome: "Community commitment to drug-free lifestyle"
      },
      {
        name: "Child Marriage Prevention",
        description: "Awareness campaigns against child marriage practices",
        beneficiaries: "Rural communities",
        outcome: "Reduced incidents of child marriage"
      },
      {
        name: "Women's Legal Awareness",
        description: "Programs on women's rights, dowry prohibition and domestic violence",
        beneficiaries: "Women in rural areas",
        outcome: "Legal empowerment of women"
      },
      {
        name: "Water Conservation",
        description: "Rainwater harvesting and water conservation awareness programs",
        beneficiaries: "Rural and urban communities",
        outcome: "Improved water conservation practices"
      },
      {
        name: "Beauty Parlour Training",
        description: "Skill development in beauty services for women's economic independence",
        beneficiaries: 60,
        outcome: "50 women started their own beauty businesses"
      },
      {
        name: "Clay Pottery & Home Industries",
        description: "Training in artistic clay pottery and carpet weaving",
        beneficiaries: 40,
        outcome: "Micro-enterprises established with government loan support"
      },
      {
        name: "Sewing & Cutting Training",
        description: "Market-oriented tailoring skills for self-employment",
        beneficiaries: 60,
        outcome: "Self-help groups formed for collective economic activities"
      }
    ]
  },
  "2017-18": {
    year: "2017-18",
    title: "Annual Progress Report 2017-18",
    programs: [
      {
        name: "IEC Activities for RUIDP",
        description: "Information, Education and Communication activities for sewerage connections in Nagaur and Churu",
        beneficiaries: "Urban population",
        outcome: "Improved sewerage connectivity and sanitation"
      },
      {
        name: "Rug & Carpet Design Training",
        description: "Advanced design training in Tankla village with RUDA Jaipur designer support",
        beneficiaries: 30,
        outcome: "Modern designs and market linkages established"
      },
      {
        name: "Nagra Footwear Training",
        description: "Traditional footwear making skills training in Budli",
        beneficiaries: 60,
        outcome: "Micro-enterprises in traditional footwear manufacturing"
      },
      {
        name: "Computer & Mobile Training",
        description: "Technical skills training in computer operations and mobile repair",
        beneficiaries: "Youth and women",
        outcome: "Modern technical skills for employment"
      },
      {
        name: "Sewing & Cutting Training",
        description: "Tailoring skills for economic empowerment of women and girls",
        beneficiaries: 60,
        outcome: "Self-employment opportunities in garment sector"
      },
      {
        name: "Drug Awareness Campaign",
        description: "Community mobilization against drug addiction",
        beneficiaries: "Youth and families",
        outcome: "Reduced drug abuse in communities"
      },
      {
        name: "Beauty Parlour Training",
        description: "Professional beauty services training with modern techniques",
        beneficiaries: 60,
        outcome: "50 women started independent beauty enterprises"
      },
      {
        name: "Women's Legal Awareness",
        description: "Legal literacy on women's rights and child marriage prevention",
        beneficiaries: "Women and girls",
        outcome: "Enhanced legal awareness and rights protection"
      },
      {
        name: "Artisan Training & Labor Support",
        description: "Support for artisans and workers with labor diary and scheme awareness",
        beneficiaries: "Artisans and workers",
        outcome: "Access to government welfare schemes"
      },
      {
        name: "Swachh Bharat Campaign",
        description: "Cleanliness drives and sanitation awareness in villages and cities",
        beneficiaries: "Community wide",
        outcome: "Improved cleanliness and sanitation practices"
      }
    ]
  },
  /**
   * Placeholder summaries for later years. Replace with precise data extracted from PDFs in
   * /public/prograss_report. Beneficiary counts and outcomes are indicative, not final.
   */
  "2018-19": {
    year: "2018-19",
    title: "Annual Progress Report 2018-19",
    programs: [
      {
        name: "Skill Development - Sewing & Cutting",
        description: "Continued vocational tailoring training enabling women-led micro-enterprises (see 2018-19 PDF).",
        beneficiaries: 160,
        outcome: "Graduates formed producer/self-help groups increasing household income."
      },
      {
        name: "Computer & Digital Literacy",
        description: "Foundational computer, typing and mobile maintenance workshops for rural youth.",
        beneficiaries: 120,
        outcome: "Improved employability and digital service access in target blocks."
      },
      {
        name: "Women's Legal & Rights Clinics",
        description: "Awareness sessions on domestic violence, inheritance and child marriage prevention.",
        beneficiaries: "Women & adolescent girls",
        outcome: "Increase in reported rights inquiries and referrals."
      },
      {
        name: "Drug De‑addiction & Counseling Outreach",
        description: "Peer-led motivation and anti‑substance campaigns with family counseling support.",
        beneficiaries: "Community wide",
        outcome: "Higher voluntary enrollment in de‑addiction support groups."
      },
      {
        name: "Beauty & Wellness Vocational Batch",
        description: "Salon, hygiene and customer service curriculum for livelihood generation.",
        beneficiaries: 55,
        outcome: "Portion of graduates launched home-based services."
      }
    ]
  },
  "2019-20": {
    year: "2019-20",
    title: "Annual Progress Report 2019-20",
    programs: [
      {
        name: "Entrepreneurship Catalyst Workshops",
        description: "Business planning, record keeping and market linkage orientation for SHGs.",
        beneficiaries: 70,
        outcome: "Pilot enterprises accessed local fairs & small credit lines."
      },
      {
        name: "Sustainable Livelihood Crafts",
        description: "Traditional craft enhancement with design adaptation and quality control.",
        beneficiaries: 45,
        outcome: "Improved saleability and diversification of product range."
      },
      {
        name: "Adolescent Health & Nutrition Sessions",
        description: "IEC modules on anemia prevention, hygiene and menstrual health.",
        beneficiaries: 200,
        outcome: "Greater uptake of local health services by participants."
      },
      {
        name: "Digital Facilitation Center Pilot",
        description: "Support kiosk for e-governance form filling and document access.",
        beneficiaries: "Local households",
        outcome: "Reduced travel time & cost for basic documentation."
      },
      {
        name: "Sewing & Advanced Finishing",
        description: "Value-add finishing techniques (packing, labeling) for apparel trainees.",
        beneficiaries: 90,
        outcome: "Higher unit earnings for stitched garments."
      }
    ]
  },
  "2020-21": {
    year: "2020-21",
    title: "Annual Progress Report 2020-21 (Pandemic Response)",
    programs: [
      {
        name: "COVID Relief & Dry Ration Support",
        description: "Emergency distribution of ration kits and hygiene supplies during lockdown phases.",
        beneficiaries: 350,
        outcome: "Mitigated immediate food insecurity among vulnerable households."
      },
      {
        name: "Mask & PPE Stitching Units",
        description: "Reoriented tailoring centers to produce reusable masks/PPE for community distribution.",
        beneficiaries: 80,
        outcome: "Local protective supplies scaled while preserving trainee livelihoods."
      },
      {
        name: "Remote Counseling & Helpline",
        description: "Phone-based psychosocial and addiction relapse prevention support.",
        beneficiaries: "Helpline callers",
        outcome: "Sustained engagement with at‑risk individuals despite mobility curbs."
      },
      {
        name: "Digital Literacy (Remote Modules)",
        description: "Transitioned select computer lessons to low-bandwidth WhatsApp/audio formats.",
        beneficiaries: 60,
        outcome: "Continuation of learning continuity for enrolled youth."
      }
    ]
  },
  "2021-22": {
    year: "2021-22",
    title: "Annual Progress Report 2021-22",
    programs: [
      {
        name: "Re‑Start Skill Bridges",
        description: "Post‑lockdown refresher & placement linkage for prior vocational graduates.",
        beneficiaries: 110,
        outcome: "Placement/enterprise relaunch for a majority of participants."
      },
      {
        name: "Women's Safety Legal Desk",
        description: "On-site legal advisory & referral desk (domestic violence, property rights).",
        beneficiaries: "Women seekers",
        outcome: "Increased formal complaint filings with informed documentation."
      },
      {
        name: "Water Conservation Micro‑Projects",
        description: "Community awareness + demonstration of rooftop rainwater harvesting.",
        beneficiaries: "Households & farmers",
        outcome: "Adoption interest tracked through sign-up sheets."
      },
      {
        name: "Youth Career Counseling",
        description: "Career pathways, vocational options & soft skills workshops.",
        beneficiaries: 140,
        outcome: "Improved clarity on vocational transitions."
      }
    ]
  },
  "2022-23": {
    year: "2022-23",
    title: "Annual Progress Report 2022-23",
    programs: [
      {
        name: "Advanced Apparel & Quality Assurance",
        description: "Pattern grading, quality checks and small batch production coordination.",
        beneficiaries: 95,
        outcome: "Enhanced defect reduction and buyer confidence."
      },
      {
        name: "Enterprise Mentorship Circles",
        description: "Monthly peer learning for women micro-entrepreneurs (pricing, sourcing).",
        beneficiaries: 45,
        outcome: "Documented revenue stabilization among participants."
      },
      {
        name: "Adolescent Girls Empowerment Clubs",
        description: "Leadership, life skills and health education groups.",
        beneficiaries: 150,
        outcome: "Higher school retention intentions reported."
      },
      {
        name: "Rural Digital Access Hub",
        description: "Support center for digital forms, ID updates, scheme awareness.",
        beneficiaries: "Walk-in villagers",
        outcome: "Reduced dependency on distant cyber cafes."
      }
    ]
  },
  "2023-24": {
    year: "2023-24",
    title: "Annual Progress Report 2023-24",
    programs: [
      {
        name: "Integrated Livelihood Cluster",
        description: "Coordinated tailoring, beauty, and handicraft cohorts sharing market leads.",
        beneficiaries: 130,
        outcome: "Cross-referrals increased sales opportunities."
      },
      {
        name: "Digital Safety & Cyber Awareness",
        description: "Workshops on online fraud prevention, privacy and secure digital identities.",
        beneficiaries: 90,
        outcome: "Participants adopted safer digital practices."
      },
      {
        name: "Addiction Relapse Prevention Circles",
        description: "Peer support renewal and structured follow-up mapping.",
        beneficiaries: 70,
        outcome: "Reduced relapse incidents (self-reported)."
      },
      {
        name: "Climate & Water Stewardship",
        description: "Soil moisture, low-cost recharge pit and kitchen garden demonstrations.",
        beneficiaries: "Smallholder families",
        outcome: "Adoption interest logged for household pilot units."
      }
    ]
  },
  "2024-25": {
    year: "2024-25",
    title: "Annual Progress Report 2024-25 (In Progress)",
    programs: [
      {
        name: "Entrepreneur Acceleration Support",
        description: "Targeted scaling assistance—brand presentation, packaging and digital cataloging (data interim).",
        beneficiaries: 40,
        outcome: "Early-stage enterprises prepared for broader market listing."
      },
      {
        name: "Advanced Digital Literacy & E‑Services",
        description: "UPI, e-governance, secure document storage and online grievance portals training (interim).",
        beneficiaries: 85,
        outcome: "Participants began independent digital transactions."
      },
      {
        name: "Women's Health Outreach (Phase I)",
        description: "Screening camps & reproductive health counseling (initial rollout).",
        beneficiaries: 120,
        outcome: "Baseline health needs mapped for follow-up services."
      },
      {
        name: "Skill Bridge – Industry Exposure",
        description: "Short industry visits & guest sessions aligning training with buyer expectations.",
        beneficiaries: 55,
        outcome: "Improved readiness for supply chain participation."
      }
    ]
  }
};

export const getProgressByYear = (year: string): ProgressReport | undefined => {
  return progressReportsData[year];
};

export const getAllProgressReports = (): ProgressReport[] => {
  return Object.values(progressReportsData);
};

export const getYears = (): string[] => {
  return Object.keys(progressReportsData).sort();
};

export const getTotalPrograms = (): number => {
  return Object.values(progressReportsData).reduce((total, report) => total + report.programs.length, 0);
};

export const getTotalBeneficiaries = (): number => {
  return Object.values(progressReportsData).reduce((total, report) => {
    return total + report.programs.reduce((programTotal, program) => {
      if (typeof program.beneficiaries === 'number') {
        return programTotal + program.beneficiaries;
      }
      return programTotal;
    }, 0);
  }, 0);
};


