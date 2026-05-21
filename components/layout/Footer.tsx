'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Globe, Send, Hash, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

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
    <footer className="bg-[#F97316]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid — logo/tagline col + 3 link cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo always reads LTR */}
            <Link href="/" className="inline-flex items-baseline gap-0.5 mb-5" dir="ltr">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Worth
              </span>
              <span className="text-2xl font-bold text-white/50" style={{ fontFamily: 'var(--font-heading)' }}>
                .
              </span>
            </Link>
            <p className="text-white/75 leading-relaxed text-sm mb-6 max-w-xs">
              {t('footer.tagline')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-150 hover:underline underline-offset-2"
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

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              {t('footer.links.privacy')}
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              {t('footer.links.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
