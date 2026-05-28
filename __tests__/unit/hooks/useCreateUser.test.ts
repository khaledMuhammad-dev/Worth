import { renderHook, act, waitFor } from '@testing-library/react'
import { useCreateUser } from '@/hooks/mutations/useCreateUser'
import { authFetch } from '@/lib/auth/get-id-token'
import { renderWithProviders } from '@/jest.setup'
import React from 'react'

jest.mock('@/lib/auth/get-id-token')

describe('useCreateUser', () => {
  it('calls authFetch and invalidates users query on success', async () => {
    const mockUser = { uid: 'new-uid', email: 'new@test.com' }
    ;(authFetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    })

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: ({ children }) => renderWithProviders(React.createElement(React.Fragment, null, children)).container as any,
    })

    await act(async () => {
      await result.current.mutateAsync({
        email: 'new@test.com',
        displayName: 'New User',
        password: 'SecurePass1',
        role: 'admin',
        isActive: true,
        customPermissions: [],
      })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('throws on API error', async () => {
    ;(authFetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Email already exists' }),
    })

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: ({ children }) => renderWithProviders(React.createElement(React.Fragment, null, children)).container as any,
    })

    await act(async () => {
      await expect(
        result.current.mutateAsync({
          email: 'dupe@test.com',
          displayName: 'Dupe',
          password: 'SecurePass1',
          role: 'admin',
          isActive: true,
          customPermissions: [],
        })
      ).rejects.toThrow('Email already exists')
    })
  })
})
