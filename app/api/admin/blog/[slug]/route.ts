import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface BlogMeta {
  slug: string
  [key: string]: unknown
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('worth_admin_token')?.value

  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const metaPath = path.join(process.cwd(), 'content/data', 'blog-meta.json')
  const mdxPath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)

  const metas: BlogMeta[] = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    : []
  const meta = metas.find((entry) => entry.slug === slug)

  if (!meta || !fs.existsSync(mdxPath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({
    meta,
    mdxContent: fs.readFileSync(mdxPath, 'utf8'),
  })
}
