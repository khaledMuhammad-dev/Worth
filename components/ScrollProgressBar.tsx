'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useHydrated, usePrefersReducedMotion } from '@/lib/motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const hydrated = useHydrated();
  const prefersReduced = usePrefersReducedMotion();

  if (!hydrated || prefersReduced) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-[#F97316]"
    />
  );
}
