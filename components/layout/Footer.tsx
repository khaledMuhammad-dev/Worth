'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Globe, Send, Hash, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/motion';

export function Footer() {
  const { t } = useTranslation();
  const prefersReduced = usePrefersReducedMotion();

  const companyLinks = [
    { href: '/about', label: t('footer.links.about') },
    { href: '/work', label: t('footer.links.work') },
    { href: '/about#team', label: t('footer.links.team') },
  ];

  const servicesLinks = [
    { href: '/services/marketing-media-buying', label: t('footer.links.marketing') },
    { href: '/services/brand-identity', label: t('footer.links.brand') },
    { href: '/services/motion-graphics', label: t('footer.links.motion') },
    { href: '/services/web-development', label: t('footer.links.web') },
  ];

  const resourceLinks = [
    { href: '/insights', label: t('footer.links.blog') },
    { href: '/work', label: t('footer.links.caseStudies') },
    { href: '/privacy', label: t('footer.links.privacy') },
    { href: '/terms', label: t('footer.links.terms') },
  ];

  const socials = [
    { Icon: Globe, href: '#', label: 'Website' },
    { Icon: Hash, href: '#', label: 'Instagram' },
    { Icon: Send, href: '#', label: 'Telegram' },
    { Icon: Mail, href: '#', label: 'Email' },
  ];

  const linkColumns = [
    { title: t('footer.company'), links: companyLinks },
    { title: t('footer.services'), links: servicesLinks },
    { title: t('footer.resources'), links: resourceLinks },
  ];

  return (
    <footer className="bg-[#F97316] dark:bg-sop-surface dark:border-t dark:border-sop-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <Link href="/" className="footer-logo mb-5 inline-flex items-baseline gap-0.5" dir="ltr">
              <span className="text-2xl font-bold text-white dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Worth
              </span>
              <span className="text-2xl font-bold text-white/50 dark:text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                .
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/75 dark:text-sop-muted">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={prefersReduced ? undefined : { scale: 1.2, rotate: 8 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/30 dark:bg-sop-elevated dark:text-sop-muted dark:hover:bg-sop-border dark:hover:text-sop-highlight"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {linkColumns.map(({ title, links }) => (
            <div key={title} className="footer-col">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white dark:text-sop-subtle">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 underline-offset-2 transition-colors duration-150 hover:text-white hover:underline dark:text-sop-muted dark:hover:text-sop-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15 dark:border-sop-border dark:bg-sop-bg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-white/60 dark:text-sop-subtle">{t('footer.copyright')}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-sm text-white/60 transition-colors hover:text-white dark:text-sop-subtle dark:hover:text-sop-foreground">
              {t('footer.links.privacy')}
            </Link>
            <Link href="/terms" className="text-sm text-white/60 transition-colors hover:text-white dark:text-sop-subtle dark:hover:text-sop-foreground">
              {t('footer.links.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
