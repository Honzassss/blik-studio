'use client'

import { useI18n } from '@/lib/i18n'
import { Languages } from 'lucide-react'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'cs' : 'en')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-[#27221d] transition-colors"
      aria-label="Switch language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{locale === 'en' ? 'CS' : 'EN'}</span>
    </button>
  )
}
