import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { getAdminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { page } = await params

  const hasPerm = await checkPermission(
    user,
    `content:${page}:view` as Parameters<typeof checkPermission>[1]
  )
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  if (!db) {
    return NextResponse.json(
      { error: 'Firebase Admin is not configured. Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.' },
      { status: 503 }
    )
  }

  const doc = await db.collection(COLLECTIONS.CONTENT).doc(page).get()
  if (!doc.exists) return NextResponse.json({ error: 'Content not found' }, { status: 404 })

  return NextResponse.json(doc.data())
}
