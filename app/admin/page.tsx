import fs from 'fs'
import path from 'path'
import DashboardClient from './DashboardClient'

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

  return (
    <DashboardClient
      totalArticles={blogMeta.length}
      published={published}
      drafts={drafts}
      activeAnnouncements={activeAnnouncements}
      fileStats={fileStats}
    />
  )
}
