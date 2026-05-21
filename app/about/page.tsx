import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Worth Agency',
  description: 'Meet the team, values, and journey behind Worth Agency.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
