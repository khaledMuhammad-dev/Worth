'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/motion';

interface ServiceCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
  href: string;
  learnMore: string;
}

export function ServiceCard({ icon, iconBg, title, description, href, learnMore }: ServiceCardProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="group sop-card flex h-full flex-col rounded-xl border border-[#F0F0F0] bg-white p-6 shadow-sm dark:border-sop-border dark:bg-sop-surface dark:shadow-sop-card dark:hover:border-sop-purple/40 dark:hover:bg-sop-elevated dark:hover:shadow-sop-purple"
      whileHover={prefersReduced ? undefined : { y: -6, boxShadow: '0 12px 40px rgba(249,115,22,0.15)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      data-cursor="hover"
    >
      <div className={`icon-box mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="mb-5 flex-1 leading-relaxed text-[#6B7280] dark:text-sop-muted">{description}</p>
      <Link href={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] transition-all hover:gap-3 dark:text-sop-purple dark:hover:text-primary">
        {learnMore}
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </motion.div>
  );
}
