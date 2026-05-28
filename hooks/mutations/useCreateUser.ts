'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { useAddToast } from '@/stores/ui.store'
import type { CreateUserInput } from '@/schemas/user.schema'

export function useCreateUser() {
  const queryClient = useQueryClient()
  const addToast = useAddToast()

  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      const res = await authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message ?? 'Failed to create user')
      }
      return res.json()
    },

    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      queryClient.setQueryData(queryKeys.users.detail(newUser.uid), newUser)
      addToast({ type: 'success', title: 'User created successfully' })
    },

    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Failed to create user',
        description: error.message,
      })
    },
  })
}
