import type { Metadata } from 'next';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Work | Worth Agency',
  description: 'Explore case studies and portfolio highlights from Worth Agency across branding, marketing, web, and motion.',
};

export default function WorkPage() {
  return <WorkPageClient />;
}
