import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

// Read language synchronously so the first client render matches the user's
// saved preference. On the server `window` is undefined, so we fall back to
// 'en'; the hydration mismatch is handled by suppressHydrationWarning on
// language-dependent elements.
const getInitialLng = (): string => {
  if (typeof window === 'undefined') return 'en';
  try {
    return localStorage.getItem('i18nextLng') || 'en';
  } catch {
    return 'en';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: getInitialLng(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
