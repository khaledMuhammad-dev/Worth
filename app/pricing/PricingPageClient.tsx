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
import type { PricingData, PricingPackage } from '@/lib/types/content';

type Currency = 'EGP' | 'USD' | 'SAR';
type PackageWithPrices = PricingPackage & { prices?: Record<string, number> };

interface Props {
  pricingData: PricingData;
}

export default function PricingPageClient({ pricingData }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [currency, setCurrency] = useState<Currency>('EGP');

  const plans = useMemo(
    () =>
      (pricingData.packages as PackageWithPrices[]).map((plan) => ({
        name: isArabic ? plan.nameAR : plan.nameEN,
        description: isArabic ? plan.descriptionAR : plan.descriptionEN,
        price: `${currency} ${(plan.prices?.[currency] ?? plan.basePrice).toLocaleString('en-US')}`,
        period: isArabic ? plan.billingAR : plan.billingEN,
        badge: isArabic ? plan.badgeAR : plan.badgeEN,
        cta: t('pricing.launch.cta'),
        featured: plan.featured,
        features: [
          ...(isArabic ? plan.featuresAR : plan.featuresEN).map((text) => ({ text, included: true })),
          ...(isArabic ? plan.excludedAR : plan.excludedEN).map((text) => ({ text, included: false })),
        ],
      })),
    [currency, isArabic, pricingData.packages, t]
  );

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={isArabic ? pricingData.hero.headingAR : pricingData.hero.headingEN}
          subtitle={isArabic ? pricingData.hero.subheadingAR : pricingData.hero.subheadingEN}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.pricing') }]}
        />

        <section className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={isArabic ? pricingData.hero.headingAR : pricingData.hero.headingEN} accent={isArabic ? pricingData.hero.accentWordAR : pricingData.hero.accentWordEN} subtitle={isArabic ? pricingData.hero.subheadingAR : pricingData.hero.subheadingEN} />
            <div className="mb-10 flex flex-col items-center gap-4">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7280] dark:text-sop-muted">{t('pricing.currency')}</span>
              <div className="inline-flex rounded-full border border-[#F0F0F0] bg-[#F9FAFB] p-1.5 dark:border-sop-border dark:bg-sop-surface">
                {(['EGP', 'USD', 'SAR'] as Currency[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => setCurrency(option)}
                    className={cn(
                      'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                      currency === option ? 'bg-[#F97316] text-white' : 'text-[#6B7280] hover:text-[#1A1A2E] dark:text-sop-muted dark:hover:text-sop-foreground'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 items-start">
              {plans.map((plan) => (
                <PricingCard key={plan.name} {...plan} />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-[#6B7280] dark:text-sop-muted">{isArabic ? pricingData.note.AR : pricingData.note.EN}</p>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-20 dark:bg-sop-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('pricing.faq.title')} accent={t('pricing.faq.titleAccent')} />
            <div className="rounded-3xl border border-[#F0F0F0] bg-white px-6 md:px-8 dark:border-sop-border dark:bg-sop-overlay">
              <Accordion type="single" collapsible>
                {pricingData.faq.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{isArabic ? item.questionAR : item.questionEN}</AccordionTrigger>
                    <AccordionContent>{isArabic ? item.answerAR : item.answerEN}</AccordionContent>
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
