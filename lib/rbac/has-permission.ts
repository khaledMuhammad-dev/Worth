import type { AdminUser, Permission } from './types'

export function hasPermission(
  user: AdminUser,
  permission: Permission,
  rolePermissions: Record<string, string[]>
): boolean {
  if (!user.isActive) return false
  if (user.role === 'super_admin') return true
  const rolePerms = rolePermissions[user.role] ?? []
  if (rolePerms.includes(permission)) return true
  if (user.customPermissions?.includes(permission)) return true
  return false
}
