import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';
import { getServiceBySlug, services } from '@/lib/site-data';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return { title: 'Service Not Found | Worth Agency' };
  }

  return {
    title: `${service.title} | Worth Agency`,
    description: service.shortDescription,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return <ServicePageClient service={service} />;
}
