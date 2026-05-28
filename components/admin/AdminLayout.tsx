'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en'
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-sop-bg">
      <AdminSidebar />
      <main className="flex-1 overflow-auto dark:bg-sop-bg">{children}</main>
    </div>
  )
}
