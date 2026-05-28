import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content', 'data')
const blogDir = path.join(process.cwd(), 'content', 'blog')

function hasFirebaseAdminCredentials(): boolean {
  return !!(
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  )
}

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as T
}

export async function getContentData<T>(page: string): Promise<T> {
  if (hasFirebaseAdminCredentials()) {
    const { adminDb } = await import('@/lib/firebase/admin')
    const { COLLECTIONS } = await import('@/lib/firebase/collections')
    const doc = await adminDb.collection(COLLECTIONS.CONTENT).doc(page).get()
    if (doc.exists) return doc.data() as T
  }
  // Fallback to JSON files
  const filePath = path.join(contentDir, `${page}.json`)
  return readJsonFile<T>(filePath)
}

export async function getBlogMeta(): Promise<BlogMeta[]> {
  if (hasFirebaseAdminCredentials()) {
    const { adminDb } = await import('@/lib/firebase/admin')
    const { COLLECTIONS } = await import('@/lib/firebase/collections')
    const snapshot = await adminDb
      .collection(COLLECTIONS.BLOG_META)
      .orderBy('publishedAt', 'desc')
      .get()
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ slug: d.id, ...d.data() } as BlogMeta))
    }
  }
  // Fallback to JSON files
  const filePath = path.join(contentDir, 'blog-meta.json')
  return readJsonFile<BlogMeta[]>(filePath)
}

export async function getBlogPost(slug: string): Promise<string> {
  if (hasFirebaseAdminCredentials()) {
    const { adminDb } = await import('@/lib/firebase/admin')
    const { COLLECTIONS } = await import('@/lib/firebase/collections')
    const doc = await adminDb.collection(COLLECTIONS.BLOG_POSTS).doc(slug).get()
    if (doc.exists) return doc.data()?.content as string
  }
  // Fallback to MDX files
  const filePath = path.join(blogDir, `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf8')
}

export async function getBlogPostSlugs(): Promise<string[]> {
  if (hasFirebaseAdminCredentials()) {
    const { adminDb } = await import('@/lib/firebase/admin')
    const { COLLECTIONS } = await import('@/lib/firebase/collections')
    const snapshot = await adminDb.collection(COLLECTIONS.BLOG_META).get()
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => d.id)
    }
  }
  // Fallback to MDX files
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
