'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const LangReadyContext = createContext(false);
/** True after the stored language has been applied on the client. */
export const useLangReady = () => useContext(LangReadyContext);

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const applyLang = (lng: string) => {
      const tag = lng?.slice(0, 2) || 'en';
      document.documentElement.lang = tag;
      document.documentElement.dir = tag === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('i18nextLng', tag);
      setReady(true);
    };

    // Register the listener BEFORE calling changeLanguage —
    // i18next fires 'languageChanged' synchronously when resources are
    // already loaded, so registering after would miss the event.
    i18n.on('languageChanged', applyLang);

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

    return () => i18n.off('languageChanged', applyLang);
  }, []);

  return (
    <LangReadyContext.Provider value={ready}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LangReadyContext.Provider>
  );
}
