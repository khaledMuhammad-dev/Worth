'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'

export function useContentQuery<T>(page: string) {
  return useQuery({
    queryKey: queryKeys.content.page(page),
    queryFn: async () => {
      const res = await authFetch(`/api/admin/content/${page}`)
      if (!res.ok) throw new Error(`Failed to fetch ${page} content`)
      return res.json() as Promise<T>
    },
    staleTime: 2 * 60 * 1000,
  })
}
