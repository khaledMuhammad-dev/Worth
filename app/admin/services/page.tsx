'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/services.json'

interface ServiceItem {
  id: string
  slug: string
  iconColor: string
  titleEN: string
  titleAR: string
  descriptionEN: string
  descriptionAR: string
  href: string
  featuresEN: string[]
  featuresAR: string[]
}

interface ServicesData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  items: ServiceItem[]
}

export default function AdminServicesPage() {
  const [data, setData] = useState<ServicesData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title={t('admin.services.title')} subtitle={t('admin.services.subtitle')} onSave={save} saving={saving} />
      <div className="space-y-6 p-6">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <LocaleField labelEN="Heading" labelAR="Heading" valueEN={data.hero.headingEN} valueAR={data.hero.headingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, headingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, headingAR: value } })} />
          <LocaleField labelEN="Accent" labelAR="Accent" valueEN={data.hero.accentWordEN} valueAR={data.hero.accentWordAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, accentWordEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, accentWordAR: value } })} />
          <LocaleField multiline labelEN="Subheading" labelAR="Subheading" valueEN={data.hero.subheadingEN} valueAR={data.hero.subheadingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, subheadingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, subheadingAR: value } })} />
        </div>

        {data.items.map((item, index) => (
          <details key={item.id} className="rounded-xl border border-gray-100 bg-white p-6" open>
            <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">{item.titleEN}</summary>
            <div className="mt-4 space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={item.slug} onChange={(event) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, slug: event.target.value } : entry) })} placeholder={t('admin.services.slugPlaceholder')} />
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={item.href} onChange={(event) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, href: event.target.value } : entry) })} placeholder={t('admin.services.hrefPlaceholder')} />
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                  <input type="color" value={item.iconColor} onChange={(event) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, iconColor: event.target.value } : entry) })} className="h-8 w-10" />
                  <span className="text-sm text-muted">{item.iconColor}</span>
                </div>
              </div>
              <LocaleField labelEN="Title" labelAR="Title" valueEN={item.titleEN} valueAR={item.titleAR} onChangeEN={(value) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleAR: value } : entry) })} />
              <LocaleField multiline labelEN="Description" labelAR="Description" valueEN={item.descriptionEN} valueAR={item.descriptionAR} onChangeEN={(value) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionAR: value } : entry) })} />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">{t('admin.services.featuresEN')}</h3>
                    <button type="button" onClick={() => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, featuresEN: [...entry.featuresEN, ''] } : entry) })} className="flex items-center gap-1 text-sm text-primary"><Plus size={14} />{t('admin.services.addFeature')}</button>
                  </div>
                  {item.featuresEN.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2">
                      <input className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm" value={feature} onChange={(event) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, featuresEN: entry.featuresEN.map((value, valueIndex) => valueIndex === featureIndex ? event.target.value : value) } : entry) })} />
                      <button type="button" onClick={() => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, featuresEN: entry.featuresEN.filter((_, valueIndex) => valueIndex !== featureIndex) } : entry) })} className="text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">{t('admin.services.featuresAR')}</h3>
                    <button type="button" onClick={() => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, featuresAR: [...entry.featuresAR, ''] } : entry) })} className="flex items-center gap-1 text-sm text-primary"><Plus size={14} />{t('admin.services.addFeature')}</button>
                  </div>
                  {item.featuresAR.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2">
                      <input dir="rtl" className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-arabic" value={feature} onChange={(event) => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, featuresAR: entry.featuresAR.map((value, valueIndex) => valueIndex === featureIndex ? event.target.value : value) } : entry) })} />
                      <button type="button" onClick={() => setData({ ...data, items: data.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, featuresAR: entry.featuresAR.filter((_, valueIndex) => valueIndex !== featureIndex) } : entry) })} className="text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
