'use client';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  badge: string;
  features: PricingFeature[];
  cta: string;
  featured?: boolean;
}

export function PricingCard({ name, description, price, period, badge, features, cta, featured = false }: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col gap-5 rounded-xl border p-6 transition-shadow duration-300 hover:shadow-lg ${
        featured
          ? 'scale-105 border-[#F97316] bg-[#1A1A2E] shadow-lg dark:border-primary dark:bg-sop-elevated dark:shadow-sop-orange'
          : 'bg-white border-[#F0F0F0] shadow-sm dark:border-sop-border dark:bg-sop-surface dark:shadow-sop-card dark:hover:border-sop-purple/50 dark:hover:shadow-sop-purple'
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-[#F97316] px-4 py-1.5 text-xs font-bold text-white">Most Popular</span>
        </div>
      )}
      <div>
        <Badge
          variant={featured ? 'default' : 'secondary'}
          className={featured ? 'bg-[#F97316]/20 text-[#F97316]' : 'dark:bg-sop-hover dark:text-sop-purple'}
        >
          {badge}
        </Badge>
        <h3
          className={`mt-3 text-2xl font-bold ${featured ? 'text-white' : 'text-[#1A1A2E] dark:text-sop-foreground'}`}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {name}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-white/60' : 'text-[#6B7280] dark:text-sop-muted'}`}>
          {description}
        </p>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-3xl font-bold ${featured ? 'text-white' : 'text-[#1A1A2E] dark:text-sop-foreground'}`}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {price}
        </span>
        {period && <span className={`text-sm ${featured ? 'text-white/60' : 'text-[#6B7280] dark:text-sop-muted'}`}>{period}</span>}
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 text-sm ${
              f.included
                ? featured
                  ? 'text-white/90'
                  : 'text-[#1A1A2E] dark:text-sop-foreground'
                : featured
                  ? 'text-white/30'
                  : 'text-[#6B7280]/50 dark:text-sop-subtle'
            }`}
          >
            {f.included ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            {f.text}
          </li>
        ))}
      </ul>
      <Button asChild variant={featured ? 'primary' : 'outline'} size="md" className="w-full">
        <Link href="/contact">{cta}</Link>
      </Button>
    </div>
  );
}
