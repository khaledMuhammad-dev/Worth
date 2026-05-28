import { hasPermission } from '@/lib/rbac/has-permission'
import type { AdminUser } from '@/lib/rbac/types'

const adminUser: AdminUser = {
  uid: 'user-1',
  email: 'admin@test.com',
  displayName: 'Admin',
  photoURL: '',
  role: 'admin',
  customPermissions: [],
  isActive: true,
  createdAt: '',
  updatedAt: '',
  lastLoginAt: '',
}

const rolePermissions = {
  admin: ['content:home:view', 'content:home:edit', 'blog:all:view'],
}

describe('hasPermission', () => {
  it('returns false for inactive users', () => {
    expect(hasPermission({ ...adminUser, isActive: false }, 'content:home:view', rolePermissions)).toBe(false)
  })

  it('returns true for super_admin regardless of role permissions', () => {
    expect(hasPermission({ ...adminUser, role: 'super_admin' }, 'users:all:delete', {})).toBe(true)
  })

  it('returns true when role has permission', () => {
    expect(hasPermission(adminUser, 'content:home:edit', rolePermissions)).toBe(true)
  })

  it('returns false when role lacks permission', () => {
    expect(hasPermission(adminUser, 'users:all:delete', rolePermissions)).toBe(false)
  })

  it('returns true when user has custom permission override', () => {
    const userWithCustom = {
      ...adminUser,
      customPermissions: ['users:all:delete' as AdminUser['customPermissions'][number]],
    }
    expect(hasPermission(userWithCustom, 'users:all:delete', rolePermissions)).toBe(true)
  })
})
