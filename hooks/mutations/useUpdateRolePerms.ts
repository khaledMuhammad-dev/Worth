'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { usePermissionsStore } from '@/stores/permissions.store'
import { useAddToast } from '@/stores/ui.store'

interface UpdateRolePermsInput {
  roleId: string
  permissions: string[]
}

export function useUpdateRolePerms() {
  const queryClient = useQueryClient()
  const addToast = useAddToast()
  const updateRolePermission = usePermissionsStore((s) => s.updateRolePermission)

  return useMutation({
    mutationFn: async ({ roleId, permissions }: UpdateRolePermsInput) => {
      const res = await authFetch('/api/admin/roles', {
        method: 'PUT',
        body: JSON.stringify({ roleId, permissions }),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message ?? 'Failed to update permissions')
      }
      return res.json()
    },

    onMutate: async ({ roleId, permissions }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.roles.list() })
      const previousRoles = queryClient.getQueryData(queryKeys.roles.list())

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(queryKeys.roles.list(), (old: any) => {
        if (!old) return old
        return { ...old, [roleId]: { ...old[roleId], permissions } }
      })

      const permissionsStore = usePermissionsStore.getState()
      const currentPerms = permissionsStore.rolePermissions[roleId] ?? []
      permissions.forEach((perm) => {
        if (!currentPerms.includes(perm)) {
          updateRolePermission(roleId, perm, true)
        }
      })
      currentPerms.forEach((perm) => {
        if (!permissions.includes(perm)) {
          updateRolePermission(roleId, perm, false)
        }
      })

      return { previousRoles }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.list() })
      addToast({ type: 'success', title: 'Permissions updated' })
    },

    onError: (error: Error, _vars, context) => {
      if (context?.previousRoles) {
        queryClient.setQueryData(queryKeys.roles.list(), context.previousRoles)
      }
      addToast({
        type: 'error',
        title: 'Failed to update permissions',
        description: error.message,
      })
    },
  })
}
