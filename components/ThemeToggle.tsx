'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) {
    return <div className="h-9 w-9 animate-pulse rounded-lg bg-surface dark:bg-sop-elevated" />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#F0F0F0] bg-surface transition-all duration-200 hover:bg-border-custom/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-sop-border dark:bg-sop-elevated dark:hover:bg-sop-border"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute"
          >
            <Sun size={17} className="text-sop-highlight" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute"
          >
            <Moon size={17} className="text-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
