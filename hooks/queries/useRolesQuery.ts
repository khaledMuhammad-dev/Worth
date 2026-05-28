'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { usePermissionsStore } from '@/stores/permissions.store'

export function useRolesQuery() {
  const setRolePermissions = usePermissionsStore((s) => s.setRolePermissions)

  const query = useQuery({
    queryKey: queryKeys.roles.list(),
    queryFn: async () => {
      const res = await authFetch('/api/admin/roles')
      if (!res.ok) throw new Error('Failed to fetch roles')
      return res.json() as Promise<Record<string, {
        id: string
        name: string
        description: string
        permissions: string[]
        isSystem: boolean
      }>>
    },
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (query.data) {
      const permMap: Record<string, string[]> = {}
      for (const [roleId, role] of Object.entries(query.data)) {
        permMap[roleId] = role.permissions
      }
      setRolePermissions(permMap)
    }
  }, [query.data, setRolePermissions])

  return query
}
