import 'server-only'
import { getAdminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { hasPermission } from './has-permission'
import type { AdminUser, Permission } from './types'

export async function checkPermission(
  user: AdminUser,
  permission: Permission
): Promise<boolean> {
  // super_admin always has every permission — no Firestore query needed
  if (user.role === 'super_admin') return true

  const db = getAdminDb()
  if (!db) return false // Firebase not configured; deny non-super-admin users

  const roleDoc = await db
    .collection(COLLECTIONS.ROLES)
    .doc(user.role)
    .get()
  const rolePermissions: Record<string, string[]> = roleDoc.exists
    ? { [user.role]: (roleDoc.data()?.permissions ?? []) as string[] }
    : {}
  return hasPermission(user, permission, rolePermissions)
}
