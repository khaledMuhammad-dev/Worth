'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AdminLangSwitcher from '@/components/admin/AdminLangSwitcher'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      router.push('/admin')
    } else {
      setError(t('admin.login.incorrectPassword'))
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1A2E] p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-end">
          <AdminLangSwitcher />
        </div>
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-[#1A1A2E]">
            Worth <span className="text-primary">CMS</span>
          </span>
          <p className="mt-1 text-sm text-muted">{t('admin.login.adminPanel')}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('admin.login.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition focus:border-primary focus:outline-none"
              placeholder={t('admin.login.enterPassword')}
              required
            />
          </div>
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? t('admin.login.signingIn') : t('admin.login.signIn')}
          </button>
        </form>
      </div>
    </div>
  )
}
