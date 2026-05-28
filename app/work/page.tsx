import type { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'
import { getContentData } from '@/lib/content'
import type { WorkData } from '@/lib/types/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Work | Worth Agency',
  description: 'Real results for real brands across the MENA region.',
}

export default async function WorkPage() {
  const workData = await getContentData<WorkData>('work')
  return <WorkPageClient workData={workData} />
}
