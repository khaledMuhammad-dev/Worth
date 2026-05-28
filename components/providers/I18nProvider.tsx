'use client';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng') || 'en';
    void i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
