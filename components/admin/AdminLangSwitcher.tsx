'use client'

import { useTranslation } from 'react-i18next'

export default function AdminLangSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('ar') ? 'ar' : 'en'

  const toggle = (lang: 'en' | 'ar') => {
    void i18n.changeLanguage(lang)
    localStorage.setItem('i18nextLng', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 p-1">
      {(['en', 'ar'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => toggle(lang)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
            current === lang
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {lang === 'en' ? 'EN' : 'عربي'}
        </button>
      ))}
    </div>
  )
}
