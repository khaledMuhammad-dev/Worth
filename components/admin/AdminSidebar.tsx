'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  BookOpen,
  Briefcase,
  DollarSign,
  FolderOpen,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Navigation,
  Phone,
  PlusCircle,
  Settings,
} from 'lucide-react'
import AdminLangSwitcher from './AdminLangSwitcher'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  const groups = [
    {
      key: 'contentGroup',
      items: [
        { key: 'dashboard', href: '/admin', icon: LayoutDashboard },
        { key: 'announcements', href: '/admin/announcement', icon: Megaphone },
        { key: 'homePage', href: '/admin/home', icon: Home },
        { key: 'aboutPage', href: '/admin/about', icon: Info },
        { key: 'services', href: '/admin/services', icon: Briefcase },
        { key: 'pricing', href: '/admin/pricing', icon: DollarSign },
        { key: 'work', href: '/admin/work', icon: FolderOpen },
        { key: 'contact', href: '/admin/contact', icon: Phone },
      ],
    },
    {
      key: 'blogGroup',
      items: [
        { key: 'allArticles', href: '/admin/blog', icon: BookOpen },
        { key: 'newArticle', href: '/admin/blog/new', icon: PlusCircle },
      ],
    },
    {
      key: 'settingsGroup',
      items: [
        { key: 'navigation', href: '/admin/navigation', icon: Navigation },
        { key: 'siteSettings', href: '/admin/settings', icon: Settings },
      ],
    },
  ]

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <aside className="flex min-h-screen w-60 flex-col border-e border-gray-100 bg-white dark:border-sop-border dark:bg-sop-overlay">
      <div className="border-b border-gray-100 px-6 py-5 dark:border-sop-border">
        <span className="text-xl font-bold text-foreground dark:text-sop-foreground">
          Worth <span className="text-primary">CMS</span>
        </span>
      </div>
      <nav className="max-h-[calc(100%-70px-179px)] overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.key} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-sop-subtle">
              {t(`admin.sidebar.${group.key}`)}
            </p>
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? 'border-e-2 border-primary bg-orange-50 font-medium text-primary dark:border-sop-purple dark:bg-sop-purple/15 dark:text-sop-purple'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-sop-muted dark:hover:bg-sop-hover dark:hover:text-sop-foreground'
                  }`}
                >
                  <item.icon size={16} />
                  {t(`admin.sidebar.${item.key}`)}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <div className="space-y-2 border-t border-gray-100 p-3 dark:border-sop-border">
     
     
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-500 dark:text-sop-pink dark:hover:bg-sop-pink/10 dark:hover:text-sop-pink"
        >
          <LogOut size={16} />
          {t('admin.sidebar.logout')}
        </button>
      </div>
    </aside>
  )
}
