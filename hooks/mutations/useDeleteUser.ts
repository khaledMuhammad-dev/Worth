'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { useAddToast } from '@/stores/ui.store'

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const addToast = useAddToast()

  return useMutation({
    mutationFn: async (uid: string) => {
      const res = await authFetch(`/api/admin/users/${uid}`, { method: 'DELETE' })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message ?? 'Failed to delete user')
      }
    },

    onMutate: async (uid) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.lists() })
      const previousLists = queryClient.getQueriesData({
        queryKey: queryKeys.users.lists(),
      })
      queryClient.setQueriesData(
        { queryKey: queryKeys.users.lists() },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (old: any) => old
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? { ...old, users: old.users.filter((u: any) => u.uid !== uid) }
          : old
      )
      return { previousLists }
    },

    onSuccess: (_data, uid) => {
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(uid) })
      addToast({ type: 'success', title: 'User deleted successfully' })
    },

    onError: (error: Error, _uid, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      }
      addToast({
        type: 'error',
        title: 'Failed to delete user',
        description: error.message,
      })
    },
  })
}
