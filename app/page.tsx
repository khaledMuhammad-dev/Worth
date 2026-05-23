import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { getContentData } from '@/lib/content'
import type { HomeData } from '@/lib/types/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Worth Agency — Every brand has a story. We make it valuable.',
  description: 'Full-service digital agency offering marketing, media buying, brand identity, motion graphics, and web development.',
}

export default async function HomePage() {
  const homeData = getContentData<HomeData>('home')
  return <HomePageClient homeData={homeData} />
}
