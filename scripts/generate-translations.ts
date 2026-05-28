import { TranslationCheckResult, MissingTranslation } from './check-translations'

export interface GeneratedTranslations {
  count: number
  ar: Record<string, string>
  en: Record<string, string>
  hardcodedFixes: {
    key: string
    en: string
    ar: string
  }[]
}

export async function generateMissingTranslations(
  checkResult: TranslationCheckResult
): Promise<GeneratedTranslations> {
  const generated: GeneratedTranslations = {
    count: 0,
    ar: {},
    en: {},
    hardcodedFixes: [],
  }

  const BATCH_SIZE = 50

  // Generate Arabic for EN strings (in batches)
  if (checkResult.missingAr.length > 0) {
    const batches = chunk(checkResult.missingAr, BATCH_SIZE)
    for (const batch of batches) {
      const arResults = await translateBatch(
        batch.map(t => ({ key: t.key, text: t.existingText })),
        'en',
        'ar'
      )
      Object.assign(generated.ar, arResults)
      generated.count += Object.keys(arResults).length
    }
  }

  // Generate English for AR strings (in batches)
  if (checkResult.missingEn.length > 0) {
    const batches = chunk(checkResult.missingEn, BATCH_SIZE)
    for (const batch of batches) {
      const enResults = await translateBatch(
        batch.map(t => ({ key: t.key, text: t.existingText })),
        'ar',
        'en'
      )
      Object.assign(generated.en, enResults)
      generated.count += Object.keys(enResults).length
    }
  }

  // Generate both EN and AR for hardcoded strings
  if (checkResult.hardcoded.length > 0) {
    const batches = chunk(checkResult.hardcoded, BATCH_SIZE)
    for (const batch of batches) {
      const enItems = batch.filter(hc => detectTextLanguage(hc.text) === 'en')
      const arItems = batch.filter(hc => detectTextLanguage(hc.text) === 'ar')

      if (enItems.length > 0) {
        const arBatch = await translateBatch(
          enItems.map(hc => ({ key: hc.suggestedKey, text: hc.text })),
          'en',
          'ar'
        )
        for (const hc of enItems) {
          generated.hardcodedFixes.push({
            key: hc.suggestedKey,
            en: hc.text,
            ar: arBatch[hc.suggestedKey] || '',
          })
        }
      }

      if (arItems.length > 0) {
        const enBatch = await translateBatch(
          arItems.map(hc => ({ key: hc.suggestedKey, text: hc.text })),
          'ar',
          'en'
        )
        for (const hc of arItems) {
          generated.hardcodedFixes.push({
            key: hc.suggestedKey,
            en: enBatch[hc.suggestedKey] || '',
            ar: hc.text,
          })
        }
      }
    }
    generated.count += generated.hardcodedFixes.length
  }

  return generated
}

async function translateBatch(
  items: { key: string; text: string }[],
  fromLang: 'en' | 'ar',
  toLang: 'en' | 'ar'
): Promise<Record<string, string>> {
  const fromLabel = fromLang === 'en' ? 'English' : 'Arabic'
  const toLabel = toLang === 'ar' ? 'Arabic' : 'English'

  const itemsList = items
    .map(item => `KEY: ${item.key}\nTEXT: ${item.text}`)
    .join('\n\n')

  const prompt = `You are a professional translator specializing in marketing and agency websites.
Translate the following ${fromLabel} UI strings to ${toLabel}.

Context: These strings are from a digital marketing agency website called "Worth Agency"
that serves clients in the MENA region. The tone is professional, modern, and confident.
For Arabic translations: use Modern Standard Arabic (MSA) that is formal yet approachable.
Keep brand names, URLs, technical terms, and proper nouns unchanged.
Preserve any punctuation style (arrows →, dots, etc.).

Return ONLY a valid JSON object mapping each KEY to its ${toLabel} translation.
No explanation, no markdown, no code blocks. Just the raw JSON object.

Strings to translate:
${itemsList}

Expected format:
{
  "key1": "translated text 1",
  "key2": "translated text 2"
}`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json() as { content?: { text?: string }[] }
    const text = data.content?.[0]?.text || '{}'

    const clean = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    return JSON.parse(clean) as Record<string, string>
  } catch (err) {
    console.error(`  Translation batch failed (${fromLang}→${toLang}):`, err)
    return {}
  }
}

function detectTextLanguage(text: string): 'ar' | 'en' | 'unknown' {
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length
  const latinChars = (text.match(/[a-zA-Z]/g) || []).length
  if (arabicChars > latinChars) return 'ar'
  if (latinChars > arabicChars) return 'en'
  return 'unknown'
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}
