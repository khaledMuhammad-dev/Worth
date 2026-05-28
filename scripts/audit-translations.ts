#!/usr/bin/env ts-node

import { crawlAllPages, PageConfig } from './crawl-pages'
import { extractStrings } from './extract-strings'
import { checkTranslations } from './check-translations'
import { generateMissingTranslations } from './generate-translations'
import { fixTranslationFiles } from './fix-translations'
import { generateReport } from './report'

const BASE_URL = process.env.AUDIT_URL || 'http://localhost:3000'
const DRY_RUN = process.env.AUDIT_DRY_RUN === 'true'

const PAGES_TO_AUDIT: PageConfig[] = [
  // English pages
  { url: '/',                                    locale: 'en', name: 'Home EN' },
  { url: '/about',                               locale: 'en', name: 'About EN' },
  { url: '/services',                            locale: 'en', name: 'Services EN' },
  { url: '/pricing',                             locale: 'en', name: 'Pricing EN' },
  { url: '/work',                                locale: 'en', name: 'Work EN' },
  { url: '/insights',                            locale: 'en', name: 'Insights EN' },
  { url: '/contact',                             locale: 'en', name: 'Contact EN' },
  { url: '/services/marketing-media-buying',     locale: 'en', name: 'Service Marketing EN' },
  { url: '/services/brand-identity',             locale: 'en', name: 'Service Brand EN' },
  { url: '/services/motion-graphics',            locale: 'en', name: 'Service Motion EN' },
  { url: '/services/web-development',            locale: 'en', name: 'Service Web EN' },

  // Arabic pages
  { url: '/ar',                                  locale: 'ar', name: 'Home AR' },
  { url: '/ar/about',                            locale: 'ar', name: 'About AR' },
  { url: '/ar/services',                         locale: 'ar', name: 'Services AR' },
  { url: '/ar/pricing',                          locale: 'ar', name: 'Pricing AR' },
  { url: '/ar/work',                             locale: 'ar', name: 'Work AR' },
  { url: '/ar/insights',                         locale: 'ar', name: 'Insights AR' },
  { url: '/ar/contact',                          locale: 'ar', name: 'Contact AR' },
  { url: '/ar/services/marketing-media-buying',  locale: 'ar', name: 'Service Marketing AR' },
  { url: '/ar/services/brand-identity',          locale: 'ar', name: 'Service Brand AR' },
  { url: '/ar/services/motion-graphics',         locale: 'ar', name: 'Service Motion AR' },
  { url: '/ar/services/web-development',         locale: 'ar', name: 'Service Web AR' },
]

async function main() {
  console.log('\n🔍 Worth Translation Audit\n')
  console.log(`Target:  ${BASE_URL}`)
  console.log(`Dry run: ${DRY_RUN}\n`)

  // Step 1: Crawl
  console.log('📄 Crawling pages...')
  const crawledPages = await crawlAllPages(BASE_URL, PAGES_TO_AUDIT)
  console.log(`\n✓ Crawled ${crawledPages.length} pages\n`)

  // Step 2: Extract
  console.log('🔤 Extracting text strings...')
  const extractedStrings = await extractStrings(crawledPages)
  console.log(`✓ Extracted ${extractedStrings.total} unique strings\n`)

  // Step 3: Check
  console.log('🔎 Checking translation files...')
  const checkResult = await checkTranslations(extractedStrings)
  console.log('✓ Translation check complete\n')

  console.log(`  ⚠  Hardcoded strings:           ${checkResult.hardcoded.length}`)
  console.log(`  ✗  Missing Arabic translations:  ${checkResult.missingAr.length}`)
  console.log(`  ✗  Missing English translations: ${checkResult.missingEn.length}`)
  console.log(`  🚨 English on Arabic pages:      ${checkResult.enOnArPages.length}`)
  console.log(`  ✓  Correctly translated:         ${checkResult.correct.length}\n`)

  // Step 4: Generate (unless dry run)
  if (!DRY_RUN && (checkResult.missingAr.length > 0 || checkResult.missingEn.length > 0 || checkResult.hardcoded.length > 0)) {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log('⚠  ANTHROPIC_API_KEY not set — skipping auto-generation\n')
    } else {
      console.log('🤖 Generating missing translations via Anthropic API...')
      const generated = await generateMissingTranslations(checkResult)
      console.log(`✓ Generated ${generated.count} translations\n`)

      // Step 5: Write fixes
      console.log('💾 Writing translations to locale files...')
      await fixTranslationFiles(generated)
      console.log('✓ Locale files updated\n')
    }
  } else if (DRY_RUN) {
    console.log('ℹ  Dry run — skipping auto-generation and file writes\n')
  }

  // Step 6: Report
  console.log('📊 Generating audit report...')
  await generateReport(checkResult, extractedStrings)
  console.log('✓ Report saved to scripts/output/\n')

  console.log('✅ Audit complete!\n')
  console.log('  Report:  scripts/output/audit-report.md')
  console.log('  JSON:    scripts/output/audit-report.json')
  console.log('  Missing: scripts/output/missing-ar.json')
  console.log('           scripts/output/missing-en.json')
  console.log('  Hard:    scripts/output/hardcoded.json\n')

  // Exit with error code if critical issues remain
  if (checkResult.enOnArPages.length > 0 || checkResult.missingAr.length > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Audit failed:', err)
  process.exit(1)
})
