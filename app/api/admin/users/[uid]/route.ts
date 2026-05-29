import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { updateUserSchema } from '@/schemas/user.schema'
import type { AdminUser } from '@/lib/rbac/types'

function firebaseUnavailable() {
  return NextResponse.json(
    { error: 'Firebase Admin is not configured. Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.' },
    { status: 503 }
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const currentUser = await verifyAdminSession(request)
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { uid } = await params

  // Allow users to fetch their own data
  if (uid !== currentUser.uid) {
    const hasPerm = await checkPermission(currentUser, 'users:all:view')
    if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const db = getAdminDb()
  if (!db) return firebaseUnavailable()

  const doc = await db.collection(COLLECTIONS.USERS).doc(uid).get()
  if (!doc.exists) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({ uid: doc.id, ...doc.data() } as AdminUser)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const currentUser = await verifyAdminSession(request)
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasEditPerm = await checkPermission(currentUser, 'users:all:edit')
  if (!hasEditPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  const auth = getAdminAuth()
  if (!db || !auth) return firebaseUnavailable()

  const { uid } = await params
  const body = await request.json()
  const parsed = updateUserSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { password, ...updates } = parsed.data

  // Only super_admin can assign super_admin role
  if (updates.role === 'super_admin' && currentUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    if (password) {
      await auth.updateUser(uid, { password })
    }

    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    await db.collection(COLLECTIONS.USERS).doc(uid).update(updateData)

    const doc = await db.collection(COLLECTIONS.USERS).doc(uid).get()
    return NextResponse.json({ uid: doc.id, ...doc.data() } as AdminUser)
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to update user'
    return NextResponse.json({ message: msg }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const currentUser = await verifyAdminSession(request)
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasDeletePerm = await checkPermission(currentUser, 'users:all:delete')
  if (!hasDeletePerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  const auth = getAdminAuth()
  if (!db || !auth) return firebaseUnavailable()

  const { uid } = await params

  if (uid === currentUser.uid) {
    return NextResponse.json({ message: 'Cannot delete your own account' }, { status: 400 })
  }

  // Prevent deleting the last super_admin
  const targetDoc = await db.collection(COLLECTIONS.USERS).doc(uid).get()
  if (!targetDoc.exists) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const targetUser = targetDoc.data() as AdminUser
  if (targetUser.role === 'super_admin') {
    const superAdminSnapshot = await db
      .collection(COLLECTIONS.USERS)
      .where('role', '==', 'super_admin')
      .where('isActive', '==', true)
      .get()
    if (superAdminSnapshot.size <= 1) {
      return NextResponse.json({ message: 'Cannot delete the last super admin' }, { status: 400 })
    }
  }

  try {
    await auth.deleteUser(uid)
    await db.collection(COLLECTIONS.USERS).doc(uid).delete()
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to delete user'
    return NextResponse.json({ message: msg }, { status: 400 })
  }
}
