'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { useAnnouncementsStore } from '@/stores/announcements.store'

export function useAnnouncementsQuery(filters?: { activeOnly?: boolean }) {
  const { dismissedIds, setCurrentAnnouncement } = useAnnouncementsStore()

  const query = useQuery({
    queryKey: queryKeys.announcements.list(filters),
    queryFn: async () => {
      const params = filters?.activeOnly ? '?active=true' : ''
      const res = await authFetch(`/api/admin/announcements${params}`)
      if (!res.ok) throw new Error('Failed to fetch announcements')
      return res.json()
    },
  })

  useEffect(() => {
    if (query.data) {
      const now = new Date()
      const active = query.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((a: any) =>
          a.active &&
          new Date(a.startDate) <= now &&
          new Date(a.expiryDate) >= now &&
          !dismissedIds.includes(a.id)
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .sort((a: any, b: any) => a.priority - b.priority)
      setCurrentAnnouncement(active[0]?.id ?? null)
    }
  }, [query.data, dismissedIds, setCurrentAnnouncement])

  return query
}
