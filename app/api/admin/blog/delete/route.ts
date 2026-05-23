import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface BlogMeta {
  slug: string
  [key: string]: unknown
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('worth_admin_token')?.value

  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug }: { slug: string } = await request.json()

  const mdxPath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
  if (fs.existsSync(mdxPath)) {
    fs.unlinkSync(mdxPath)
  }

  const metaPath = path.join(process.cwd(), 'content/data', 'blog-meta.json')
  const existing: BlogMeta[] = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  const updated = existing.filter((entry) => entry.slug !== slug)
  fs.writeFileSync(metaPath, JSON.stringify(updated, null, 2), 'utf8')

  return NextResponse.json({ success: true })
}
