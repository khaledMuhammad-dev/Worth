import { usePermissionsStore } from '@/stores/permissions.store'

const adminUser = {
  uid: '2',
  email: 'admin@test.com',
  role: 'admin' as const,
  customPermissions: [],
  isActive: true,
  displayName: 'Admin',
  photoURL: '',
  createdAt: '',
  updatedAt: '',
  lastLoginAt: '',
}

describe('permissions.store', () => {
  beforeEach(() => {
    usePermissionsStore.setState({ rolePermissions: {}, isLoaded: false })
  })

  it('sets role permissions and marks loaded', () => {
    usePermissionsStore.getState().setRolePermissions({ admin: ['content:home:edit'] })
    expect(usePermissionsStore.getState().isLoaded).toBe(true)
    expect(usePermissionsStore.getState().rolePermissions.admin).toContain('content:home:edit')
  })

  it('optimistically toggles permission on', () => {
    usePermissionsStore.getState().setRolePermissions({ admin: [] })
    usePermissionsStore.getState().updateRolePermission('admin', 'blog:all:delete', true)
    expect(usePermissionsStore.getState().rolePermissions.admin).toContain('blog:all:delete')
  })

  it('optimistically toggles permission off', () => {
    usePermissionsStore.getState().setRolePermissions({ admin: ['blog:all:delete'] })
    usePermissionsStore.getState().updateRolePermission('admin', 'blog:all:delete', false)
    expect(usePermissionsStore.getState().rolePermissions.admin).not.toContain('blog:all:delete')
  })

  it('checkPermission uses stored role permissions', () => {
    usePermissionsStore.getState().setRolePermissions({ admin: ['content:home:edit'] })
    const check = usePermissionsStore.getState().checkPermission
    expect(check(adminUser, 'content:home:edit')).toBe(true)
    expect(check(adminUser, 'users:all:delete')).toBe(false)
  })

  it('super_admin always passes checkPermission', () => {
    usePermissionsStore.getState().setRolePermissions({ admin: [] })
    const superAdmin = { ...adminUser, role: 'super_admin' as const }
    const check = usePermissionsStore.getState().checkPermission
    expect(check(superAdmin, 'users:all:delete')).toBe(true)
  })

  it('inactive user is denied', () => {
    usePermissionsStore.getState().setRolePermissions({ admin: ['content:home:edit'] })
    const check = usePermissionsStore.getState().checkPermission
    expect(check({ ...adminUser, isActive: false }, 'content:home:edit')).toBe(false)
  })
})
