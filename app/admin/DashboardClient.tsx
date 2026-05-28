'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CheckCircle, FileText, LayoutDashboard, Megaphone } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'

interface FileStat {
  name: string
  mtime: string
}

interface DashboardClientProps {
  totalArticles: number
  published: number
  drafts: number
  activeAnnouncements: number
  fileStats: FileStat[]
}

export default function DashboardClient({
  totalArticles,
  published,
  drafts,
  activeAnnouncements,
  fileStats,
}: DashboardClientProps) {
  const { t } = useTranslation()

  const stats = [
    { labelKey: 'totalArticles', value: totalArticles, icon: FileText, color: 'bg-sky-50 text-sky-600' },
    { labelKey: 'published', value: published, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { labelKey: 'drafts', value: drafts, icon: LayoutDashboard, color: 'bg-gray-50 text-gray-600' },
    { labelKey: 'activeAnnouncements', value: activeAnnouncements, icon: Megaphone, color: 'bg-orange-50 text-primary' },
  ]

  const quickActions = [
    { labelKey: 'editHomePage', href: '/admin/home' },
    { labelKey: 'manageAnnouncements', href: '/admin/announcement' },
    { labelKey: 'newBlogArticle', href: '/admin/blog/new' },
    { labelKey: 'editPricing', href: '/admin/pricing' },
    { labelKey: 'editNavigation', href: '/admin/navigation' },
    { labelKey: 'siteSettings', href: '/admin/settings' },
  ]

  return (
    <div>
      <AdminHeader title={t('admin.dashboard.title')} subtitle={t('admin.dashboard.subtitle')} />
      <div className="space-y-8 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 dark:border-sop-border dark:bg-sop-overlay dark:shadow-sop-card">
              <div className={`rounded-xl p-3 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground dark:text-sop-foreground">{stat.value}</p>
                <p className="text-sm text-muted dark:text-sop-muted">{t(`admin.dashboard.${stat.labelKey}`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-foreground dark:text-sop-foreground">{t('admin.dashboard.quickActions')}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-foreground transition hover:border-primary hover:text-primary dark:border-sop-border dark:bg-sop-overlay dark:text-sop-foreground dark:hover:border-sop-purple dark:hover:text-sop-purple"
              >
                {t(`admin.dashboard.${action.labelKey}`)}
                <ArrowRight size={14} className="opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-foreground dark:text-sop-foreground">{t('admin.dashboard.contentFiles')}</h2>
          <div className="divide-y divide-gray-50 rounded-xl border border-gray-100 bg-white dark:divide-sop-border dark:border-sop-border dark:bg-sop-overlay">
            {fileStats.map((file) => (
              <div key={file.name} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-foreground dark:text-sop-foreground">{file.name}.json</span>
                <span className="text-muted dark:text-sop-muted">{t('admin.dashboard.lastUpdated')} {file.mtime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
