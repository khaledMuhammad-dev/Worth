'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative mx-auto mb-12 flex h-64 w-64 items-center justify-center rounded-full bg-[#FFF4EE]">
              <div className="absolute h-48 w-48 rounded-full border border-dashed border-[#F97316]/30" />
              <div className="absolute h-32 w-32 rounded-full bg-[#F97316]/10" />
              <div className="relative text-7xl font-bold text-[#F97316]" style={{ fontFamily: 'var(--font-heading)' }}>404</div>
              <span className="absolute left-10 top-12 h-3 w-3 rounded-full bg-[#F97316]/40" />
              <span className="absolute right-12 bottom-16 h-4 w-4 rounded-full bg-[#F97316]/20" />
              <span className="absolute bottom-10 left-20 h-2 w-2 rounded-full bg-[#F97316]/50" />
            </div>
            <h1 className="heading-l text-[#1A1A2E]">{t('notFound.title')}</h1>
            <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto">{t('notFound.subtitle')}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('notFound.button')}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
