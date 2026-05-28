import type { Metadata } from 'next'
import InsightsPageClient from './InsightsPageClient'
import { getBlogMeta } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Insights | Worth Agency',
}

export default async function InsightsPage() {
  const allPosts = await getBlogMeta()
  const published = allPosts
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return <InsightsPageClient posts={published} />
}
