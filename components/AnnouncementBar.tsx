'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import announcementsData from '@/content/data/announcements.json'

interface Announcement {
  id: string
  active: boolean
  priority: number
  messageEN: string
  messageAR: string
  ctaLabelEN: string
  ctaLabelAR: string
  ctaHref: string
  bgColor: string
  textColor: string
  emoji: string
  startDate: string
  expiryDate: string
  dismissible: boolean
}

export default function AnnouncementBar() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const [dismissed, setDismissed] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem('worth_dismissed_announcements')
    return stored ? JSON.parse(stored) : []
  })
  const [isRTL] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.dir === 'rtl'
  })

  const current = useMemo(() => {
    if (!mounted) return null
    const now = new Date()

    return (
      (announcementsData as Announcement[])
        .filter(
          (item) =>
            item.active &&
            new Date(item.startDate) <= now &&
            new Date(item.expiryDate) >= now &&
            !dismissed.includes(item.id)
        )
        .sort((a, b) => a.priority - b.priority)[0] ?? null
    )
  }, [dismissed, mounted])

  const handleDismiss = () => {
    if (!current) return
    const updated = [...dismissed, current.id]
    setDismissed(updated)
    localStorage.setItem('worth_dismissed_announcements', JSON.stringify(updated))
  }

  if (!mounted || !current) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ backgroundColor: current.bgColor, color: current.textColor }}
        className="overflow-hidden"
      >
        <div className={`mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 text-center sm:px-6 lg:px-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="shrink-0 text-lg">{current.emoji}</span>
          <span className="flex-1 text-sm font-medium">{isRTL ? current.messageAR : current.messageEN}</span>
          <Link
            href={current.ctaHref}
            className="shrink-0 rounded border px-3 py-1 text-xs font-semibold transition hover:bg-white/10"
            style={{ borderColor: current.textColor, color: current.textColor }}
          >
            {isRTL ? current.ctaLabelAR : current.ctaLabelEN}
          </Link>
          {current.dismissible ? (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="shrink-0 transition hover:opacity-70"
              style={{ color: current.textColor }}
            >
              <X size={16} />
            </button>
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
