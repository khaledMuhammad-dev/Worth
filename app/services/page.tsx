import type { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'
import { getContentData } from '@/lib/content'
import type { ServicesData } from '@/lib/types/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services | Worth Agency',
  description: 'End-to-end digital solutions designed to grow your brand.',
}

export default async function ServicesPage() {
  const servicesData = getContentData<ServicesData>('services')
  return <ServicesPageClient servicesData={servicesData} />
}
