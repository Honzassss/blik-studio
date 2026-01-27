'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '@/messages/en.json'
import cs from '@/messages/cs.json'

type Locale = 'en' | 'cs'
type Messages = typeof en

const messages: Record<Locale, Messages> = { en, cs }

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('cs')

  useEffect(() => {
    // Load locale from localStorage
    const stored = localStorage.getItem('locale') as Locale
    if (stored && (stored === 'en' || stored === 'cs')) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
