"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "hi";

type LanguageContextType = {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  t: (key: string) => string;
};

const translations: Record<string, { en: string; hi: string }> = {
  home: { en: "Home", hi: "होम" },
  about: { en: "About", hi: "हमारे बारे में" },
  services: { en: "Services", hi: "सेवाएँ" },
  impact: { en: "Impact", hi: "प्रभाव" },
  contact: { en: "Contact", hi: "संपर्क" },
  emergency: { en: "Emergency", hi: "आपातकाल" },
  getHelp: { en: "Get Help", hi: "मदद लें" },
  explore: { en: "Explore Services", hi: "सेवाएँ देखें" },
  aboutTitle: { en: "About Us", hi: "हमारे बारे में" },
  mission: { en: "Our Mission", hi: "हमारा लक्ष्य" },
  vision: { en: "Our Vision", hi: "हमारी दृष्टि" },
  exploreServices: { en: "Explore Services", hi: "सेवाएँ देखें" },
  getHelpShort: { en: "Get Help", hi: "मदद लें" },
  exploreHero: { en: "Explore Our Services", hi: "हमारी सेवाएँ देखें" },
  emergencyHelp: {
    en: "Get Emergency Help",
    hi: "आपातकालीन सहायता प्राप्त करें",
  },
  serving: {
    en: "Serving Nagaur, Churu, Pratapgarh, Bikaner, Ganganagar",
    hi: "नागौर, चूरू, प्रतापगढ़, बीकानेर, गंगानगर में सेवा",
  },
  donate: { en: "Donate", hi: "दान करें" },
  heroTransforming: { en: "Transforming", hi: "परिवर्तन" },
  heroLives: { en: "Lives", hi: "जीवन" },
  heroBuilding: { en: "Building", hi: "निर्माण" },
  heroCommunities: { en: "Communities", hi: "समुदाय" },
  // Additional UI translations
  aboutParagraph: {
    en: "Marut Narayan Sewa Sansthan (MNSS) is a Rajasthan-based NGO established in 2009. We focus on women's safety, rehabilitation, skill development, and sustainable community programs spanning multiple districts. Our work combines grassroots outreach with government partnerships to create lasting impact.",
    hi: "मरुत नारायण सेवा संस्थान (MNSS) राजस्थान आधारित एक गैर-लाभकारी संगठन है, जिसकी स्थापना 2009 में हुई। हम महिलाओं की सुरक्षा, पुनर्वास, कौशल विकास और सतत सामुदायिक कार्यक्रमों पर काम करते हैं। हमारा कार्य स्थानीय स्तर पर सरकारी साझेदारियों के साथ मिलकर स्थायी प्रभाव बनाता है।",
  },
  missionText: {
    en: "To create a comprehensive social safety net for vulnerable populations through empowerment, rehabilitation, and livelihood programs that restore dignity and create economic opportunity.",
    hi: "सशक्तिकरण, पुनर्वास और आजीविका कार्यक्रमों के माध्यम से कमजोर समूहों के लिए एक समग्र सामाजिक सुरक्षा जाल बनाना, जो गरिमा बहाल करे और आर्थिक अवसर पैदा करे।",
  },
  visionText: {
    en: "A Rajasthan where every woman and family has access to safety, skills, and sustainable livelihoods.",
    hi: "एक राजस्थान जहां हर महिला और परिवार को सुरक्षा, कौशल और सतत आजीविका तक पहुंच हो।",
  },
  corePrograms: { en: "Core Programs", hi: "मुख्य कार्यक्रम" },
  coreProgram1: {
    en: "Women's Safety & Crisis Counseling (24/7)",
    hi: "महिला सुरक्षा और संकट परामर्श (24/7)",
  },
  coreProgram2: {
    en: "Residential Drug Rehabilitation & Mental Health",
    hi: "रेसिडेंशियल नशा पुनर्वास और मानसिक स्वास्थ्य",
  },
  coreProgram3: {
    en: "Multi-district Skill Development & Job Placement",
    hi: "बहु-जिला कौशल विकास और नौकरी प्लेसमेंट",
  },
  coreProgram4: {
    en: "Government Partnership Programs (KVIC, NABARD, Ministry of Textiles)",
    hi: "सरकारी साझेदारी कार्यक्रम (KVIC, NABARD, वस्त्र मंत्रालय)",
  },
  impactHighlights: { en: "Impact Highlights", hi: "प्रभाव हाइलाइट्स" },
  livesPositivelyImpacted: {
    en: "Lives positively impacted",
    hi: "लोगों पर सकारात्मक प्रभाव",
  },
  districtsServed: { en: "Districts served", hi: "सेवा वाले जिले" },
  programsTrainings: {
    en: "Programs & trainings",
    hi: "कार्यक्रम और प्रशिक्षण",
  },
  emergencySupport: { en: "Emergency Support", hi: "आपातकालीन सहायता" },
  emergencySupportDesc: {
    en: "Round-the-clock crisis intervention and emergency services across all centers",
    hi: "सभी केंद्रों पर चौबीसों घंटे संकट हस्तक्षेप और आपातकालीन सेवाएँ",
  },
  qualityCertified: { en: "Quality Certified", hi: "गुणवत्ता प्रमाणित" },
  qualityCertifiedDesc: {
    en: "ISO 9001:2015 certified organization with government recognition",
    hi: "ISO 9001:2015 प्रमाणित संगठन जिसे सरकारी मान्यता प्राप्त",
  },
  yearsOfServiceLabel: { en: "Years of service", hi: "सेवा के वर्ष" },
  servicesTitle: {
    en: "Comprehensive Social Services",
    hi: "समग्र सामाजिक सेवाएँ",
  },
  servicesDescription: {
    en: "From emergency crisis support to long-term empowerment programs, we provide integrated services that address the full spectrum of community needs.",
    hi: "आपातकालीन समर्थन से लेकर दीर्घकालिक सशक्तिकरण कार्यक्रमों तक, हम समेकित सेवाएँ प्रदान करते हैं जो समुदाय की सभी आवश्यकताओं को पूरा करती हैं।",
  },
  viewAllPrograms: { en: "View All Programs", hi: "सभी कार्यक्रम देखें" },
  beneficiaries: { en: "Beneficiaries", hi: "लाभार्थी" },
  locations: { en: "Locations", hi: "स्थान" },
  moreServices: { en: "+{count} more services", hi: "+{count} और सेवाएँ" },
  learnMore: { en: "Learn More", hi: "और पढ़ें" },
  statisticsTitle: {
    en: "Our Impact in Numbers",
    hi: "हमारा प्रभाव संख्याओं में",
  },
  statisticsDescription: {
    en: "Measurable outcomes that reflect our commitment to community transformation and sustainable social development across Rajasthan.",
    hi: "नापने योग्य परिणाम जो राजस्थान भर में समुदाय परिवर्तन और सतत विकास के प्रति हमारी प्रतिबद्धता को दर्शाते हैं।",
  },
  villageCoverage: { en: "Village Coverage", hi: "गाँव कवरेज" },
    // Additional Statistics description variants
    "Individuals directly impacted across all programs": {
      en: "Individuals directly impacted across all programs",
      hi: "सभी कार्यक्रमों में सीधे प्रभावित व्यक्ति",
    },
    "Successful training and empowerment initiatives": {
      en: "Successful training and empowerment initiatives",
      hi: "सफल प्रशिक्षण और सशक्तिकरण पहल",
    },
    "Continuous community transformation since 2009": {
      en: "Continuous community transformation since 2009",
      hi: "2009 से निरंतर सामुदायिक परिवर्तन",
    },
  timelineTitle: { en: "Our Journey of Impact", hi: "हमारी प्रभाव यात्रा" },
  timelineDescription: {
    en: "From a local initiative to a multi-district social service organization with government partnerships and specialized programs.",
    hi: "स्थानीय पहल से लेकर बहु-जिला सामाजिक सेवा संगठन तक, सरकारी साझेदारियों और विशेष कार्यक्रमों के साथ।",
  },
    villageCoverageDesc: {
      en: "Financial literacy and banking services across village cooperative societies",
      hi: "ग्राम सहकारी समितियों में वित्तीय साक्षरता और बैंकिंग सेवाएँ",
    },
    villageCoverageStat: {
      en: "126+ cooperatives engaged",
      hi: "126+ सहकारी समितियाँ जुड़ी",
    },
    villageCoverageExtra: {
      en: "Driving financial inclusion and savings awareness",
      hi: "वित्तीय समावेशन और बचत जागरूकता को बढ़ावा",
    },
  contactTitle: { en: "Get in Touch", hi: "संपर्क करें" },
  contactDescription: {
    en: "Reach out for emergency support, program information, or to learn how you can contribute to community transformation across Rajasthan.",
    hi: "आपातकालीन सहायता, कार्यक्रम जानकारी के लिए या राजस्थान भर में समुदाय परिवर्तन में योगदान कैसे कर सकते हैं यह जानने के लिए संपर्क करें।",
  },
  emergencyContactsTitle: { en: "Emergency Contacts", hi: "आपातकालीन संपर्क" },
  headOffice: { en: "Head Office", hi: "मुख्यालय" },
  sendMessage: { en: "Send Message", hi: "संदेश भेजें" },
  sendingMessage: { en: "Sending Message...", hi: "संदेश भेजा जा रहा है..." },
  fullName: { en: "Full Name", hi: "पूरा नाम" },
  emailAddress: { en: "Email Address", hi: "ईमेल पता" },
  phoneNumber: { en: "Phone Number", hi: "फ़ोन नंबर" },
  serviceNeeded: { en: "Service Needed", hi: "आवश्यक सेवा" },
  messageLabel: { en: "Message", hi: "संदेश" },
  selectService: { en: "Select a service", hi: "एक सेवा चुनें" },
  optionEmergency: { en: "Emergency Support", hi: "आपातकालीन सहायता" },
  optionWomensSafety: { en: "Women's Safety", hi: "महिला सुरक्षा" },
  optionRehabilitation: { en: "Rehabilitation", hi: "पुनर्वास" },
  optionSkillDev: { en: "Skill Development", hi: "कौशल विकास" },
  optionInformation: { en: "General Information", hi: "सामान्य जानकारी" },
  optionPartnership: { en: "Partnership Inquiry", hi: "साझेदारी पूछताछ" },
  programHighlightsTitle: {
    en: "Program Highlights",
    hi: "कार्यक्रम मुख्य बिंदु",
  },
  programHighlightsIntro: {
    en: "Discover the diverse range of programs that have been transforming lives and building stronger communities since 2009.",
    hi: "2009 से जीवन बदलने और मजबूत समुदाय बनाने वाले हमारे विविध कार्यक्रमों को जानें।",
  },
  phSkillTitle: {
    en: "Skill Development Programs",
    hi: "कौशल विकास कार्यक्रम",
  },
  phSkillDesc: {
    en: "Comprehensive training in sewing, beauty services, computer skills, and traditional crafts",
    hi: "सिलाई, ब्यूटी सर्विस, कंप्यूटर कौशल और पारंपरिक शिल्प में व्यापक प्रशिक्षण",
  },
  phSkillImpact: {
    en: "500+ women trained across multiple skills",
    hi: "500+ महिलाओं को विभिन्न कौशलों में प्रशिक्षण",
  },
  phAwarenessTitle: {
    en: "Social Awareness Campaigns",
    hi: "सामाजिक जागरूकता अभियान",
  },
  phAwarenessDesc: {
    en: "Legal literacy, drug awareness, and women's rights education programs",
    hi: "कानूनी साक्षरता, नशा जागरूकता और महिला अधिकार शिक्षा कार्यक्रम",
  },
  phAwarenessImpact: {
    en: "Community-wide impact across multiple districts",
    hi: "कई जिलों में सामुदायिक प्रभाव",
  },
  phHandicraftsTitle: {
    en: "Traditional Handicrafts",
    hi: "पारंपरिक हस्तशिल्प",
  },
  phHandicraftsDesc: {
    en: "Preserving traditional arts while creating modern market opportunities",
    hi: "पारंपरिक कला का संरक्षण और आधुनिक बाजार के अवसर",
  },
  phHandicraftsImpact: {
    en: "Market access for 100+ artisans",
    hi: "100+ कारीगरों को बाजार तक पहुँच",
  },
  phEmpowermentTitle: { en: "Women's Empowerment", hi: "महिला सशक्तिकरण" },
  phEmpowermentDesc: {
    en: "Economic independence through entrepreneurship and skill building",
    hi: "उद्यमिता और कौशल विकास के माध्यम से आर्थिक स्वतंत्रता",
  },
  phEmpowermentImpact: {
    en: "200+ women entrepreneurs created",
    hi: "200+ महिला उद्यमी तैयार",
  },
  phEnvironmentTitle: { en: "Environmental Initiatives", hi: "पर्यावरण पहल" },
  phEnvironmentDesc: {
    en: "Water conservation, sanitation, and clean city campaigns",
    hi: "जल संरक्षण, स्वच्छता और स्वच्छ शहर अभियान",
  },
  phEnvironmentImpact: {
    en: "Improved sanitation for thousands",
    hi: "हजारों के लिए स्वच्छता में सुधार",
  },
  phRecognitionTitle: {
    en: "ISO Certified Organization",
    hi: "ISO प्रमाणित संगठन",
  },
  phRecognitionDesc: {
    en: "ISO 9001:2015 certified for quality management systems",
    hi: "गुणवत्ता प्रबंधन प्रणालियों के लिए ISO 9001:2015 प्रमाणित",
  },
  phRecognitionImpact: {
    en: "Recognized for excellence in service delivery",
    hi: "सेवा में उत्कृष्टता के लिए मान्यता प्राप्त",
  },
  phCardPrograms: { en: "Total Programs", hi: "कुल कार्यक्रम" },
  phCardBeneficiaries: { en: "Direct Beneficiaries", hi: "प्रत्यक्ष लाभार्थी" },
  phCardYears: { en: "Years Documented", hi: "दस्तावेजीकृत वर्ष" },
  phCardDistricts: { en: "Districts Served", hi: "सेवा किए गए जिले" },
  phCtaTitle: {
    en: "Interested in Our Detailed Progress Reports?",
    hi: "क्या आप हमारे विस्तृत प्रगति रिपोर्ट में रुचि रखते हैं?",
  },
  phCtaDesc: {
    en: "Explore our comprehensive annual reports that showcase the detailed impact, beneficiaries, and outcomes of each program from 2014-2018.",
    hi: "2014-2018 से प्रत्येक कार्यक्रम के विस्तृत प्रभाव, लाभार्थियों और परिणामों को प्रदर्शित करने वाली हमारी वार्षिक रिपोर्ट देखें।",
  },
  phCtaButton: { en: "View Annual Reports →", hi: "वार्षिक रिपोर्ट देखें →" },
  // Enhanced Statistics additional keys
  programsPerYearLabel: { en: "Programs per Year", hi: "प्रति वर्ष कार्यक्रम" },
  programsPerYearDesc: {
    en: "Mean programs executed annually",
    hi: "प्रतिवर्ष संचालित औसत कार्यक्रम",
  },
  avgBeneficiariesLabel: { en: "Avg Beneficiaries", hi: "औसत लाभार्थी" },
  avgBeneficiariesDesc: {
    en: "Average numeric beneficiaries per program",
    hi: "प्रति कार्यक्रम औसत लाभार्थी संख्या",
  },
  coreCategoriesLabel: { en: "Core Categories", hi: "मुख्य श्रेणियाँ" },
  coreCategoriesDesc: {
    en: "Program thematic clusters detected",
    hi: "कार्यक्रम विषयगत समूह",
  },
  categorySkillDevelopment: { en: "Skill Development", hi: "कौशल विकास" },
  categorySocialAwareness: { en: "Social Awareness", hi: "सामाजिक जागरूकता" },
  categoryEconomicEmpowerment: {
    en: "Economic Empowerment",
    hi: "आर्थिक सशक्तिकरण",
  },
  programCategoriesOverviewTitle: {
    en: "Program Categories Overview",
    hi: "कार्यक्रम श्रेणी सारांश",
  },
  programCategoriesOverviewDesc: {
    en: "Programs classified via keyword scan",
    hi: "कीवर्ड स्कैन द्वारा वर्गीकृत कार्यक्रम",
  },
  growthOverTimeTitle: { en: "Growth Over Time", hi: "समय के साथ वृद्धि" },
  programsLabel: { en: "Programs", hi: "कार्यक्रम" },
  activeYearsLabel: { en: "active years", hi: "सक्रिय वर्ष" },
  isoCertifiedOrgHeading: {
    en: "ISO 9001:2015 Certified Organization",
    hi: "ISO 9001:2015 प्रमाणित संगठन",
  },
  isoCertifiedOrgDesc: {
    en: "Our commitment to quality and systematic approach to community development has been recognized with ISO certification, ensuring the highest standards in all our programs and services.",
    hi: "गुणवत्ता और सामुदायिक विकास हेतु हमारे व्यवस्थित दृष्टिकोण को ISO प्रमाणन से मान्यता मिली है, जो हमारे सभी कार्यक्रमों में उच्चतम मानकों को सुनिश्चित करता है।",
  },
  // Timeline item translations
  tl2009Title: { en: "Foundation & Vision", hi: "स्थापना और दृष्टि" },
  tl2009Desc: {
    en: "Established in Nagaur with the mission to empower women and children through local outreach programs and community engagement.",
    hi: "नागौर में महिलाओं और बच्चों को सशक्त करने के मिशन के साथ स्थानीय पहुँच कार्यक्रमों और सामुदायिक सहभागिता द्वारा स्थापना।",
  },
  tl2009Milestone: { en: "Organization Founded", hi: "संगठन की स्थापना" },
  tl2014Title: { en: "Growth & Recognition", hi: "विकास और मान्यता" },
  tl2014Desc: {
    en: "Scaled training programs, gained formal government registration, and launched the first multi-district initiatives focused on skills and livelihoods.",
    hi: "प्रशिक्षण कार्यक्रमों का विस्तार, औपचारिक सरकारी पंजीकरण प्राप्त और कौशल व आजीविका केंद्रित बहु-जिला पहल की शुरुआत।",
  },
  tl2014Milestone: { en: "Programs Launched", hi: "कार्यक्रम शुरू" },
  tl2022Title: { en: "Craft Innovation", hi: "शिल्प नवाचार" },
  tl2022Desc: {
    en: "Launched craft innovation and handicraft modernization programs in partnership with KVIC and the Ministry of Textiles, enabling artisan incomes and market access.",
    hi: "KVIC और वस्त्र मंत्रालय के साथ साझेदारी में शिल्प नवाचार और हस्तशिल्प आधुनिकीकरण कार्यक्रम शुरू, जिससे कारीगरों की आय और बाजार पहुँच बढ़ी।",
  },
  tl2022Milestone: { en: "Craft Programs", hi: "शिल्प कार्यक्रम" },
  tl2024Title: {
    en: "Integrated Social Services",
    hi: "एकीकृत सामाजिक सेवाएँ",
  },
  tl2024Desc: {
    en: "Rolled out integrated women's safety centers, rehabilitation facilities, and emergency response systems across multiple districts.",
    hi: "कई जिलों में एकीकृत महिला सुरक्षा केंद्र, पुनर्वास सुविधाएँ और आपातकालीन प्रतिक्रिया प्रणाली लागू।",
  },
  tl2024Milestone: { en: "Specialized Centers", hi: "विशेषीकृत केंद्र" },
  // Hero Stat Cards (using original English phrases as keys for minimal change)
  "Lives Transformed": { en: "Lives Transformed", hi: "जीवन परिवर्तित" },
  "Individuals directly impacted across 5+ districts": {
    en: "Individuals directly impacted across 5+ districts",
    hi: "5+ जिलों में सीधे प्रभावित व्यक्ति",
  },
  "Years of Service": { en: "Years of Service", hi: "सेवा के वर्ष" },
  "Continuous community transformation": {
    en: "Continuous community transformation",
    hi: "निरंतर सामुदायिक परिवर्तन",
  },
  "Programs Completed": { en: "Programs Completed", hi: "पूर्ण किए गए कार्यक्रम" },
  "Successful training and empowerment courses": {
    en: "Successful training and empowerment courses",
    hi: "सफल प्रशिक्षण और सशक्तिकरण पाठ्यक्रम",
  },
  "Districts Served": { en: "Districts Served", hi: "सेवा किए गए जिले" },
  "Multi-district operations across Rajasthan": {
    en: "Multi-district operations across Rajasthan",
    hi: "राजस्थान भर में बहु-जिला संचालन",
  },
  // Services Section
  "Women's Safety & Counseling": { en: "Women's Safety & Counseling", hi: "महिला सुरक्षा और परामर्श" },
  "Comprehensive safety network with professional counseling centers": { en: "Comprehensive safety network with professional counseling centers", hi: "व्यावसायिक परामर्श केंद्रों के साथ समग्र सुरक्षा नेटवर्क" },
  "Drug Rehabilitation & Mental Health": { en: "Drug Rehabilitation & Mental Health", hi: "नशा पुनर्वास और मानसिक स्वास्थ्य" },
  "Residential treatment centers with integrated therapy approaches": { en: "Residential treatment centers with integrated therapy approaches", hi: "एकीकृत चिकित्सा दृष्टिकोण वाले आवासीय उपचार केंद्र" },
  "Government Partnership Programs": { en: "Government Partnership Programs", hi: "सरकारी साझेदारी कार्यक्रम" },
  "Ministry-level collaborations for comprehensive development": { en: "Ministry-level collaborations for comprehensive development", hi: "समग्र विकास के लिए मंत्रालय स्तर की साझेदारियाँ" },
  "Multi-District Skill Development": { en: "Multi-District Skill Development", hi: "बहु-जिला कौशल विकास" },
  "Comprehensive training across 5+ districts with job placement": { en: "Comprehensive training across 5+ districts with job placement", hi: "5+ जिलों में नौकरी प्लेसमेंट सहित व्यापक प्रशिक्षण" },
  "24/7 Crisis Counseling": { en: "24/7 Crisis Counseling", hi: "24/7 संकट परामर्श" },
  "Legal Aid & Court Support": { en: "Legal Aid & Court Support", hi: "कानूनी सहायता और न्यायालय सहयोग" },
  "Police Station Integration": { en: "Police Station Integration", hi: "पुलिस स्टेशन समन्वय" },
  "Emergency Shelter": { en: "Emergency Shelter", hi: "आपातकालीन आश्रय" },
  "Residential Treatment": { en: "Residential Treatment", hi: "आवासीय उपचार" },
  "CBT Therapy": { en: "CBT Therapy", hi: "CBT थेरेपी" },
  "Yoga & Meditation": { en: "Yoga & Meditation", hi: "योग और ध्यान" },
  "24/7 Medical Care": { en: "24/7 Medical Care", hi: "24/7 चिकित्सा देखभाल" },
  "ITDP Furniture Craft": { en: "ITDP Furniture Craft", hi: "ITDP फर्नीचर शिल्प" },
  "NABARD Financial Literacy": { en: "NABARD Financial Literacy", hi: "नाबार्ड वित्तीय साक्षरता" },
  "Cultural Heritage": { en: "Cultural Heritage", hi: "सांस्कृतिक विरासत" },
  "KVIC Training": { en: "KVIC Training", hi: "KVIC प्रशिक्षण" },
  "92-day Programs": { en: "92-day Programs", hi: "92-दिवसीय कार्यक्रम" },
  "Job Placement": { en: "Job Placement", hi: "नौकरी प्लेसमेंट" },
  "Entrepreneurship Support": { en: "Entrepreneurship Support", hi: "उद्यमिता समर्थन" },
  "Multi-trade Training": { en: "Multi-trade Training", hi: "मल्टी-ट्रेड प्रशिक्षण" },
  // Gallery Section
  galleryTitle: { en: "Media Gallery", hi: "मीडिया गैलरी" },
  galleryDescription: {
    en: "Browse uploaded images and videos from MNSS initiatives. Use filters to refine your view.",
    hi: "MNSS पहलों से अपलोड की गई छवियाँ और वीडियो ब्राउज़ करें। फ़िल्टर का उपयोग करके दृश्य को परिष्कृत करें।",
  },
  galleryFilterAll: { en: "All", hi: "सभी" },
  galleryFilterImages: { en: "Images", hi: "छवियाँ" },
  galleryFilterVideos: { en: "Videos", hi: "वीडियो" },
  galleryGrid: { en: "Grid", hi: "ग्रिड" },
  galleryList: { en: "List", hi: "सूची" },
  galleryRefresh: { en: "Refresh", hi: "रिफ्रेश" },
  loading: { en: "Loading...", hi: "लोड हो रहा है..." },
  galleryEmpty: {
    en: "No media found. Upload via the dashboard or upload form.",
    hi: "कोई मीडिया नहीं मिला। डैशबोर्ड या अपलोड फ़ॉर्म से अपलोड करें।",
  },
  galleryPreview: { en: "Preview", hi: "पूर्वावलोकन" },
  galleryName: { en: "Name", hi: "नाम" },
  galleryType: { en: "Type", hi: "प्रकार" },
  gallerySize: { en: "Size", hi: "आकार" },
  galleryCreated: { en: "Created", hi: "निर्मित" },
  galleryAction: { en: "Action", hi: "क्रिया" },
  galleryOpen: { en: "Open", hi: "खोलें" },
  galleryImage: { en: "Image", hi: "छवि" },
  galleryVideo: { en: "Video", hi: "वीडियो" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // state for language
  const [lang, setLangState] = useState<Lang>("en");
  // state for theme
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // initialize language from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mnss_lang") as Lang | null;
      if (stored === "en" || stored === "hi") setLangState(stored);
    } catch {
      // ignore
    }
  }, []);

  // initialize theme from localStorage and apply class
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("mnss_theme") as
        | "light"
        | "dark"
        | null;
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
        if (typeof document !== "undefined") {
          if (storedTheme === "dark")
            document.documentElement.classList.add("dark");
          else document.documentElement.classList.remove("dark");
        }
      }
    } catch {}
  }, []);

  // persist language
  useEffect(() => {
    try {
      localStorage.setItem("mnss_lang", lang);
    } catch {}
  }, [lang]);

  // persist theme and toggle root class
  useEffect(() => {
    try {
      localStorage.setItem("mnss_theme", theme);
      if (typeof document !== "undefined") {
        if (theme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      }
    } catch {}
  }, [theme]);

  function toggle() {
    setLangState((s) => (s === "en" ? "hi" : "en"));
  }

  function setLang(l: Lang) {
    setLangState(l);
  }

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  function t(key: string) {
    const entry = translations[key];
    if (!entry) return key;
    return lang === "hi" ? entry.hi : entry.en;
  }

  return (
    <LanguageContext.Provider
      value={{ lang, toggle, setLang, theme, toggleTheme, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export default LanguageProvider;
