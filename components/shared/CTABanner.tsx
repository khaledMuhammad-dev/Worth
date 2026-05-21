'use client';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export function CTABanner() {
  const { t } = useTranslation();
  return (
    <section className="bg-[#F97316] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
        <div className="max-w-xl">
          <h2
            className="text-white font-bold heading-m"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('cta.title')}{' '}
            <span className="underline decoration-white/50 underline-offset-4">
              {t('cta.titleAccent')}
            </span>
          </h2>
          <p className="text-white/80 mt-2 leading-relaxed">{t('cta.subtitle')}</p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center justify-center font-semibold rounded-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#F97316] transition-all duration-200 whitespace-nowrap"
        >
          {t('cta.button')}
        </Link>
      </div>
    </section>
  );
}
