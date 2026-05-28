'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { useAddToast } from '@/stores/ui.store'
import type { UpdateUserInput } from '@/schemas/user.schema'

export function useUpdateUser(uid: string) {
  const queryClient = useQueryClient()
  const addToast = useAddToast()

  return useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const res = await authFetch(`/api/admin/users/${uid}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message ?? 'Failed to update user')
      }
      return res.json()
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(uid) })
      const previousUser = queryClient.getQueryData(queryKeys.users.detail(uid))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(queryKeys.users.detail(uid), (old: any) => ({
        ...old,
        ...newData,
      }))
      return { previousUser }
    },

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.users.detail(uid), updatedUser)
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      addToast({ type: 'success', title: 'User updated successfully' })
    },

    onError: (error: Error, _data, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(queryKeys.users.detail(uid), context.previousUser)
      }
      addToast({
        type: 'error',
        title: 'Failed to update user',
        description: error.message,
      })
    },
  })
}
