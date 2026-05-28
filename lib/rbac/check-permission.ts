import 'server-only'
import { adminDb } from '@/lib/firebase/admin'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { hasPermission } from './has-permission'
import type { AdminUser, Permission } from './types'

export async function checkPermission(
  user: AdminUser,
  permission: Permission
): Promise<boolean> {
  const roleDoc = await adminDb
    .collection(COLLECTIONS.ROLES)
    .doc(user.role)
    .get()
  const rolePermissions = roleDoc.exists
    ? { [user.role]: roleDoc.data()?.permissions ?? [] }
    : {}
  return hasPermission(user, permission, rolePermissions)
}
