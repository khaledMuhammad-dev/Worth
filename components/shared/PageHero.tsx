'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-[#F9FAFB] py-16 md:py-20 border-b border-[#F0F0F0] relative overflow-hidden">
      <div className="absolute top-8 right-12 w-3 h-3 rounded-full bg-[#F97316] opacity-30" />
      <div className="absolute bottom-8 left-20 w-2 h-2 rounded-full bg-[#F97316] opacity-20" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-[#F97316] opacity-15" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280] mb-4">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#F97316] transition-colors">{item.label}</Link>
                ) : (
                  <span className="text-[#F97316] font-medium">{item.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="h-4 w-4" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="heading-l font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
        {subtitle && <p className="mt-4 text-[#6B7280] text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
