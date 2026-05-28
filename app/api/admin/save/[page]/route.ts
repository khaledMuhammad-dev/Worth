import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { adminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
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
  const user = await verifyAdminSession(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { page } = await params

  if (!ALLOWLIST.includes(page)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  // Map page name to content permission
  const contentPage = page === 'blog-meta' ? 'blog' : page
  const hasPermission = await checkPermission(
    user,
    `content:${contentPage}:edit` as Parameters<typeof checkPermission>[1]
  )
  if (!hasPermission) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const data = await request.json()

  // Write to Firestore
  await adminDb
    .collection(COLLECTIONS.CONTENT)
    .doc(page)
    .set(data, { merge: !Array.isArray(data) })

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
    const doc = await adminDb.collection(COLLECTIONS.CONTENT).doc('services').get()
    const services = doc.data() as ServicesData | undefined
    if (services?.items) {
      for (const s of services.items) {
        revalidatePath(`/services/${s.slug}`)
      }
    }
  }

  if (page === 'work') {
    const doc = await adminDb.collection(COLLECTIONS.CONTENT).doc('work').get()
    const work = doc.data() as WorkData | undefined
    if (work?.projects) {
      for (const p of work.projects) {
        revalidatePath(`/work/${p.slug}`)
      }
    }
  }

  return NextResponse.json({ success: true })
}

