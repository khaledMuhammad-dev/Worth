import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getContentData } from '@/lib/content'
import type { ServicesData, WorkData } from '@/lib/types/content'

const ALLOWLIST = [
  'announcements',
  'navigation',
  'home',
  'about',
  'services',
  'pricing',
  'work',
  'contact',
  'blog-meta',
  'settings',
]

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('worth_admin_token')?.value

  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { page } = await params

  if (!ALLOWLIST.includes(page)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  const data = await request.json()
  const filePath = path.join(process.cwd(), 'content/data', `${page}.json`)
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : null
  const nextData = Array.isArray(data) || Array.isArray(existing) ? data : { ...(existing ?? {}), ...data }

  fs.writeFileSync(filePath, JSON.stringify(nextData, null, 2), 'utf8')

  const revalidateMap: Record<string, string[]> = {
    announcements: ['/', '/about', '/services', '/pricing', '/work', '/contact', '/insights'],
    navigation: ['/', '/about', '/services', '/pricing', '/work', '/contact', '/insights'],
    home: ['/'],
    about: ['/about'],
    services: ['/services'],
    pricing: ['/pricing'],
    work: ['/work'],
    contact: ['/contact'],
    'blog-meta': ['/insights'],
  }

  const paths = revalidateMap[page] ?? ['/']
  for (const p of paths) {
    revalidatePath(p)
  }

  if (page === 'services') {
    const services = getContentData<ServicesData>('services')
    for (const s of services.items) {
      revalidatePath(`/services/${s.slug}`)
    }
  }

  if (page === 'work') {
    const work = getContentData<WorkData>('work')
    for (const p of work.projects) {
      revalidatePath(`/work/${p.slug}`)
    }
  }

  return NextResponse.json({ success: true })
}
