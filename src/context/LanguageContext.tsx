"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'en' | 'hi'

type LanguageContextType = {
  lang: Lang
  toggle: () => void
  setLang: (l: Lang) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  t: (key: string) => string
}

const translations: Record<string, { en: string; hi: string }> = {
  home: { en: 'Home', hi: 'होम' },
  about: { en: 'About', hi: 'हमारे बारे में' },
  services: { en: 'Services', hi: 'सेवाएँ' },
  impact: { en: 'Impact', hi: 'प्रभाव' },
  contact: { en: 'Contact', hi: 'संपर्क' },
  emergency: { en: 'Emergency', hi: 'आपातकाल' },
  getHelp: { en: 'Get Help', hi: 'मदद लें' },
  explore: { en: 'Explore Services', hi: 'सेवाएँ देखें' },
  aboutTitle: { en: 'About Us', hi: 'हमारे बारे में' },
  mission: { en: 'Our Mission', hi: 'हमारा लक्ष्य' },
  vision: { en: 'Our Vision', hi: 'हमारी दृष्टि' },
  exploreServices: { en: 'Explore Services', hi: 'सेवाएँ देखें' },
  getHelpShort: { en: 'Get Help', hi: 'मदद लें' },
  exploreHero: { en: 'Explore Our Services', hi: 'हमारी सेवाएँ देखें' },
  emergencyHelp: { en: 'Get Emergency Help', hi: 'आपातकालीन सहायता प्राप्त करें' },
  serving: { en: 'Serving Nagaur, Churu, Pratapgarh, Bikaner, Ganganagar', hi: 'नागौर, चूरू, प्रतापगढ़, बीकानेर, गंगानगर में सेवा' }
  ,
  // Additional UI translations
  aboutParagraph: {
    en: "Marut Narayan Sewa Sansthan (MNSS) is a Rajasthan-based NGO established in 2009. We focus on women's safety, rehabilitation, skill development, and sustainable community programs spanning multiple districts. Our work combines grassroots outreach with government partnerships to create lasting impact.",
    hi: "मरुत नारायण सेवा संस्थान (MNSS) राजस्थान आधारित एक गैर-लाभकारी संगठन है, जिसकी स्थापना 2009 में हुई। हम महिलाओं की सुरक्षा, पुनर्वास, कौशल विकास और सतत सामुदायिक कार्यक्रमों पर काम करते हैं। हमारा कार्य स्थानीय स्तर पर सरकारी साझेदारियों के साथ मिलकर स्थायी प्रभाव बनाता है।"
  },
  missionText: {
    en: "To create a comprehensive social safety net for vulnerable populations through empowerment, rehabilitation, and livelihood programs that restore dignity and create economic opportunity.",
    hi: "सशक्तिकरण, पुनर्वास और आजीविका कार्यक्रमों के माध्यम से कमजोर समूहों के लिए एक समग्र सामाजिक सुरक्षा जाल बनाना, जो गरिमा बहाल करे और आर्थिक अवसर पैदा करे।"
  },
  visionText: {
    en: "A Rajasthan where every woman and family has access to safety, skills, and sustainable livelihoods.",
    hi: "एक राजस्थान जहां हर महिला और परिवार को सुरक्षा, कौशल और सतत आजीविका तक पहुंच हो।"
  },
  corePrograms: { en: 'Core Programs', hi: 'मुख्य कार्यक्रम' },
  coreProgram1: { en: "Women's Safety & Crisis Counseling (24/7)", hi: 'महिला सुरक्षा और संकट परामर्श (24/7)' },
  coreProgram2: { en: 'Residential Drug Rehabilitation & Mental Health', hi: 'रेसिडेंशियल नशा पुनर्वास और मानसिक स्वास्थ्य' },
  coreProgram3: { en: 'Multi-district Skill Development & Job Placement', hi: 'बहु-जिला कौशल विकास और नौकरी प्लेसमेंट' },
  coreProgram4: { en: 'Government Partnership Programs (KVIC, NABARD, Ministry of Textiles)', hi: 'सरकारी साझेदारी कार्यक्रम (KVIC, NABARD, वस्त्र मंत्रालय)' },
  impactHighlights: { en: 'Impact Highlights', hi: 'प्रभाव हाइलाइट्स' },
  livesPositivelyImpacted: { en: 'Lives positively impacted', hi: 'लोगों पर सकारात्मक प्रभाव' },
  districtsServed: { en: 'Districts served', hi: 'सेवा वाले जिले' },
  programsTrainings: { en: 'Programs & trainings', hi: 'कार्यक्रम और प्रशिक्षण' },
  yearsOfServiceLabel: { en: 'Years of service', hi: 'सेवा के वर्ष' },
  servicesTitle: { en: 'Comprehensive Social Services', hi: 'समग्र सामाजिक सेवाएँ' },
  servicesDescription: { en: 'From emergency crisis support to long-term empowerment programs, we provide integrated services that address the full spectrum of community needs.', hi: 'आपातकालीन समर्थन से लेकर दीर्घकालिक सशक्तिकरण कार्यक्रमों तक, हम समेकित सेवाएँ प्रदान करते हैं जो समुदाय की सभी आवश्यकताओं को पूरा करती हैं।' },
  viewAllPrograms: { en: 'View All Programs', hi: 'सभी कार्यक्रम देखें' },
  beneficiaries: { en: 'Beneficiaries', hi: 'लाभार्थी' },
  locations: { en: 'Locations', hi: 'स्थान' },
  moreServices: { en: '+{count} more services', hi: '+{count} और सेवाएँ' },
  learnMore: { en: 'Learn More', hi: 'और पढ़ें' },
  statisticsTitle: { en: 'Our Impact in Numbers', hi: 'हमारा प्रभाव संख्याओं में' },
  statisticsDescription: { en: 'Measurable outcomes that reflect our commitment to community transformation and sustainable social development across Rajasthan.', hi: 'नापने योग्य परिणाम जो राजस्थान भर में समुदाय परिवर्तन और सतत विकास के प्रति हमारी प्रतिबद्धता को दर्शाते हैं।' },
  // Statistics cards
  statLivesDesc: { en: 'Individuals directly impacted across all programs', hi: 'सभी कार्यक्रमों से सीधे प्रभावित व्यक्ति' },
  programsCompleted: { en: 'Programs Completed', hi: 'पूर्ण किए गए कार्यक्रम' },
  programsCompletedDesc: { en: 'Successful training and empowerment initiatives', hi: 'सफल प्रशिक्षण और सशक्तिकरण पहल' },
  statDistrictsDesc: { en: 'Multi-district operations across Rajasthan', hi: 'राजस्थान भर में बहु-जिला संचालन' },
  yearsOfServiceDesc: { en: 'Continuous community transformation since 2009', hi: '2009 से निरंतर सामुदायिक परिवर्तन' },
  timelineTitle: { en: 'Our Journey of Impact', hi: 'हमारी प्रभाव यात्रा' },
  timelineDescription: { en: 'From a local initiative to a multi-district social service organization with government partnerships and specialized programs.', hi: 'स्थानीय पहल से लेकर बहु-जिला सामाजिक सेवा संगठन तक, सरकारी साझेदारियों और विशेष कार्यक्रमों के साथ।' },
  contactTitle: { en: 'Get in Touch', hi: 'संपर्क करें' },
  contactDescription: { en: 'Reach out for emergency support, program information, or to learn how you can contribute to community transformation across Rajasthan.', hi: 'आपातकालीन सहायता, कार्यक्रम जानकारी के लिए या राजस्थान भर में समुदाय परिवर्तन में योगदान कैसे कर सकते हैं यह जानने के लिए संपर्क करें।' },
  emergencyContactsTitle: { en: 'Emergency Contacts', hi: 'आपातकालीन संपर्क' },
  headOffice: { en: 'Head Office', hi: 'मुख्यालय' },
  sendMessage: { en: 'Send Message', hi: 'संदेश भेजें' },
  sendingMessage: { en: 'Sending Message...', hi: 'संदेश भेजा जा रहा है...' },
  fullName: { en: 'Full Name', hi: 'पूरा नाम' },
  emailAddress: { en: 'Email Address', hi: 'ईमेल पता' },
  phoneNumber: { en: 'Phone Number', hi: 'फ़ोन नंबर' },
  serviceNeeded: { en: 'Service Needed', hi: 'आवश्यक सेवा' },
  messageLabel: { en: 'Message', hi: 'संदेश' },
  selectService: { en: 'Select a service', hi: 'एक सेवा चुनें' },
  optionEmergency: { en: 'Emergency Support', hi: 'आपातकालीन सहायता' },
  optionWomensSafety: { en: "Women's Safety", hi: 'महिला सुरक्षा' },
  optionRehabilitation: { en: 'Rehabilitation', hi: 'पुनर्वास' },
  optionSkillDev: { en: 'Skill Development', hi: 'कौशल विकास' },
  optionInformation: { en: 'General Information', hi: 'सामान्य जानकारी' },
  optionPartnership: { en: 'Partnership Inquiry', hi: 'साझेदारी पूछताछ' }
  ,
  donateNow: { en: 'Donate Now', hi: 'अभी दान करें' },
  // Statistics section (Impact Highlights)
  emergencySupportTitle: { en: 'Emergency Support', hi: 'आपातकालीन सहायता' },
  emergencySupportDesc: {
    en: 'Round-the-clock crisis intervention and emergency services across all centers',
    hi: 'सभी केंद्रों पर चौबीसों घंटे संकट हस्तक्षेप और आपातकालीन सेवाएँ'
  },
  qualityCertifiedTitle: { en: 'Quality Certified', hi: 'गुणवत्ता प्रमाणित' },
  qualityCertifiedDesc: {
    en: 'ISO 9001:2015 certified organization with government recognition',
    hi: 'ISO 9001:2015 प्रमाणित संगठन, सरकारी मान्यता के साथ'
  },
  villageCoverageTitle: { en: 'Village Coverage', hi: 'ग्राम कवरेज' },
  villageCoverageDesc: {
    en: 'Financial literacy and banking services across village cooperative societies',
    hi: 'ग्राम सहकारी समितियों में वित्तीय साक्षरता और बैंकिंग सेवाएँ'
  },
  // Program Breakdown
  programBreakdownTitle: { en: 'Program Breakdown', hi: 'कार्यक्रम विवरण' },
  programBreakdownDesc: { en: 'Key areas of impact across initiatives', hi: 'पहल के प्रमुख प्रभाव क्षेत्र' },
  pbEducation: { en: 'Education & Digital Literacy', hi: 'शिक्षा और डिजिटल साक्षरता' },
  pbLivelihood: { en: 'Livelihood & Skill Training', hi: 'आजिविका और कौशल प्रशिक्षण' },
  pbHealth: { en: 'Health & Nutrition', hi: 'स्वास्थ्य और पोषण' },
  pbFinance: { en: 'Financial Inclusion', hi: 'वित्तीय समावेशन' }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // state for language
  const [lang, setLangState] = useState<Lang>('en')
  // state for theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // initialize language from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mnss_lang') as Lang | null
      if (stored === 'en' || stored === 'hi') setLangState(stored)
    } catch {
      // ignore
    }
  }, [])

  // initialize theme from localStorage and apply class
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('mnss_theme') as 'light' | 'dark' | null
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme)
        if (typeof document !== 'undefined') {
          if (storedTheme === 'dark') document.documentElement.classList.add('dark')
          else document.documentElement.classList.remove('dark')
        }
      }
    } catch {}
  }, [])

  // persist language
  useEffect(() => {
    try {
      localStorage.setItem('mnss_lang', lang)
    } catch {}
  }, [lang])

  // persist theme and toggle root class
  useEffect(() => {
    try {
      localStorage.setItem('mnss_theme', theme)
      if (typeof document !== 'undefined') {
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
      }
    } catch {}
  }, [theme])

  function toggle() {
    setLangState((s) => (s === 'en' ? 'hi' : 'en'))
  }

  function setLang(l: Lang) {
    setLangState(l)
  }

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  function t(key: string) {
    const entry = translations[key]
    if (!entry) return key
    return lang === 'hi' ? entry.hi : entry.en
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang, theme, toggleTheme, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export default LanguageProvider
