'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function Loader() {
  const [show, setShow] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (sessionStorage.getItem('worth-loaded')) return;

    sessionStorage.setItem('worth-loaded', '1');
    const frame = requestAnimationFrame(() => setShow(true));

    return () => cancelAnimationFrame(frame);
  }, [prefersReduced]);

  useEffect(() => {
    if (!show || !loaderRef.current || !barRef.current || !wordRef.current || prefersReduced) return;

    gsap.registerPlugin(SplitText);

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(wordRef.current, { type: 'chars' });

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => setShow(false),
        })
        .fromTo(
          split.chars,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }
        )
        .fromTo(
          barRef.current,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'power2.inOut' },
          0.3
        )
        .to(loaderRef.current, {
          y: '-100%',
          duration: 0.7,
          ease: 'power4.inOut',
          delay: 0.2,
        });
    }, loaderRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [prefersReduced, show]);

  if (!show) return null;

  return (
    <div
      ref={loaderRef}
      className="loader-exit fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1A2E] dark:bg-sop-bg"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={wordRef}
        className="select-none font-bold text-white"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        Worth
      </div>
      <div className="mt-8 h-0.5 w-48 overflow-hidden rounded-full bg-white/10 dark:bg-sop-surface">
        <div ref={barRef} className="h-full rounded-full bg-[#F97316]" style={{ width: '0%' }} />
      </div>
    </div>
  );
}
