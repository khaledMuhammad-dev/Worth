'use client'

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/pricing.json'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PackageItem {
  id: string
  nameEN: string
  nameAR: string
  descriptionEN: string
  descriptionAR: string
  badgeEN: string
  badgeAR: string
  priceEGP: string
  priceUSD: string
  priceSAR: string
  periodEN: string
  periodAR: string
  featured: boolean
  ctaEN: string
  ctaAR: string
  featuresEN: string[]
  featuresAR: string[]
}

interface PricingData {
  packages: PackageItem[]
  currencies: { code: string; label: string; symbol: string }[]
  faq: { id: string; questionEN: string; questionAR: string; answerEN: string; answerAR: string }[]
  note: { textEN: string; textAR: string }
}

export default function AdminPricingPage() {
  const [data, setData] = useState<PricingData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title="Pricing" subtitle="Edit packages, currencies, FAQ, and notes" onSave={save} saving={saving} />
      <div className="p-6">
        <Tabs defaultValue="packages">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="note">Note</TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-4">
            {data.packages.map((pkg, index) => (
              <div key={pkg.id} className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
                <LocaleField labelEN="Package Name" labelAR="Package Name" valueEN={pkg.nameEN} valueAR={pkg.nameAR} onChangeEN={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, nameEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, nameAR: value } : entry) })} />
                <LocaleField multiline labelEN="Description" labelAR="Description" valueEN={pkg.descriptionEN} valueAR={pkg.descriptionAR} onChangeEN={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionAR: value } : entry) })} />
                <LocaleField labelEN="Badge" labelAR="Badge" valueEN={pkg.badgeEN} valueAR={pkg.badgeAR} onChangeEN={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, badgeEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, badgeAR: value } : entry) })} />
                <LocaleField labelEN="CTA Label" labelAR="CTA Label" valueEN={pkg.ctaEN} valueAR={pkg.ctaAR} onChangeEN={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaAR: value } : entry) })} />
                <div className="grid gap-3 md:grid-cols-3">
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={pkg.priceEGP} onChange={(event) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, priceEGP: event.target.value } : entry) })} placeholder="EGP" />
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={pkg.priceUSD} onChange={(event) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, priceUSD: event.target.value } : entry) })} placeholder="USD" />
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={pkg.priceSAR} onChange={(event) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, priceSAR: event.target.value } : entry) })} placeholder="SAR" />
                </div>
                <LocaleField labelEN="Period" labelAR="Period" valueEN={pkg.periodEN} valueAR={pkg.periodAR} onChangeEN={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, periodEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, periodAR: value } : entry) })} />
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Featured</label>
                  <button type="button" onClick={() => setData({ ...data, packages: data.packages.map((entry, itemIndex) => itemIndex === index ? { ...entry, featured: !entry.featured } : entry) })} className={`h-6 w-10 rounded-full transition ${pkg.featured ? 'bg-primary' : 'bg-gray-200'}`}>
                    <span className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${pkg.featured ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="currencies" className="space-y-3 rounded-xl border border-gray-100 bg-white p-6">
            {data.currencies.map((currency, index) => (
              <div key={currency.code} className="grid gap-3 md:grid-cols-3">
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={currency.code} onChange={(event) => setData({ ...data, currencies: data.currencies.map((entry, itemIndex) => itemIndex === index ? { ...entry, code: event.target.value } : entry) })} placeholder="Code" />
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={currency.label} onChange={(event) => setData({ ...data, currencies: data.currencies.map((entry, itemIndex) => itemIndex === index ? { ...entry, label: event.target.value } : entry) })} placeholder="Label" />
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={currency.symbol} onChange={(event) => setData({ ...data, currencies: data.currencies.map((entry, itemIndex) => itemIndex === index ? { ...entry, symbol: event.target.value } : entry) })} placeholder="Symbol" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="faq" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            {data.faq.map((faq, index) => (
              <div key={faq.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <LocaleField labelEN="Question" labelAR="Question" valueEN={faq.questionEN} valueAR={faq.questionAR} onChangeEN={(value) => setData({ ...data, faq: data.faq.map((entry, itemIndex) => itemIndex === index ? { ...entry, questionEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, faq: data.faq.map((entry, itemIndex) => itemIndex === index ? { ...entry, questionAR: value } : entry) })} />
                <LocaleField multiline labelEN="Answer" labelAR="Answer" valueEN={faq.answerEN} valueAR={faq.answerAR} onChangeEN={(value) => setData({ ...data, faq: data.faq.map((entry, itemIndex) => itemIndex === index ? { ...entry, answerEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, faq: data.faq.map((entry, itemIndex) => itemIndex === index ? { ...entry, answerAR: value } : entry) })} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="note" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            <LocaleField multiline labelEN="Note" labelAR="Note" valueEN={data.note.textEN} valueAR={data.note.textAR} onChangeEN={(value) => setData({ ...data, note: { ...data.note, textEN: value } })} onChangeAR={(value) => setData({ ...data, note: { ...data.note, textAR: value } })} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
