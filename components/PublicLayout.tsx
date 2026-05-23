'use client'

import { usePathname } from 'next/navigation'
import AnnouncementBar from './AnnouncementBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <>
      <AnnouncementBar />
      {children}
    </>
  )
}
