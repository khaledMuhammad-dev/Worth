'use client'

import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import AdminLangSwitcher from './AdminLangSwitcher'
import { useUIStore } from '@/stores/ui.store'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  onSave?: () => void
  saving?: boolean
}

export default function AdminHeader({ title, subtitle, onSave, saving }: AdminHeaderProps) {
  const { t } = useTranslation()
  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar)

  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-4 dark:border-sop-border dark:bg-sop-surface sm:px-6">
      {/* Hamburger – mobile only */}
      <button
        type="button"
        onClick={toggleMobileSidebar}
        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-sop-muted dark:hover:bg-sop-hover lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold text-foreground dark:text-sop-foreground sm:text-lg">{title}</h1>
        {subtitle ? <p className="truncate text-xs text-muted dark:text-sop-muted sm:text-sm">{subtitle}</p> : null}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <div className="hidden sm:block">
          <AdminLangSwitcher />
        </div>
        {onSave ? (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white transition hover:bg-orange-600 disabled:opacity-60 dark:shadow-sop-orange dark:hover:shadow-[0_0_24px_rgba(249,115,22,0.5)] sm:px-6 sm:text-sm"
          >
            {saving ? t('admin.header.saving') : t('admin.header.saveChanges')}
          </button>
        ) : null}
      </div>
    </div>
  )
}
