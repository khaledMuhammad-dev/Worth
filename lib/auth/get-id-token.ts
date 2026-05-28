'use client'

import { auth } from '@/lib/firebase/client'
import { useAuthStore } from '@/stores/auth.store'

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser
  if (!user) return null
  const token = await user.getIdToken()
  useAuthStore.getState().setIdToken(token)
  return token
}

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getIdToken()
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}
