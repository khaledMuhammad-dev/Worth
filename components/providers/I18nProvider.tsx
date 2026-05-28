'use client';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply direction/lang attribute for the current language (already initialized
    // from localStorage in lib/i18n.ts — no changeLanguage call needed here).
    const applyLang = (lng: string) => {
      const tag = lng?.slice(0, 2) || 'en';
      document.documentElement.lang = tag;
      document.documentElement.dir = tag === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('i18nextLng', tag);
    };

    applyLang(i18n.language);
    i18n.on('languageChanged', applyLang);
    return () => i18n.off('languageChanged', applyLang);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
