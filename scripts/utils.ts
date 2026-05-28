export function normalizeString(text: string): string {
  return text
    .replace(/\u00A0/g, ' ')  // non-breaking spaces
    .replace(/\u200B/g, '')   // zero-width spaces
    .replace(/\u200F/g, '')   // RTL marks
    .replace(/\u200E/g, '')   // LTR marks
    .replace(/\s+/g, ' ')     // collapse whitespace
    .trim()
}

export function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text)
}

export function isEnglish(text: string): boolean {
  return /[a-zA-Z]/.test(text)
}

export function isNumeric(text: string): boolean {
  return /^[\d\s\+\-\.\,\%\$\€\£\¥\،]+$/.test(text)
}

export function isSymbol(text: string): boolean {
  return /^[^\w\u0600-\u06FF]+$/.test(text)
}

export function isMixedContent(text: string): boolean {
  return isArabic(text) && isEnglish(text)
}

// Strings to always ignore (not real translatable content)
export const IGNORED_STRINGS = new Set([
  'Worth',
  'MENA',
  'CEO',
  'UI',
  'UX',
  'RTL',
  'LTR',
  'EN',
  'AR',
  '→',
  '←',
  '©',
  '|',
  '...',
  'www',
  'http',
  'https',
  '.com',
  '.agency',
  '@',
])

export function shouldIgnoreString(text: string): boolean {
  if (IGNORED_STRINGS.has(text)) return true
  if (/^https?:\/\//.test(text)) return true
  if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(text)) return true
  if (/^\+[\d\s\-()]+$/.test(text)) return true
  return false
}
