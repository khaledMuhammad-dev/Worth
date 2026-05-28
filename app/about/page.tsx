import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'
import { getContentData } from '@/lib/content'
import type { AboutData } from '@/lib/types/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Worth Agency',
  description: 'Meet the team, values, and journey behind Worth Agency.',
}

export default async function AboutPage() {
  const aboutData = await getContentData<AboutData>('about')
  return <AboutPageClient aboutData={aboutData} />
}
