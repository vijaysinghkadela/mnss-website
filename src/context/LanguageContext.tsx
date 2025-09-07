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
  explore: { en: 'Explore Services', hi: 'सेवाएँ देखें' }
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
