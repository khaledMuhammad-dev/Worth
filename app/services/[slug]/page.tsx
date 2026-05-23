import { getContentData } from '@/lib/content'
import type { ServicesData } from '@/lib/types/content'
import ServicePageClient from './ServicePageClient'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const services = getContentData<ServicesData>('services')
  return services.items.map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const services = getContentData<ServicesData>('services')
  const service = services.items.find((s) => s.slug === slug)
  if (!service) notFound()
  return <ServicePageClient service={service} />
}
