import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing | Worth Agency',
  description: 'Transparent pricing packages for growing brands, from foundational launches to monthly retainers.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
