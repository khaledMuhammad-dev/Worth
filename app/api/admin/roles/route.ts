import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { getAdminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { updateRolePermissionsSchema } from '@/schemas/role.schema'
import { DEFAULT_ROLE_PERMISSIONS } from '@/lib/rbac/roles'

function firebaseUnavailable() {
  return NextResponse.json(
    { error: 'Firebase Admin is not configured. Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.' },
    { status: 503 }
  )
}

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasPerm = await checkPermission(user, 'roles:all:view')
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  if (!db) {
    // Return defaults when Firebase isn't configured
    return NextResponse.json({
      super_admin: {
        id: 'super_admin',
        name: 'Super Admin',
        description: 'Full system access',
        permissions: DEFAULT_ROLE_PERMISSIONS.super_admin,
        isSystem: true,
      },
      admin: {
        id: 'admin',
        name: 'Admin',
        description: 'Standard admin access',
        permissions: DEFAULT_ROLE_PERMISSIONS.admin,
        isSystem: true,
      },
    })
  }

  const snapshot = await db.collection(COLLECTIONS.ROLES).get()

  // If no roles in Firestore yet, return defaults
  if (snapshot.empty) {
    const defaultRoles = {
      super_admin: {
        id: 'super_admin',
        name: 'Super Admin',
        description: 'Full system access',
        permissions: DEFAULT_ROLE_PERMISSIONS.super_admin,
        isSystem: true,
      },
      admin: {
        id: 'admin',
        name: 'Admin',
        description: 'Standard admin access',
        permissions: DEFAULT_ROLE_PERMISSIONS.admin,
        isSystem: true,
      },
    }
    return NextResponse.json(defaultRoles)
  }

  const roles: Record<string, unknown> = {}
  snapshot.forEach((doc) => {
    roles[doc.id] = { id: doc.id, ...doc.data() }
  })

  return NextResponse.json(roles)
}

export async function PUT(request: NextRequest) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasPerm = await checkPermission(user, 'roles:all:edit')
  if (!hasPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  if (!db) return firebaseUnavailable()

  const body = await request.json()
  const parsed = updateRolePermissionsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { roleId, permissions, description } = parsed.data

  // super_admin role is immutable
  if (roleId === 'super_admin') {
    return NextResponse.json({ error: 'Cannot modify super_admin permissions' }, { status: 403 })
  }

  const updateData: Record<string, unknown> = { permissions, updatedAt: new Date().toISOString() }
  if (description) updateData.description = description

  await db
    .collection(COLLECTIONS.ROLES)
    .doc(roleId)
    .set(
      {
        id: roleId,
        name: roleId === 'admin' ? 'Admin' : roleId,
        isSystem: true,
        ...updateData,
      },
      { merge: true }
    )

  const doc = await db.collection(COLLECTIONS.ROLES).doc(roleId).get()
  return NextResponse.json({ id: doc.id, ...doc.data() })
}
