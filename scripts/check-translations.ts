import fs from 'fs'
import path from 'path'
import { ExtractionResult, ExtractedString } from './extract-strings'

export interface TranslationCheckResult {
  hardcoded: HardcodedString[]
  missingAr: MissingTranslation[]
  missingEn: MissingTranslation[]
  correct: CorrectTranslation[]
  enOnArPages: ExtractedString[]
  arOnEnPages: ExtractedString[]
  localeFiles: {
    en: Record<string, unknown>
    ar: Record<string, unknown>
  }
}

export interface HardcodedString {
  text: string
  foundOnPages: string[]
  suggestedKey: string
}

export interface MissingTranslation {
  key: string
  existingText: string
  existingLocale: 'en' | 'ar'
  missingLocale: 'en' | 'ar'
  suggestedTranslation?: string
}

export interface CorrectTranslation {
  key: string
  en: string
  ar: string
}

export async function checkTranslations(
  extracted: ExtractionResult
): Promise<TranslationCheckResult> {
  const localesDir = path.join(process.cwd(), 'locales')
  const enPath = path.join(localesDir, 'en.json')
  const arPath = path.join(localesDir, 'ar.json')

  // Also support /public/locales/en/translation.json (i18next default)
  const enAltPath = path.join(process.cwd(), 'public', 'locales', 'en', 'translation.json')
  const arAltPath = path.join(process.cwd(), 'public', 'locales', 'ar', 'translation.json')

  let enTranslations: Record<string, unknown> = {}
  let arTranslations: Record<string, unknown> = {}

  if (fs.existsSync(enPath)) {
    enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'))
  } else if (fs.existsSync(enAltPath)) {
    enTranslations = JSON.parse(fs.readFileSync(enAltPath, 'utf8'))
  }

  if (fs.existsSync(arPath)) {
    arTranslations = JSON.parse(fs.readFileSync(arPath, 'utf8'))
  } else if (fs.existsSync(arAltPath)) {
    arTranslations = JSON.parse(fs.readFileSync(arAltPath, 'utf8'))
  }

  const enFlat = flattenObject(enTranslations)
  const arFlat = flattenObject(arTranslations)

  // Reverse-lookup: value → key
  const enValues = new Map(Object.entries(enFlat).map(([k, v]) => [String(v).trim(), k]))
  const arValues = new Map(Object.entries(arFlat).map(([k, v]) => [String(v).trim(), k]))

  const hardcoded: HardcodedString[] = []
  const missingAr: MissingTranslation[] = []
  const missingEn: MissingTranslation[] = []
  const correct: CorrectTranslation[] = []

  for (const str of extracted.all) {
    if (!str.isLikelyUI) continue

    const text = str.normalizedText
    const enKey = enValues.get(text)
    const arKey = arValues.get(text)

    if (!enKey && !arKey) {
      hardcoded.push({
        text,
        foundOnPages: str.foundOnPages,
        suggestedKey: generateKey(text),
      })
      continue
    }

    if (enKey && !arKey) {
      const arValue = arFlat[enKey]
      if (!arValue) {
        missingAr.push({
          key: enKey,
          existingText: text,
          existingLocale: 'en',
          missingLocale: 'ar',
        })
      } else {
        correct.push({ key: enKey, en: text, ar: String(arValue) })
      }
      continue
    }

    if (arKey && !enKey) {
      const enValue = enFlat[arKey]
      if (!enValue) {
        missingEn.push({
          key: arKey,
          existingText: text,
          existingLocale: 'ar',
          missingLocale: 'en',
        })
      }
    }
  }

  // Cross-check: every EN key must have an AR equivalent
  for (const [key, enValue] of Object.entries(enFlat)) {
    if (!arFlat[key]) {
      if (!missingAr.find(m => m.key === key)) {
        missingAr.push({
          key,
          existingText: String(enValue),
          existingLocale: 'en',
          missingLocale: 'ar',
        })
      }
    }
  }

  // Cross-check: every AR key must have an EN equivalent
  for (const [key, arValue] of Object.entries(arFlat)) {
    if (!enFlat[key]) {
      if (!missingEn.find(m => m.key === key)) {
        missingEn.push({
          key,
          existingText: String(arValue),
          existingLocale: 'ar',
          missingLocale: 'en',
        })
      }
    }
  }

  // Also flag keys where AR value equals EN value (not translated)
  const untranslated: MissingTranslation[] = []
  for (const [key, enValue] of Object.entries(enFlat)) {
    const arValue = arFlat[key]
    if (arValue && String(arValue).trim() === String(enValue).trim()) {
      // AR value is identical to EN — likely a placeholder not yet translated
      untranslated.push({
        key,
        existingText: String(enValue),
        existingLocale: 'en',
        missingLocale: 'ar',
      })
    }
  }

  return {
    hardcoded: deduplicateByText(hardcoded),
    missingAr: deduplicateByKey([...missingAr, ...untranslated]),
    missingEn: deduplicateByKey(missingEn),
    correct,
    enOnArPages: extracted.enOnArPages,
    arOnEnPages: extracted.arOnEnPages,
    localeFiles: { en: enTranslations, ar: arTranslations },
  }
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey))
    } else {
      result[fullKey] = String(value)
    }
  }
  return result
}

function generateKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 50)
}

function deduplicateByKey<T extends { key: string }>(arr: T[]): T[] {
  const seen = new Set<string>()
  return arr.filter(item => {
    if (seen.has(item.key)) return false
    seen.add(item.key)
    return true
  })
}

function deduplicateByText(arr: HardcodedString[]): HardcodedString[] {
  const seen = new Set<string>()
  return arr.filter(item => {
    if (seen.has(item.text)) return false
    seen.add(item.text)
    return true
  })
}
