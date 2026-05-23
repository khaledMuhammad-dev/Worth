import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content', 'data')
const blogDir = path.join(process.cwd(), 'content', 'blog')

export function getContentData<T>(page: string): T {
  const filePath = path.join(contentDir, `${page}.json`)
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as T
}

export function getBlogMeta(): BlogMeta[] {
  const filePath = path.join(contentDir, 'blog-meta.json')
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw)
}

export function getBlogPost(slug: string): string {
  const filePath = path.join(blogDir, `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf8')
}

export function getBlogPostSlugs(): string[] {
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export interface BlogMeta {
  slug: string
  titleEN: string
  titleAR: string
  excerptEN: string
  excerptAR: string
  author: string
  coverUrl: string
  tags: string[]
  status: 'published' | 'draft'
  publishedAt: string
  updatedAt: string
}
