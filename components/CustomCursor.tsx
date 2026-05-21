'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power1.out' });
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const hoverTarget = target.closest('a, button, [data-cursor="hover"]');
      if (!hoverTarget) return;

      gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const hoverTarget = target.closest('a, button, [data-cursor="hover"]');
      if (!hoverTarget) return;

      const related = event.relatedTarget;
      if (related instanceof Element && related.closest('a, button, [data-cursor="hover"]') === hoverTarget) {
        return;
      }

      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    };

    const ctx = gsap.context(() => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseover', onMouseOver);
      document.addEventListener('mouseout', onMouseOut);
      gsap.ticker.add(tick);
    }, cursorRef);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ willChange: 'transform', transform: 'translate(-50%, -50%)' }}
      >
        <div className="h-8 w-8 rounded-full border-2 border-[#F97316] opacity-70 transition-opacity" />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ willChange: 'transform', transform: 'translate(-50%, -50%)' }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
      </div>
    </>
  );
}
