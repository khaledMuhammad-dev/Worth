import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/verify-session'
import { checkPermission } from '@/lib/rbac/check-permission'
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { createUserSchema } from '@/schemas/user.schema'
import type { AdminUser } from '@/lib/rbac/types'

function firebaseUnavailable() {
  return NextResponse.json(
    { error: 'Firebase Admin is not configured. Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.' },
    { status: 503 }
  )
}

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasViewPerm = await checkPermission(user, 'users:all:view')
  if (!hasViewPerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  if (!db) return firebaseUnavailable()

  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  const isActive = searchParams.get('isActive')
  const search = searchParams.get('search')?.toLowerCase()
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? '20', 10)

  let query = db.collection(COLLECTIONS.USERS) as FirebaseFirestore.Query

  if (role) query = query.where('role', '==', role)
  if (isActive !== null) query = query.where('isActive', '==', isActive === 'true')

  const snapshot = await query.get()
  let users = snapshot.docs.map((d) => ({ uid: d.id, ...d.data() } as AdminUser))

  if (search) {
    users = users.filter(
      (u) =>
        u.email.toLowerCase().includes(search) ||
        u.displayName?.toLowerCase().includes(search)
    )
  }

  const total = users.length
  const totalPages = Math.ceil(total / limit)
  const paginated = users.slice((page - 1) * limit, page * limit)

  return NextResponse.json({ users: paginated, total, page, totalPages })
}

export async function POST(request: NextRequest) {
  const currentUser = await verifyAdminSession(request)
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hasCreatePerm = await checkPermission(currentUser, 'users:all:create')
  if (!hasCreatePerm) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const db = getAdminDb()
  const auth = getAdminAuth()
  if (!db || !auth) return firebaseUnavailable()

  const body = await request.json()
  const parsed = createUserSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { email, displayName, password, role, isActive, customPermissions } = parsed.data

  // Only super_admin can create super_admin users
  if (role === 'super_admin' && currentUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const firebaseUser = await auth.createUser({
      email,
      password,
      displayName,
    })

    const now = new Date().toISOString()
    const newUser: Omit<AdminUser, 'uid'> = {
      email,
      displayName,
      photoURL: '',
      role,
      isActive,
      customPermissions: customPermissions as AdminUser['customPermissions'],
      createdAt: now,
      updatedAt: now,
      lastLoginAt: '',
    }

    await db
      .collection(COLLECTIONS.USERS)
      .doc(firebaseUser.uid)
      .set(newUser)

    return NextResponse.json({ uid: firebaseUser.uid, ...newUser }, { status: 201 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create user'
    return NextResponse.json({ message: msg }, { status: 400 })
  }
}
