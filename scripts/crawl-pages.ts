import puppeteer, { Browser } from 'puppeteer'

export interface PageData {
  url: string
  locale: string
  name: string
  html: string
  title: string
  lang: string
  dir: string
  renderedText: string[]
}

export interface PageConfig {
  url: string
  locale: string
  name: string
}

export async function crawlAllPages(
  baseUrl: string,
  pages: PageConfig[]
): Promise<PageData[]> {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results: PageData[] = []

  for (const page of pages) {
    const fullUrl = `${baseUrl}${page.url}`
    const tab = await browser.newPage()

    try {
      await tab.goto(fullUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      })

      // Wait for React hydration
      await new Promise(r => setTimeout(r, 1500))

      // Trigger lazy-loaded content
      await tab.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await new Promise(r => setTimeout(r, 800))
      await tab.evaluate(() => window.scrollTo(0, 0))

      const data = await tab.evaluate(() => {
        const html = document.documentElement.outerHTML
        const htmlEl = document.documentElement
        const lang = htmlEl.getAttribute('lang') || ''
        const dir = htmlEl.getAttribute('dir') || ''
        const title = document.title

        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              const parent = node.parentElement
              if (!parent) return NodeFilter.FILTER_REJECT
              const tag = parent.tagName.toLowerCase()
              if (['script', 'style', 'noscript', 'meta', 'link'].includes(tag)) {
                return NodeFilter.FILTER_REJECT
              }
              const style = window.getComputedStyle(parent)
              if (style.display === 'none' || style.visibility === 'hidden') {
                return NodeFilter.FILTER_REJECT
              }
              const text = node.textContent?.trim()
              if (!text || text.length < 2) return NodeFilter.FILTER_REJECT
              return NodeFilter.FILTER_ACCEPT
            },
          }
        )

        const texts: string[] = []
        let node
        while ((node = walker.nextNode())) {
          const text = node.textContent?.trim()
          if (text && text.length > 1 && !texts.includes(text)) {
            texts.push(text)
          }
        }

        return { html, lang, dir, title, texts }
      })

      results.push({
        url: fullUrl,
        locale: page.locale,
        name: page.name,
        html: data.html,
        title: data.title,
        lang: data.lang,
        dir: data.dir,
        renderedText: data.texts,
      })

      console.log(`  ✓ ${page.name} — ${data.texts.length} strings, lang="${data.lang}" dir="${data.dir}"`)
    } catch (err) {
      console.error(`  ✗ Failed to crawl ${fullUrl}:`, err)
    } finally {
      await tab.close()
    }
  }

  await browser.close()
  return results
}
