'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import i18n from '@/lib/i18n';
import { useHydrated, usePrefersReducedMotion } from '@/lib/motion';

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [lang, setLang] = useState(() => i18n.language?.slice(0, 2) || 'en');
  const hydrated = useHydrated();
  const prefersReduced = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0.7)', 'rgba(255,255,255,1)']);
  const navShadow = useTransform(scrollY, [0, 60], ['0 0 0 rgba(0,0,0,0)', '0 2px 20px rgba(0,0,0,0.08)']);

  useEffect(() => {
    const syncLang = (lng: string) => setLang(lng.slice(0, 2));
    i18n.on('languageChanged', syncLang);
    return () => i18n.off('languageChanged', syncLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('i18nextLng', newLang);
    window.location.reload();
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/work', label: t('nav.work') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      initial={prefersReduced ? false : { y: -80, opacity: 0 }}
      animate={prefersReduced ? undefined : { y: 0, opacity: 1 }}
      transition={prefersReduced ? undefined : { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: hydrated && !prefersReduced ? navBg : 'rgba(255,255,255,1)',
        boxShadow: hydrated && !prefersReduced ? navShadow : 'none',
      }}
      className="sticky top-0 z-50 border-b border-[#F0F0F0]/80 backdrop-blur-sm"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-baseline gap-0.5" dir="ltr">
          <motion.span
            whileHover={prefersReduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer text-2xl font-bold text-[#F97316]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Worth
          </motion.span>
          <span className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
            .
          </span>
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              {isActive(link.href) &&
                (prefersReduced ? (
                  <div className="absolute inset-0 rounded-lg bg-[#FFF4EE]" />
                ) : (
                  <motion.div
                    layoutId="activeLink"
                    className="absolute inset-0 rounded-lg bg-[#FFF4EE]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ))}
              <Link
                href={link.href}
                className={`nav-link-underline relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive(link.href) ? 'text-[#F97316]' : 'text-[#6B7280] hover:text-[#1A1A2E]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-[#6B7280] transition-colors hover:bg-[#FFF4EE] hover:text-[#F97316]"
          >
            <span className={lang === 'en' ? 'text-[#F97316]' : ''}>EN</span>
            <span className="text-[#D1D5DB]">|</span>
            <span className={lang === 'ar' ? 'text-[#F97316]' : ''}>AR</span>
          </button>
          <motion.div whileHover={prefersReduced ? undefined : { scale: 1.04 }} whileTap={prefersReduced ? undefined : { scale: 0.97 }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#F97316] px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#EA6C00]"
              data-cursor="hover"
            >
              {t('nav.getStarted')}
            </Link>
          </motion.div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              whileTap={prefersReduced ? undefined : { scale: 0.92 }}
              className="-mr-1 rounded-lg p-2 text-[#6B7280] transition-colors hover:bg-[#F9FAFB] hover:text-[#1A1A2E] lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <span dir="ltr" className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold text-[#F97316]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Worth
                  </span>
                  <span className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
                    .
                  </span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-1 px-4">
              {navLinks.map((link, index) => (
                <SheetClose asChild key={link.href}>
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                    animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                    transition={prefersReduced ? undefined : { delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        isActive(link.href) ? 'bg-[#FFF4EE] text-[#F97316]' : 'text-[#1A1A2E] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </SheetClose>
              ))}
              <div className="mt-6 flex flex-col gap-3 border-t border-[#F0F0F0] pt-6">
                <button
                  onClick={toggleLang}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#F0F0F0] px-3 py-3 text-sm font-semibold text-[#6B7280] transition-colors hover:border-[#F97316] hover:text-[#F97316]"
                >
                  <span className={lang === 'en' ? 'text-[#F97316]' : ''}>EN</span>
                  <span className="text-[#D1D5DB]">|</span>
                  <span className={lang === 'ar' ? 'text-[#F97316]' : ''}>AR</span>
                </button>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center rounded-lg bg-[#F97316] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#EA6C00]"
                  >
                    {t('nav.getStarted')}
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
