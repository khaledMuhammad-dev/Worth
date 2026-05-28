import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { hasPermission } from '@/lib/rbac/has-permission'
import type { AdminUser, Permission } from '@/lib/rbac/types'

interface PermissionsState {
  rolePermissions: Record<string, string[]>
  isLoaded: boolean
}

interface PermissionsActions {
  setRolePermissions: (permissions: Record<string, string[]>) => void
  updateRolePermission: (role: string, permission: string, granted: boolean) => void
  checkPermission: (user: AdminUser | null, permission: Permission) => boolean
  reset: () => void
}

export const usePermissionsStore = create<PermissionsState & PermissionsActions>()(
  immer((set, get) => ({
    rolePermissions: {},
    isLoaded: false,

    setRolePermissions: (permissions) =>
      set((state) => {
        state.rolePermissions = permissions
        state.isLoaded = true
      }),

    updateRolePermission: (role, permission, granted) =>
      set((state) => {
        if (!state.rolePermissions[role]) {
          state.rolePermissions[role] = []
        }
        if (granted) {
          if (!state.rolePermissions[role].includes(permission)) {
            state.rolePermissions[role].push(permission)
          }
        } else {
          state.rolePermissions[role] = state.rolePermissions[role].filter(
            (p) => p !== permission
          )
        }
      }),

    checkPermission: (user, permission) => {
      if (!user) return false
      return hasPermission(user, permission, get().rolePermissions)
    },

    reset: () =>
      set((state) => {
        state.rolePermissions = {}
        state.isLoaded = false
      }),
  }))
)

export const useRolePermissions = () =>
  usePermissionsStore((s) => s.rolePermissions)
export const usePermissionsLoaded = () =>
  usePermissionsStore((s) => s.isLoaded)
export const useCheckPermission = () =>
  usePermissionsStore((s) => s.checkPermission)
