import type { Metadata } from 'next';
import InsightsPageClient from './InsightsPageClient';

export const metadata: Metadata = {
  title: 'Insights | Worth Agency',
  description: 'Read Worth Agency articles on marketing, branding, web strategy, analytics, and growth across MENA.',
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
