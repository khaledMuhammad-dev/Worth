'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'
import { useMobileSidebarOpen, useUIStore } from '@/stores/ui.store'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { i18n } = useTranslation()
  const mobileSidebarOpen = useMobileSidebarOpen()
  const setMobileSidebarOpen = useUIStore((s) => s.setMobileSidebarOpen)

  useEffect(() => {
    const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en'
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [pathname, setMobileSidebarOpen])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="admin-layout flex min-h-screen bg-gray-50 dark:bg-sop-bg">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 start-0 z-30 transition-transform duration-300 lg:static lg:translate-x-0 lg:rtl:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 rtl:translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}
      >
        <AdminSidebar />
      </div>

      <main className="flex-1 overflow-auto dark:bg-sop-bg min-w-0">{children}</main>
    </div>
  )
}
