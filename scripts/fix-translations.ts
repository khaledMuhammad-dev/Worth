import fs from 'fs'
import path from 'path'
import { GeneratedTranslations } from './generate-translations'

export async function fixTranslationFiles(
  generated: GeneratedTranslations
): Promise<void> {
  const localesDir = path.join(process.cwd(), 'locales')
  const altLocalesDir = path.join(process.cwd(), 'public', 'locales')

  let enPath = path.join(localesDir, 'en.json')
  let arPath = path.join(localesDir, 'ar.json')

  if (!fs.existsSync(enPath)) {
    enPath = path.join(altLocalesDir, 'en', 'translation.json')
    arPath = path.join(altLocalesDir, 'ar', 'translation.json')
  }

  let enContent: Record<string, unknown> = {}
  let arContent: Record<string, unknown> = {}

  if (fs.existsSync(enPath)) {
    enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'))
  }
  if (fs.existsSync(arPath)) {
    arContent = JSON.parse(fs.readFileSync(arPath, 'utf8'))
  }

  for (const [key, value] of Object.entries(generated.ar)) {
    if (value && value.trim()) {
      setNestedKey(arContent, key, value)
    }
  }

  for (const [key, value] of Object.entries(generated.en)) {
    if (value && value.trim()) {
      setNestedKey(enContent, key, value)
    }
  }

  for (const fix of generated.hardcodedFixes) {
    if (fix.en) setNestedKey(enContent, fix.key, fix.en)
    if (fix.ar) setNestedKey(arContent, fix.key, fix.ar)
  }

  fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2) + '\n', 'utf8')
  fs.writeFileSync(arPath, JSON.stringify(arContent, null, 2) + '\n', 'utf8')

  const outputDir = path.join(process.cwd(), 'scripts', 'output')
  fs.mkdirSync(outputDir, { recursive: true })

  fs.writeFileSync(
    path.join(outputDir, 'fixed.json'),
    JSON.stringify(generated, null, 2),
    'utf8'
  )
}

function setNestedKey(
  obj: Record<string, unknown>,
  key: string,
  value: string
): void {
  const parts = key.split('.')
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
      current[parts[i]] = {}
    }
    current = current[parts[i]] as Record<string, unknown>
  }
  current[parts[parts.length - 1]] = value
}
