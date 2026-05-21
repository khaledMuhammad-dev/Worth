'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import i18n from '@/lib/i18n';

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState(() => i18n.language?.slice(0, 2) || 'en');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const syncLang = (lng: string) => setLang(lng.slice(0, 2));
    i18n.on('languageChanged', syncLang);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      i18n.off('languageChanged', syncLang);
    };
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', newLang);
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
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'border-b border-[#F0F0F0]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo — always reads left-to-right */}
        <Link href="/" className="shrink-0 flex items-baseline gap-0.5" dir="ltr">
          <span
            className="text-2xl font-bold text-[#F97316]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Worth
          </span>
          <span className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
            .
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? 'text-[#F97316]'
                    : 'text-[#6B7280] hover:text-[#1A1A2E] hover:bg-[#F9FAFB]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Language toggle: EN | AR */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm font-semibold text-[#6B7280] hover:text-[#F97316] transition-colors px-2 py-1 rounded-md hover:bg-[#FFF4EE]"
            aria-label="Switch language"
          >
            <span className={lang === 'en' ? 'text-[#F97316]' : ''}>EN</span>
            <span className="text-[#D1D5DB]">|</span>
            <span className={lang === 'ar' ? 'text-[#F97316]' : ''}>AR</span>
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold rounded-lg px-5 py-2 text-sm transition-colors duration-200"
          >
            {t('nav.getStarted')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="lg:hidden p-2 -mr-1 text-[#6B7280] hover:text-[#1A1A2E] hover:bg-[#F9FAFB] rounded-lg transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <span dir="ltr" className="flex items-baseline gap-0.5">
                  <span
                    className="text-2xl font-bold text-[#F97316]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Worth
                  </span>
                  <span className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
                    .
                  </span>
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-4 mt-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center px-3 py-3 rounded-lg font-medium transition-colors text-base ${
                      isActive(link.href)
                        ? 'text-[#F97316] bg-[#FFF4EE]'
                        : 'text-[#1A1A2E] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}

              <div className="mt-6 pt-6 border-t border-[#F0F0F0] flex flex-col gap-3">
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-lg border border-[#F0F0F0] text-sm font-semibold text-[#6B7280] hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  <span className={lang === 'en' ? 'text-[#F97316]' : ''}>EN</span>
                  <span className="text-[#D1D5DB]">|</span>
                  <span className={lang === 'ar' ? 'text-[#F97316]' : ''}>AR</span>
                </button>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold rounded-lg px-6 py-3 text-base transition-colors"
                  >
                    {t('nav.getStarted')}
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
