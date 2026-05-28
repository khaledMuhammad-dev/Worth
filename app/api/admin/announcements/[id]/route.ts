import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { adminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { announcementSchema } from '@/schemas/announcement.schema'
import type { Announcement } from '@/lib/types/content'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasPerm = await checkPermission(user, 'announcements:all:edit')
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const parsed = announcementSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  await adminDb
    .collection(COLLECTIONS.ANNOUNCEMENTS)
    .doc(id)
    .update({ ...parsed.data, updatedAt: new Date().toISOString() })

  const doc = await adminDb.collection(COLLECTIONS.ANNOUNCEMENTS).doc(id).get()
  return NextResponse.json({ id: doc.id, ...doc.data() } as Announcement)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasPerm = await checkPermission(user, 'announcements:all:delete')
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  await adminDb.collection(COLLECTIONS.ANNOUNCEMENTS).doc(id).delete()
  return NextResponse.json({ success: true })
}
