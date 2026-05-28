'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/motion';

interface CTABannerProps {
  title?: string;
  accent?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CTABanner({ title, accent, subtitle, buttonLabel, buttonHref = '/contact' }: CTABannerProps) {
  const { t } = useTranslation();
  const bannerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const prefersReduced = usePrefersReducedMotion();

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

  const resolvedTitle = title ?? t('cta.title');
  const resolvedAccent = accent ?? t('cta.titleAccent');
  const resolvedSubtitle = subtitle ?? t('cta.subtitle');
  const resolvedButton = buttonLabel ?? t('cta.button');

  return (
    <section ref={bannerRef} className="cta-banner cta-shimmer py-16 dark:[background:linear-gradient(90deg,#F97316,#EA6C00,#FF8C00,#F97316)] dark:bg-[length:200%_100%] dark:[animation:sop-shimmer_4s_ease_infinite]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 md:flex-row md:text-start lg:px-8">
        <div className="cta-heading max-w-xl">
          <h2 className="heading-m font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {resolvedTitle}{' '}
            {resolvedAccent ? <span className="underline decoration-white/50 underline-offset-4">{resolvedAccent}</span> : null}
          </h2>
          <p className="mt-2 leading-relaxed text-white/80">{resolvedSubtitle}</p>
        </div>
        <Link
          ref={btnRef}
          href={buttonHref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="cta-btn inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#F97316] dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary"
          data-cursor="hover"
          style={{ willChange: 'transform' }}
        >
          {resolvedButton}
        </Link>
      </div>
    </section>
  );
}
