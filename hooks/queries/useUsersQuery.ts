'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import type { AdminUser } from '@/lib/rbac/types'

interface UserFilters extends Record<string, unknown> {
  role?: string
  isActive?: boolean
  search?: string
  page?: number
  limit?: number
}

async function fetchUsers(filters: UserFilters): Promise<{
  users: AdminUser[]
  total: number
  page: number
  totalPages: number
}> {
  const params = new URLSearchParams()
  if (filters.role) params.set('role', filters.role)
  if (filters.isActive !== undefined) params.set('isActive', String(filters.isActive))
  if (filters.search) params.set('search', filters.search)
  if (filters.page) params.set('page', String(filters.page))
  if (filters.limit) params.set('limit', String(filters.limit))

  const res = await authFetch(`/api/admin/users?${params}`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export function useUsersQuery(filters: UserFilters = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: () => fetchUsers(filters),
    placeholderData: (prev) => prev,
  })
}

export function useUserQuery(uid: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(uid),
    queryFn: async () => {
      const res = await authFetch(`/api/admin/users/${uid}`)
      if (!res.ok) throw new Error('User not found')
      return res.json() as Promise<AdminUser>
    },
    enabled: !!uid,
  })
}
