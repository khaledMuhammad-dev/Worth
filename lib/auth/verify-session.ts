import 'server-only'
import { cookies } from 'next/headers'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import type { AdminUser } from '@/lib/rbac/types'

/** A synthetic super_admin user used when logged in via the cookie-based admin password. */
const COOKIE_SUPER_ADMIN: AdminUser = {
  uid: 'cookie-admin',
  email: 'admin@local',
  displayName: 'Admin',
  photoURL: '',
  role: 'super_admin',
  customPermissions: [],
  isActive: true,
  createdAt: '',
  updatedAt: '',
  lastLoginAt: '',
}

export async function verifyAdminSession(
  request: Request
): Promise<AdminUser | null> {
  // 1. Try Firebase Bearer token first (multi-user RBAC path)
  try {
    const authHeader = request.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const idToken = authHeader.slice(7)
      const decoded = await adminAuth.verifyIdToken(idToken)

      const userDoc = await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(decoded.uid)
        .get()

      if (userDoc.exists) {
        const user = { uid: userDoc.id, ...userDoc.data() } as AdminUser
        if (user.isActive) return user
      }
    }
  } catch {
    // Fall through to cookie check
  }

  // 2. Fall back to cookie-based admin password (same as all other admin routes)
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('worth_admin_token')?.value
    if (token && token === process.env.ADMIN_SECRET_TOKEN) {
      return COOKIE_SUPER_ADMIN
    }
  } catch {
    // cookies() can throw outside of request context
  }

  return null
}
