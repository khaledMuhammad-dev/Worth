'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BarChart3, Brush, Clapperboard, Globe, Layers } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABanner } from '@/components/shared/CTABanner';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/site-data';

const iconMap = {
  'marketing-media-buying': BarChart3,
  'brand-identity': Brush,
  'motion-graphics': Clapperboard,
  'web-development': Globe,
  'creative-production': Layers,
} as const;

const bgMap = {
  'marketing-media-buying': 'bg-[#FEF3C7] text-[#A16207]',
  'brand-identity': 'bg-[#F3E8FF] text-[#7E22CE]',
  'motion-graphics': 'bg-[#DCFCE7] text-[#15803D]',
  'web-development': 'bg-[#DBEAFE] text-[#1D4ED8]',
  'creative-production': 'bg-[#FCE7F3] text-[#BE185D]',
} as const;

export default function ServicesPageClient() {
  const { t } = useTranslation();

  const steps = [
    { number: '01', title: t('process.step1.title'), description: t('process.step1.description') },
    { number: '02', title: t('process.step2.title'), description: t('process.step2.description') },
    { number: '03', title: t('process.step3.title'), description: t('process.step3.description') },
    { number: '04', title: t('process.step4.title'), description: t('process.step4.description') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageHero.services')}
          subtitle={t('services.subtitle')}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.services') }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('services.title')} accent={t('services.titleAccent')} subtitle="A full suite of brand, creative, and growth capabilities designed to help ambitious businesses scale with clarity." />
            <div className="grid lg:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.slug as keyof typeof iconMap];
                return (
                  <div key={service.slug} className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${bgMap[service.slug as keyof typeof bgMap]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h2>
                    <p className="mt-4 text-[#6B7280] leading-8">{service.shortDescription}</p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-[#1A1A2E]">
                      {service.deliverables.slice(0, 4).map((item) => (
                        <li key={item} className="rounded-xl border border-[#F0F0F0] bg-white px-4 py-3">{item}</li>
                      ))}
                    </ul>
                    <Button asChild variant="ghost" className="mt-6 px-0 text-[#F97316] hover:bg-transparent">
                      <Link href={`/services/${service.slug}`}>
                        {t('services.learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('process.title')} accent={t('process.titleAccent')} subtitle={t('process.subtitle')} />
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.number} className="rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F97316] text-white font-bold">{step.number}</div>
                  <h3 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                  <p className="mt-3 text-[#6B7280] leading-7">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#1A1A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_0.8fr] gap-10 items-center">
            <div>
              <p className="text-[#F97316] uppercase tracking-[0.25em] text-sm">Pricing overview</p>
              <h2 className="mt-4 text-3xl md:text-5xl text-white max-w-3xl">Flexible packages for brands that need the right mix of strategy, creative, and execution.</h2>
              <p className="mt-6 text-white/70 text-lg leading-8 max-w-2xl">
                Whether you are launching from scratch or scaling an existing growth engine, our packages give you a clear starting point without locking you into generic deliverables.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="space-y-4 text-white/80 leading-7">
                <p>Launch for foundational brand and web essentials.</p>
                <p>Growth for brands ready to pair identity with performance marketing.</p>
                <p>Authority for full-scale market presence, content, and campaign management.</p>
              </div>
              <Button asChild size="lg" className="mt-8">
                <Link href="/pricing">Explore Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
