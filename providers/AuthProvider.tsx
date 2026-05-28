'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { useAuthStore } from '@/stores/auth.store'
import { authFetch } from '@/lib/auth/get-id-token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setIsLoading, logout } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        logout()
        return
      }
      try {
        const res = await authFetch(`/api/admin/users/${firebaseUser.uid}`)
        if (res.ok) {
          const user = await res.json()
          setUser(user)
        } else {
          logout()
        }
      } catch {
        setIsLoading(false)
      }
    })
    return () => unsubscribe()
  }, [setUser, setIsLoading, logout])

  return <>{children}</>
}
