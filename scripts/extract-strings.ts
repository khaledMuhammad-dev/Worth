import { PageData } from './crawl-pages'
import { normalizeString, isNumeric, isSymbol, shouldIgnoreString } from './utils'

export interface ExtractedString {
  text: string
  normalizedText: string
  detectedLanguage: 'ar' | 'en' | 'mixed' | 'neutral'
  foundOnPages: string[]
  foundInLocales: string[]
  isLikelyUI: boolean
}

export interface ExtractionResult {
  total: number
  byLocale: {
    en: ExtractedString[]
    ar: ExtractedString[]
  }
  all: ExtractedString[]
  enOnArPages: ExtractedString[]
  arOnEnPages: ExtractedString[]
}

export async function extractStrings(
  pages: PageData[]
): Promise<ExtractionResult> {
  const stringMap = new Map<string, ExtractedString>()

  for (const page of pages) {
    for (const text of page.renderedText) {
      const normalized = normalizeString(text)
      if (!normalized || normalized.length < 2) continue
      if (isNumeric(normalized)) continue
      if (isSymbol(normalized)) continue
      if (shouldIgnoreString(normalized)) continue
      if (normalized.length > 500) continue

      const detectedLanguage = detectLanguage(normalized)

      if (stringMap.has(normalized)) {
        const existing = stringMap.get(normalized)!
        if (!existing.foundOnPages.includes(page.name)) {
          existing.foundOnPages.push(page.name)
        }
        if (!existing.foundInLocales.includes(page.locale)) {
          existing.foundInLocales.push(page.locale)
        }
      } else {
        stringMap.set(normalized, {
          text,
          normalizedText: normalized,
          detectedLanguage,
          foundOnPages: [page.name],
          foundInLocales: [page.locale],
          isLikelyUI: isLikelyUIString(normalized),
        })
      }
    }
  }

  const all = Array.from(stringMap.values())

  const enOnArPages: ExtractedString[] = []
  const arOnEnPages: ExtractedString[] = []

  for (const page of pages) {
    for (const text of page.renderedText) {
      const normalized = normalizeString(text)
      if (!normalized || shouldIgnoreString(normalized)) continue
      const lang = detectLanguage(normalized)

      if (page.locale === 'ar' && lang === 'en' && isLikelyUIString(normalized)) {
        const entry = stringMap.get(normalized)
        if (entry && !enOnArPages.find(s => s.normalizedText === normalized)) {
          enOnArPages.push(entry)
        }
      }

      if (page.locale === 'en' && lang === 'ar') {
        const entry = stringMap.get(normalized)
        if (entry && !arOnEnPages.find(s => s.normalizedText === normalized)) {
          arOnEnPages.push(entry)
        }
      }
    }
  }

  return {
    total: all.length,
    byLocale: {
      en: all.filter(s => s.foundInLocales.includes('en')),
      ar: all.filter(s => s.foundInLocales.includes('ar')),
    },
    all,
    enOnArPages,
    arOnEnPages,
  }
}

function detectLanguage(text: string): 'ar' | 'en' | 'mixed' | 'neutral' {
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length
  const latinChars = (text.match(/[a-zA-Z]/g) || []).length
  const total = arabicChars + latinChars

  if (total === 0) return 'neutral'
  const arabicRatio = arabicChars / total
  if (arabicRatio > 0.8) return 'ar'
  if (arabicRatio < 0.2) return 'en'
  return 'mixed'
}

function isLikelyUIString(text: string): boolean {
  if (text.length > 200) return false
  if (text.split(' ').length > 25) return false
  return true
}
