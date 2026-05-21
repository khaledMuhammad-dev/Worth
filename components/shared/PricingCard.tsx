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
    <div className={`rounded-xl border p-6 flex flex-col gap-5 relative transition-shadow duration-300 hover:shadow-lg ${
      featured ? 'bg-[#1A1A2E] border-[#F97316] shadow-lg scale-105' : 'bg-white border-[#F0F0F0] shadow-sm'
    }`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-[#F97316] text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</span>
        </div>
      )}
      <div>
        <Badge variant={featured ? "default" : "secondary"} className={featured ? "bg-[#F97316]/20 text-[#F97316]" : ""}>{badge}</Badge>
        <h3 className={`text-2xl font-bold mt-3 ${featured ? 'text-white' : 'text-[#1A1A2E]'}`} style={{ fontFamily: 'var(--font-heading)' }}>{name}</h3>
        <p className={`text-sm mt-2 leading-relaxed ${featured ? 'text-white/60' : 'text-[#6B7280]'}`}>{description}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${featured ? 'text-white' : 'text-[#1A1A2E]'}`} style={{ fontFamily: 'var(--font-heading)' }}>{price}</span>
        {period && <span className={`text-sm ${featured ? 'text-white/60' : 'text-[#6B7280]'}`}>{period}</span>}
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${f.included ? (featured ? 'text-white/90' : 'text-[#1A1A2E]') : (featured ? 'text-white/30' : 'text-[#6B7280]/50')}`}>
            {f.included ? (
              <Check className="h-4 w-4 text-[#F97316] shrink-0 mt-0.5" />
            ) : (
              <X className="h-4 w-4 shrink-0 mt-0.5" />
            )}
            {f.text}
          </li>
        ))}
      </ul>
      <Button asChild variant={featured ? "primary" : "outline"} size="md" className="w-full">
        <Link href="/contact">{cta}</Link>
      </Button>
    </div>
  );
}
