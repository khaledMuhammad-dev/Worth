import fs from 'fs'
import path from 'path'
import { TranslationCheckResult } from './check-translations'
import { ExtractionResult } from './extract-strings'

export async function generateReport(
  check: TranslationCheckResult,
  extracted: ExtractionResult
): Promise<void> {
  const outputDir = path.join(process.cwd(), 'scripts', 'output')
  fs.mkdirSync(outputDir, { recursive: true })

  const timestamp = new Date().toISOString()

  const jsonReport = {
    timestamp,
    summary: {
      totalStrings: extracted.total,
      hardcoded: check.hardcoded.length,
      missingAr: check.missingAr.length,
      missingEn: check.missingEn.length,
      correct: check.correct.length,
      enOnArPages: check.enOnArPages.length,
      arOnEnPages: check.arOnEnPages.length,
    },
    hardcoded: check.hardcoded,
    missingAr: check.missingAr,
    missingEn: check.missingEn,
    languageMismatches: {
      englishOnArabicPages: check.enOnArPages.map(s => ({
        text: s.text,
        foundOn: s.foundOnPages,
      })),
      arabicOnEnglishPages: check.arOnEnPages.map(s => ({
        text: s.text,
        foundOn: s.foundOnPages,
      })),
    },
  }

  fs.writeFileSync(
    path.join(outputDir, 'audit-report.json'),
    JSON.stringify(jsonReport, null, 2),
    'utf8'
  )

  fs.writeFileSync(
    path.join(outputDir, 'hardcoded.json'),
    JSON.stringify(check.hardcoded, null, 2),
    'utf8'
  )
  fs.writeFileSync(
    path.join(outputDir, 'missing-ar.json'),
    JSON.stringify(check.missingAr, null, 2),
    'utf8'
  )
  fs.writeFileSync(
    path.join(outputDir, 'missing-en.json'),
    JSON.stringify(check.missingEn, null, 2),
    'utf8'
  )

  const statusIcon = (n: number) => (n === 0 ? '✅' : '❌')

  const md = `# Worth Website — Translation Audit Report
Generated: ${timestamp}

---

## Summary

| Check | Count | Status |
|-------|-------|--------|
| Total strings found | ${extracted.total} | — |
| Hardcoded (not using i18next) | ${check.hardcoded.length} | ${check.hardcoded.length === 0 ? '✅' : '⚠️'} |
| Missing Arabic translation | ${check.missingAr.length} | ${statusIcon(check.missingAr.length)} |
| Missing English translation | ${check.missingEn.length} | ${statusIcon(check.missingEn.length)} |
| English text on Arabic pages | ${check.enOnArPages.length} | ${statusIcon(check.enOnArPages.length)} |
| Arabic text on English pages | ${check.arOnEnPages.length} | ${statusIcon(check.arOnEnPages.length)} |
| Correctly translated | ${check.correct.length} | ✅ |

---

## 🚨 English Text Found on Arabic Pages

${check.enOnArPages.length === 0
  ? '_None — all good!_'
  : check.enOnArPages.map(s =>
      `- **"${s.text}"**\n  Found on: ${s.foundOnPages.join(', ')}`
    ).join('\n')}

---

## ⚠️ Hardcoded Strings (not using i18next)

${check.hardcoded.length === 0
  ? '_None — all good!_'
  : check.hardcoded.map(s =>
      `- **"${s.text}"**\n  Suggested key: \`${s.suggestedKey}\`\n  Found on: ${s.foundOnPages.join(', ')}`
    ).join('\n')}

---

## ❌ Missing Arabic Translations

${check.missingAr.length === 0
  ? '_None — all good!_'
  : check.missingAr.map(t =>
      `- Key: \`${t.key}\`\n  English: "${t.existingText}"`
    ).join('\n')}

---

## ❌ Missing English Translations

${check.missingEn.length === 0
  ? '_None — all good!_'
  : check.missingEn.map(t =>
      `- Key: \`${t.key}\`\n  Arabic: "${t.existingText}"`
    ).join('\n')}

---

## ✅ Correctly Translated Strings

${check.correct.length} strings are correctly translated in both languages.

---

_All missing translations have been auto-generated and written to the locale files._
_Review /scripts/output/fixed.json to see what was added._
`

  fs.writeFileSync(path.join(outputDir, 'audit-report.md'), md, 'utf8')
}
