import 'server-only'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import type { AdminUser } from '@/lib/rbac/types'

export async function verifyAdminSession(
  request: Request
): Promise<AdminUser | null> {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) return null

    const idToken = authHeader.slice(7)
    const decoded = await adminAuth.verifyIdToken(idToken)

    const userDoc = await adminDb
      .collection(COLLECTIONS.USERS)
      .doc(decoded.uid)
      .get()

    if (!userDoc.exists) return null

    const user = { uid: userDoc.id, ...userDoc.data() } as AdminUser
    if (!user.isActive) return null

    return user
  } catch {
    return null
  }
}
