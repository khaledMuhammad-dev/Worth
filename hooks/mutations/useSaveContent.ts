'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authFetch } from '@/lib/auth/get-id-token'
import { useAddToast, useUIStore } from '@/stores/ui.store'

export function useSaveContent(page: string) {
  const queryClient = useQueryClient()
  const addToast = useAddToast()
  const setUnsavedChanges = useUIStore((s) => s.setUnsavedChanges)

  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await authFetch(`/api/admin/save/${page}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message ?? 'Failed to save content')
      }
      return res.json()
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.content.page(page) })
      const previousData = queryClient.getQueryData(queryKeys.content.page(page))
      queryClient.setQueryData(queryKeys.content.page(page), newData)
      return { previousData }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.content.page(page) })
      setUnsavedChanges(page, false)
      addToast({ type: 'success', title: 'Content saved successfully' })
    },

    onError: (error: Error, _data, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.content.page(page), context.previousData)
      }
      addToast({
        type: 'error',
        title: 'Failed to save content',
        description: error.message,
      })
    },
  })
}
