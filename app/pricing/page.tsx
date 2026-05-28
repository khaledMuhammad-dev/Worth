import type { Metadata } from 'next'
import PricingPageClient from './PricingPageClient'
import { getContentData } from '@/lib/content'
import type { PricingData } from '@/lib/types/content'

interface RawPricingData {
  hero: PricingData['hero']
  currencies: { code: string; symbol: string }[]
  packages: Array<{
    id: string
    badgeEN: string
    badgeAR: string
    nameEN: string
    nameAR: string
    descriptionEN: string
    descriptionAR: string
    priceEGP: string
    priceUSD: string
    priceSAR: string
    periodEN: string
    periodAR: string
    featured: boolean
    featuresEN: string[]
    featuresAR: string[]
  }>
  faq: PricingData['faq']
  note: { textEN: string; textAR: string }
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Pricing | Worth Agency',
  description: 'Transparent pricing packages for growing brands.',
}

export default async function PricingPage() {
  const raw = await getContentData<RawPricingData>('pricing')
  const pricingData = {
    hero: raw.hero,
    currencies: Object.fromEntries(raw.currencies.map((currency) => [currency.code, { symbol: currency.symbol, rate: 1 }])),
    packages: raw.packages.map((pkg) => ({
      id: pkg.id,
      badgeEN: pkg.badgeEN,
      badgeAR: pkg.badgeAR,
      nameEN: pkg.nameEN,
      nameAR: pkg.nameAR,
      descriptionEN: pkg.descriptionEN,
      descriptionAR: pkg.descriptionAR,
      basePrice: Number(pkg.priceEGP),
      billingEN: pkg.periodEN,
      billingAR: pkg.periodAR,
      deliveryEN: '',
      deliveryAR: '',
      featured: pkg.featured,
      featuresEN: pkg.featuresEN,
      featuresAR: pkg.featuresAR,
      excludedEN: [],
      excludedAR: [],
      prices: {
        EGP: Number(pkg.priceEGP),
        USD: Number(pkg.priceUSD),
        SAR: Number(pkg.priceSAR),
      },
    })),
    faq: raw.faq,
    note: { EN: raw.note.textEN, AR: raw.note.textAR },
  } satisfies PricingData

  return <PricingPageClient pricingData={pricingData} />
}
