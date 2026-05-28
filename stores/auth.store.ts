import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { AdminUser } from '@/lib/rbac/types'

interface AuthState {
  user: AdminUser | null
  idToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthActions {
  setUser: (user: AdminUser | null) => void
  setIdToken: (token: string | null) => void
  setIsLoading: (loading: boolean) => void
  logout: () => void
  updateUser: (updates: Partial<AdminUser>) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set) => ({
      user: null,
      idToken: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set((state) => {
          state.user = user
          state.isAuthenticated = !!user
          state.isLoading = false
        }),

      setIdToken: (token) =>
        set((state) => {
          state.idToken = token
        }),

      setIsLoading: (loading) =>
        set((state) => {
          state.isLoading = loading
        }),

      logout: () =>
        set((state) => {
          state.user = null
          state.idToken = null
          state.isAuthenticated = false
          state.isLoading = false
        }),

      updateUser: (updates) =>
        set((state) => {
          if (state.user) {
            Object.assign(state.user, updates)
          }
        }),
    })),
    {
      name: 'worth-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export const useCurrentUser = () => useAuthStore((s) => s.user)
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated)
export const useAuthLoading = () => useAuthStore((s) => s.isLoading)
export const useIdToken = () => useAuthStore((s) => s.idToken)
