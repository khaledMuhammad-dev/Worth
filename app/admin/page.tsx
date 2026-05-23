import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowRight, CheckCircle, FileText, LayoutDashboard, Megaphone } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'

interface BlogMeta {
  slug: string
  status: string
}

interface Announcement {
  active: boolean
  startDate: string
  expiryDate: string
}

function getFileStats() {
  const dataDir = path.join(process.cwd(), 'content/data')
  const files = ['home', 'about', 'services', 'pricing', 'work', 'contact', 'announcements', 'navigation', 'blog-meta', 'settings']

  return files.map((name) => {
    const filePath = path.join(dataDir, `${name}.json`)
    try {
      const stat = fs.statSync(filePath)
      return { name, mtime: stat.mtime.toLocaleDateString() }
    } catch {
      return { name, mtime: 'Not found' }
    }
  })
}

export default function AdminDashboard() {
  const metaPath = path.join(process.cwd(), 'content/data', 'blog-meta.json')
  const announcementPath = path.join(process.cwd(), 'content/data', 'announcements.json')

  const blogMeta: BlogMeta[] = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : []
  const announcements: Announcement[] = fs.existsSync(announcementPath)
    ? JSON.parse(fs.readFileSync(announcementPath, 'utf8'))
    : []

  const now = new Date()
  const activeAnnouncements = announcements.filter(
    (announcement) =>
      announcement.active &&
      new Date(announcement.startDate) <= now &&
      new Date(announcement.expiryDate) >= now
  ).length
  const published = blogMeta.filter((entry) => entry.status === 'published').length
  const drafts = blogMeta.filter((entry) => entry.status === 'draft').length
  const fileStats = getFileStats()

  const stats = [
    { label: 'Total Articles', value: blogMeta.length, icon: FileText, color: 'bg-sky-50 text-sky-600' },
    { label: 'Published', value: published, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Drafts', value: drafts, icon: LayoutDashboard, color: 'bg-gray-50 text-gray-600' },
    { label: 'Active Announcements', value: activeAnnouncements, icon: Megaphone, color: 'bg-orange-50 text-primary' },
  ]

  const quickActions = [
    { label: 'Edit Home Page', href: '/admin/home' },
    { label: 'Manage Announcements', href: '/admin/announcement' },
    { label: 'New Blog Article', href: '/admin/blog/new' },
    { label: 'Edit Pricing', href: '/admin/pricing' },
    { label: 'Edit Navigation', href: '/admin/navigation' },
    { label: 'Site Settings', href: '/admin/settings' },
  ]

  return (
    <div>
      <AdminHeader title="Dashboard" subtitle="Overview of your content" />
      <div className="space-y-8 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5">
              <div className={`rounded-xl p-3 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-foreground transition hover:border-primary hover:text-primary"
              >
                {action.label}
                <ArrowRight size={14} className="opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-foreground">Content Files</h2>
          <div className="divide-y divide-gray-50 rounded-xl border border-gray-100 bg-white">
            {fileStats.map((file) => (
              <div key={file.name} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-foreground">{file.name}.json</span>
                <span className="text-muted">Last updated: {file.mtime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
