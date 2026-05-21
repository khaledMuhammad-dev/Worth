'use client';

import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export function TestimonialCard({ name, role, quote, avatar }: TestimonialCardProps) {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
      <div className="flex shrink-0 gap-1">
        {[...Array(5)].map((_, index) => (
          <Star key={index} className="star h-4 w-4 fill-[#F97316] text-[#F97316]" style={{ willChange: 'transform' }} />
        ))}
      </div>
      <p className="flex-1 italic leading-relaxed text-[#6B7280]">&ldquo;{quote}&rdquo;</p>
      <div className="flex shrink-0 items-center gap-3 border-t border-[#F0F0F0] pt-4">
        <motion.div
          initial={prefersReduced ? false : { scale: 0 }}
          whileInView={prefersReduced ? undefined : { scale: 1 }}
          viewport={{ once: true }}
          transition={prefersReduced ? undefined : { type: 'spring', stiffness: 300, damping: 18, delay: 0.3 }}
        >
          <Avatar>
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</AvatarFallback>
          </Avatar>
        </motion.div>
        <div>
          <div className="text-sm font-semibold text-[#1A1A2E]">{name}</div>
          <div className="text-xs text-[#6B7280]">{role}</div>
        </div>
      </div>
    </div>
  );
}
