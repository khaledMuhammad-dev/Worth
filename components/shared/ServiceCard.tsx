import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
  href: string;
  learnMore: string;
}

export function ServiceCard({ icon, iconBg, title, description, href, learnMore }: ServiceCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#F0F0F0] shadow-sm hover:shadow-md transition-shadow duration-300 p-6 group">
      <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-5 shrink-0`}>
        {icon}
      </div>
      <h3
        className="text-xl font-bold text-[#1A1A2E] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      <p className="text-[#6B7280] leading-relaxed mb-5 flex-1">{description}</p>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-2 text-[#F97316] font-semibold text-sm hover:gap-3 transition-all"
      >
        {learnMore}
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </div>
  );
}
