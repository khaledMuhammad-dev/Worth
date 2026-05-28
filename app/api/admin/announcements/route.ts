import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { adminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { announcementSchema } from '@/schemas/announcement.schema'
import type { Announcement } from '@/lib/types/content'

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasPerm = await checkPermission(user, 'announcements:all:view')
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const activeOnly = searchParams.get('active') === 'true'

  let query = adminDb.collection(COLLECTIONS.ANNOUNCEMENTS) as FirebaseFirestore.Query
  if (activeOnly) query = query.where('active', '==', true)
  query = query.orderBy('priority', 'asc')

  const snapshot = await query.get()
  const announcements = snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() } as Announcement)
  )

  return NextResponse.json(announcements)
}

export async function POST(request: NextRequest) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasPerm = await checkPermission(user, 'announcements:all:create')
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const parsed = announcementSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const now = new Date().toISOString()
  const docRef = await adminDb.collection(COLLECTIONS.ANNOUNCEMENTS).add({
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  })

  const doc = await docRef.get()
  return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 201 })
}
