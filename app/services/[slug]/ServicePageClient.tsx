'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { CTABanner } from '@/components/shared/CTABanner';
import type { ServiceDetail } from '@/lib/types/content';
import { Button } from '@/components/ui/button';

export default function ServicePageClient({ service }: { service: ServiceDetail }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const title = isArabic ? service.titleAR : service.titleEN;
  const description = isArabic ? service.descriptionAR : service.descriptionEN;
  const features = isArabic ? service.featuresAR : service.featuresEN;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={title}
          subtitle={description}
          breadcrumb={[
            { label: t('pageHero.home'), href: '/' },
            { label: t('pageHero.services'), href: '/services' },
            { label: title },
          ]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">Service overview</p>
              <h1 className="mt-4 text-4xl md:text-5xl text-[#1A1A2E] font-bold max-w-3xl" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
              <p className="mt-6 text-lg leading-8 text-[#6B7280] max-w-3xl">{description}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Start a project</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/work">See related work</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-[2rem] bg-gradient-to-br from-[#FFF4EE] to-[#FDE68A] min-h-[320px] border border-[#F0F0F0] p-8">
              <div className="grid gap-4 md:grid-cols-3 md:items-end h-full">
                {features.slice(0, 3).map((feature, index) => (
                  <div key={feature} className="rounded-3xl bg-white/70 p-5 backdrop-blur-sm border border-white/50">
                    <p className="text-sm text-[#6B7280]">Feature 0{index + 1}</p>
                    <p className="mt-2 text-base font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-white p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">What we deliver</p>
              <ul className="mt-6 space-y-4">
                {features.map((item) => (
                  <li key={item} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] px-4 py-4 text-[#1A1A2E]">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#1A1A2E] p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">What you gain</p>
              <ul className="mt-6 space-y-4 text-white/85">
                {features.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">Our process</p>
              <h2 className="mt-3 text-4xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>How we bring this service to life.</h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {features.map((step, index) => (
                <div key={step} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F97316] text-white font-bold">0{index + 1}</div>
                  <h3 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{step}</h3>
                  <p className="mt-3 text-[#6B7280] leading-7">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-[2rem] border border-[#F0F0F0] bg-white p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">Need a tailored scope?</p>
              <h2 className="mt-3 text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>We can customize a package around your goals, market, and internal team structure.</h2>
            </div>
            <Link href="/pricing" className="inline-flex items-center gap-2 font-semibold text-[#F97316] hover:gap-3 transition-all whitespace-nowrap">
              Explore pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
