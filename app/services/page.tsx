import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services | Worth Agency',
  description: 'Explore marketing, branding, motion, web, and creative production services from Worth Agency.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
