'use client'

import { usePathname } from 'next/navigation'
import AnnouncementBar from './AnnouncementBar'
import type { Announcement } from '@/lib/types/content'

interface Props {
  children: React.ReactNode
  announcements: Announcement[]
}

export default function PublicLayout({ children, announcements }: Props) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <>
      <AnnouncementBar announcements={announcements} />
      {children}
    </>
  )
}
