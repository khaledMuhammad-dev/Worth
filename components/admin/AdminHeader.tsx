'use client'

import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '@/components/ThemeToggle'
import AdminLangSwitcher from './AdminLangSwitcher'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  onSave?: () => void
  saving?: boolean
}

export default function AdminHeader({ title, subtitle, onSave, saving }: AdminHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 dark:border-sop-border dark:bg-sop-overlay">
      <div>
        <h1 className="text-lg font-semibold text-foreground dark:text-sop-foreground">{title}</h1>
        {subtitle ? <p className="text-sm text-muted dark:text-sop-muted">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="px-2">
          <AdminLangSwitcher />
        </div>
        {onSave ? (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-60 dark:shadow-sop-orange dark:hover:shadow-[0_0_24px_rgba(249,115,22,0.5)]"
          >
            {saving ? t('admin.header.saving') : t('admin.header.saveChanges')}
          </button>
        ) : null}
      </div>
    </div>
  )
}
