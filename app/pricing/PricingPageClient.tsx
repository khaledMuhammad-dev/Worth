'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { PricingCard } from '@/components/shared/PricingCard';
import { CTABanner } from '@/components/shared/CTABanner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type Currency = 'EGP' | 'USD' | 'SAR';

const priceMap: Record<Currency, { launch: string; growth: string; authority: string; partner: string }> = {
  EGP: { launch: '18,000', growth: '42,000', authority: '85,000', partner: '12,000' },
  USD: { launch: '380', growth: '880', authority: '1,780', partner: '250' },
  SAR: { launch: '1,425', growth: '3,300', authority: '6,675', partner: '938' },
};

export default function PricingPageClient() {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<Currency>('EGP');

  const plans = useMemo(
    () => [
      {
        name: t('pricing.launch.name'),
        description: t('pricing.launch.description'),
        price: `${currency} ${priceMap[currency].launch}`,
        badge: t('pricing.launch.badge'),
        cta: t('pricing.launch.cta'),
        features: [
          'Brand strategy',
          'Logo design',
          'Business card design',
          'Social media kit',
          '1 landing page',
          '3 months email support',
          'Google Ads setup',
        ].map((text, index) => ({ text, included: index < 6 })),
      },
      {
        name: t('pricing.growth.name'),
        description: t('pricing.growth.description'),
        price: `${currency} ${priceMap[currency].growth}`,
        badge: t('pricing.growth.badge'),
        cta: t('pricing.growth.cta'),
        featured: true,
        features: [
          'Everything in Launch',
          'Full brand guidelines',
          '3-month marketing campaign',
          '5 ad creatives',
          'Full website',
          'Google Ads setup',
          'Monthly reporting',
        ].map((text) => ({ text, included: true })),
      },
      {
        name: t('pricing.authority.name'),
        description: t('pricing.authority.description'),
        price: `${currency} ${priceMap[currency].authority}`,
        badge: t('pricing.authority.badge'),
        cta: t('pricing.authority.cta'),
        features: [
          'Everything in Growth',
          'Motion graphics package',
          'Video production (2 videos)',
          'Advanced SEO',
          '6-month campaign management',
          'Dedicated account manager',
          'Priority creative support',
        ].map((text) => ({ text, included: true })),
      },
      {
        name: t('pricing.partner.name'),
        description: t('pricing.partner.description'),
        price: `${currency} ${priceMap[currency].partner}`,
        period: t('pricing.partner.perMonth'),
        badge: t('pricing.partner.badge'),
        cta: t('pricing.partner.cta'),
        features: [
          'Monthly ad management',
          'Weekly content creation',
          'Performance reporting',
          'Strategy calls',
          'Priority support',
          'Quarterly brand refreshes',
        ].map((text, index) => ({ text, included: index < 5 })),
      },
    ],
    [currency, t]
  );

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageHero.pricing')}
          subtitle={t('pricing.subtitle')}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.pricing') }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('pricing.title')} accent={t('pricing.titleAccent')} subtitle={t('pricing.subtitle')} />
            <div className="mb-10 flex flex-col items-center gap-4">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7280]">{t('pricing.currency')}</span>
              <div className="inline-flex rounded-full border border-[#F0F0F0] bg-[#F9FAFB] p-1.5">
                {(['EGP', 'USD', 'SAR'] as Currency[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => setCurrency(option)}
                    className={cn(
                      'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                      currency === option ? 'bg-[#F97316] text-white' : 'text-[#6B7280] hover:text-[#1A1A2E]'
                    )}
                  >
                    {t(`pricing.${option.toLowerCase()}`)}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 items-start">
              {plans.map((plan) => (
                <PricingCard key={plan.name} {...plan} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('pricing.faq.title')} accent={t('pricing.faq.titleAccent')} />
            <div className="rounded-3xl border border-[#F0F0F0] bg-white px-6 md:px-8">
              <Accordion type="single" collapsible>
                {faqKeys.map((key) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger>{t(`pricing.faq.${key}.question`)}</AccordionTrigger>
                    <AccordionContent>{t(`pricing.faq.${key}.answer`)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
