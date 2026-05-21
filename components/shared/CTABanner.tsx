'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function CTABanner() {
  const { t } = useTranslation();
  const bannerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.cta-heading', '.cta-btn'],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-banner', start: 'top 85%' },
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(event.currentTarget, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced) return;
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <section ref={bannerRef} className="cta-banner cta-shimmer py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 md:flex-row md:text-start lg:px-8">
        <div className="cta-heading max-w-xl">
          <h2 className="heading-m font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('cta.title')}{' '}
            <span className="underline decoration-white/50 underline-offset-4">{t('cta.titleAccent')}</span>
          </h2>
          <p className="mt-2 leading-relaxed text-white/80">{t('cta.subtitle')}</p>
        </div>
        <Link
          ref={btnRef}
          href="/contact"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="cta-btn inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#F97316]"
          data-cursor="hover"
          style={{ willChange: 'transform' }}
        >
          {t('cta.button')}
        </Link>
      </div>
    </section>
  );
}
