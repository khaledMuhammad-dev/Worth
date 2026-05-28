import { useAuthStore } from '@/stores/auth.store'

describe('auth.store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      idToken: null,
      isLoading: false,
      isAuthenticated: false,
    })
  })

  it('sets user and marks authenticated', () => {
    const user = {
      uid: '1',
      email: 'a@b.com',
      role: 'admin' as const,
      isActive: true,
      displayName: 'Test',
      photoURL: '',
      customPermissions: [],
      createdAt: '',
      updatedAt: '',
      lastLoginAt: '',
    }
    useAuthStore.getState().setUser(user)
    expect(useAuthStore.getState().user).toEqual(user)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('clears on logout', () => {
    useAuthStore.getState().setUser({ uid: '1' } as any)
    useAuthStore.getState().logout()
    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('sets isLoading', () => {
    useAuthStore.getState().setIsLoading(true)
    expect(useAuthStore.getState().isLoading).toBe(true)
  })

  it('updates user partially', () => {
    const user = { uid: '1', email: 'a@b.com', role: 'admin' as const, isActive: true } as any
    useAuthStore.getState().setUser(user)
    useAuthStore.getState().updateUser({ displayName: 'Updated' })
    expect(useAuthStore.getState().user?.displayName).toBe('Updated')
  })
})
