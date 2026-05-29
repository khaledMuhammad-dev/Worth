import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

interface BlogMeta {
  slug: string
  titleEN: string
  titleAR: string
  excerptEN: string
  excerptAR: string
  author: string
  coverUrl: string
  tags: string[]
  status: string
  publishedAt: string
  updatedAt: string
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('worth_admin_token')?.value

  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const {
    slug,
    mdxContent,
    meta,
  }: { slug: string; mdxContent: string; meta: BlogMeta } = await request.json()

  const mdxPath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
  fs.mkdirSync(path.dirname(mdxPath), { recursive: true })
  fs.writeFileSync(mdxPath, mdxContent, 'utf8')

  const metaPath = path.join(process.cwd(), 'content/data', 'blog-meta.json')
  const existing: BlogMeta[] = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  const updatedMeta = { ...meta, updatedAt: new Date().toISOString().split('T')[0] }
  const index = existing.findIndex((entry) => entry.slug === slug)

  if (index >= 0) {
    existing[index] = updatedMeta
  } else {
    existing.push(updatedMeta)
  }

  fs.writeFileSync(metaPath, JSON.stringify(existing, null, 2), 'utf8')
  revalidatePath('/insights')
  revalidatePath(`/insights/${slug}`)

  return NextResponse.json({ success: true, slug })
}
