'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

const groups = [
  {
    label: 'CONTENT',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Announcements', href: '/admin/announcement', icon: Megaphone },
      { label: 'Home Page', href: '/admin/home', icon: Home },
      { label: 'About Page', href: '/admin/about', icon: Info },
      { label: 'Services', href: '/admin/services', icon: Briefcase },
      { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
      { label: 'Work / Portfolio', href: '/admin/work', icon: FolderOpen },
      { label: 'Contact', href: '/admin/contact', icon: Phone },
    ],
  },
  {
    label: 'BLOG',
    items: [
      { label: 'All Articles', href: '/admin/blog', icon: BookOpen },
      { label: 'New Article', href: '/admin/blog/new', icon: PlusCircle },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { label: 'Navigation', href: '/admin/navigation', icon: Navigation },
      { label: 'Site Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <aside className="flex min-h-screen w-60 flex-col border-e border-gray-100 bg-white">
      <div className="border-b border-gray-100 px-6 py-5">
        <span className="text-xl font-bold text-foreground">
          Worth <span className="text-primary">CMS</span>
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? 'border-e-2 border-primary bg-orange-50 font-medium text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-gray-100 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}
