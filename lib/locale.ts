export function pick(lang: string, en: string, ar: string): string {
  return lang === 'ar' ? ar : en
}
