'use client';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply stored language after hydration to avoid server/client mismatch.
    // i18n is initialized with 'en' on both server and client; we switch here.
    const applyLang = (lng: string) => {
      const tag = lng?.slice(0, 2) || 'en';
      document.documentElement.lang = tag;
      document.documentElement.dir = tag === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('i18nextLng', tag);
    };

    try {
      const stored = localStorage.getItem('i18nextLng') || 'en';
      if (stored !== i18n.language) {
        i18n.changeLanguage(stored);
      } else {
        applyLang(stored);
      }
    } catch {
      applyLang('en');
    }

    i18n.on('languageChanged', applyLang);
    return () => i18n.off('languageChanged', applyLang);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
