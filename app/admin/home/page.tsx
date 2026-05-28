'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/home.json'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface HomeData {
  hero: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    subheadingEN: string
    subheadingAR: string
    primaryCtaEN: string
    primaryCtaAR: string
    primaryCtaHref: string
    secondaryCtaEN: string
    secondaryCtaAR: string
    secondaryCtaHref: string
    stats: { value: string; suffix: string; labelEN: string; labelAR: string }[]
  }
  services: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    items: { id: string; iconColor: string; titleEN: string; titleAR: string; descriptionEN: string; descriptionAR: string; href: string }[]
  }
  process: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    steps: { number: string; titleEN: string; titleAR: string; descriptionEN: string; descriptionAR: string }[]
  }
  testimonials: {
    headingEN: string
    headingAR: string
    accentWordEN: string
    accentWordAR: string
    items: { id: string; nameEN: string; nameAR: string; roleEN: string; roleAR: string; quoteEN: string; quoteAR: string; stars: number; avatarUrl: string }[]
  }
  cta: { headingEN: string; headingAR: string; buttonEN: string; buttonAR: string; buttonHref: string }
}

export default function AdminHomePage() {
  const [data, setData] = useState<HomeData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title={t('admin.home.title')} subtitle={t('admin.home.subtitle')} onSave={save} saving={saving} />
      <div className="p-6">
        <Tabs defaultValue="hero">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="hero">{t('admin.home.tabHero')}</TabsTrigger>
            <TabsTrigger value="services">{t('admin.home.tabServices')}</TabsTrigger>
            <TabsTrigger value="process">{t('admin.home.tabProcess')}</TabsTrigger>
            <TabsTrigger value="testimonials">{t('admin.home.tabTestimonials')}</TabsTrigger>
            <TabsTrigger value="cta">{t('admin.home.tabCta')}</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            <LocaleField labelEN="Heading" labelAR="العنوان الرئيسي" valueEN={data.hero.headingEN} valueAR={data.hero.headingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, headingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, headingAR: value } })} />
            <LocaleField labelEN="Accent Word" labelAR="الكلمة المميزة" valueEN={data.hero.accentWordEN} valueAR={data.hero.accentWordAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, accentWordEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, accentWordAR: value } })} />
            <LocaleField multiline labelEN="Subheading" labelAR="العنوان الفرعي" valueEN={data.hero.subheadingEN} valueAR={data.hero.subheadingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, subheadingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, subheadingAR: value } })} />
            <LocaleField labelEN="Primary CTA" labelAR="زر الدعوة الأساسي" valueEN={data.hero.primaryCtaEN} valueAR={data.hero.primaryCtaAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, primaryCtaEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, primaryCtaAR: value } })} />
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.hero.primaryCtaHref} onChange={(event) => setData({ ...data, hero: { ...data.hero, primaryCtaHref: event.target.value } })} placeholder={t('admin.home.primaryCtaHref')} />
            <LocaleField labelEN="Secondary CTA" labelAR="زر الدعوة الثانوي" valueEN={data.hero.secondaryCtaEN} valueAR={data.hero.secondaryCtaAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, secondaryCtaEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, secondaryCtaAR: value } })} />
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.hero.secondaryCtaHref} onChange={(event) => setData({ ...data, hero: { ...data.hero, secondaryCtaHref: event.target.value } })} placeholder={t('admin.home.secondaryCtaHref')} />
            <div className="space-y-3">
              {data.hero.stats.map((stat, index) => (
                <div key={index} className="grid gap-3 rounded-xl border border-gray-100 p-4 md:grid-cols-4">
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={stat.value} onChange={(event) => setData({ ...data, hero: { ...data.hero, stats: data.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item) } })} placeholder={t('admin.home.statValue')} />
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={stat.suffix} onChange={(event) => setData({ ...data, hero: { ...data.hero, stats: data.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, suffix: event.target.value } : item) } })} placeholder={t('admin.home.statSuffix')} />
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={stat.labelEN} onChange={(event) => setData({ ...data, hero: { ...data.hero, stats: data.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, labelEN: event.target.value } : item) } })} placeholder={t('admin.home.statLabelEN')} />
                  <input dir="rtl" className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-arabic" value={stat.labelAR} onChange={(event) => setData({ ...data, hero: { ...data.hero, stats: data.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, labelAR: event.target.value } : item) } })} placeholder={t('admin.home.statLabelAR')} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            <LocaleField labelEN="Heading" labelAR="العنوان الرئيسي" valueEN={data.services.headingEN} valueAR={data.services.headingAR} onChangeEN={(value) => setData({ ...data, services: { ...data.services, headingEN: value } })} onChangeAR={(value) => setData({ ...data, services: { ...data.services, headingAR: value } })} />
            <LocaleField labelEN="Accent" labelAR="الكلمة المميزة" valueEN={data.services.accentWordEN} valueAR={data.services.accentWordAR} onChangeEN={(value) => setData({ ...data, services: { ...data.services, accentWordEN: value } })} onChangeAR={(value) => setData({ ...data, services: { ...data.services, accentWordAR: value } })} />
            {data.services.items.map((item, index) => (
              <div key={item.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <LocaleField multiline labelEN="Title" labelAR="العنوان" valueEN={item.titleEN} valueAR={item.titleAR} onChangeEN={(value) => setData({ ...data, services: { ...data.services, items: data.services.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleEN: value } : entry) } })} onChangeAR={(value) => setData({ ...data, services: { ...data.services, items: data.services.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleAR: value } : entry) } })} />
                <LocaleField multiline labelEN="Description" labelAR="الوصف" valueEN={item.descriptionEN} valueAR={item.descriptionAR} onChangeEN={(value) => setData({ ...data, services: { ...data.services, items: data.services.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionEN: value } : entry) } })} onChangeAR={(value) => setData({ ...data, services: { ...data.services, items: data.services.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionAR: value } : entry) } })} />
                <div className="grid gap-3 md:grid-cols-2">
                  <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={item.href} onChange={(event) => setData({ ...data, services: { ...data.services, items: data.services.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, href: event.target.value } : entry) } })} placeholder="Href" />
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                    <input type="color" value={item.iconColor} onChange={(event) => setData({ ...data, services: { ...data.services, items: data.services.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, iconColor: event.target.value } : entry) } })} className="h-8 w-10" />
                    <span className="text-sm text-muted">{item.iconColor}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="process" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            <LocaleField labelEN="Heading" labelAR="العنوان الرئيسي" valueEN={data.process.headingEN} valueAR={data.process.headingAR} onChangeEN={(value) => setData({ ...data, process: { ...data.process, headingEN: value } })} onChangeAR={(value) => setData({ ...data, process: { ...data.process, headingAR: value } })} />
            <LocaleField labelEN="Accent" labelAR="الكلمة المميزة" valueEN={data.process.accentWordEN} valueAR={data.process.accentWordAR} onChangeEN={(value) => setData({ ...data, process: { ...data.process, accentWordEN: value } })} onChangeAR={(value) => setData({ ...data, process: { ...data.process, accentWordAR: value } })} />
            {data.process.steps.map((step, index) => (
              <div key={step.number} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={step.number} onChange={(event) => setData({ ...data, process: { ...data.process, steps: data.process.steps.map((item, itemIndex) => itemIndex === index ? { ...item, number: event.target.value } : item) } })} placeholder="Step number" />
                <LocaleField labelEN="Title" labelAR="العنوان" valueEN={step.titleEN} valueAR={step.titleAR} onChangeEN={(value) => setData({ ...data, process: { ...data.process, steps: data.process.steps.map((item, itemIndex) => itemIndex === index ? { ...item, titleEN: value } : item) } })} onChangeAR={(value) => setData({ ...data, process: { ...data.process, steps: data.process.steps.map((item, itemIndex) => itemIndex === index ? { ...item, titleAR: value } : item) } })} />
                <LocaleField multiline labelEN="Description" labelAR="الوصف" valueEN={step.descriptionEN} valueAR={step.descriptionAR} onChangeEN={(value) => setData({ ...data, process: { ...data.process, steps: data.process.steps.map((item, itemIndex) => itemIndex === index ? { ...item, descriptionEN: value } : item) } })} onChangeAR={(value) => setData({ ...data, process: { ...data.process, steps: data.process.steps.map((item, itemIndex) => itemIndex === index ? { ...item, descriptionAR: value } : item) } })} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            <LocaleField labelEN="Heading" labelAR="العنوان الرئيسي" valueEN={data.testimonials.headingEN} valueAR={data.testimonials.headingAR} onChangeEN={(value) => setData({ ...data, testimonials: { ...data.testimonials, headingEN: value } })} onChangeAR={(value) => setData({ ...data, testimonials: { ...data.testimonials, headingAR: value } })} />
            <LocaleField labelEN="Accent" labelAR="الكلمة المميزة" valueEN={data.testimonials.accentWordEN} valueAR={data.testimonials.accentWordAR} onChangeEN={(value) => setData({ ...data, testimonials: { ...data.testimonials, accentWordEN: value } })} onChangeAR={(value) => setData({ ...data, testimonials: { ...data.testimonials, accentWordAR: value } })} />
            {data.testimonials.items.map((item, index) => (
              <div key={item.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <LocaleField labelEN="Name" labelAR="الاسم" valueEN={item.nameEN} valueAR={item.nameAR} onChangeEN={(value) => setData({ ...data, testimonials: { ...data.testimonials, items: data.testimonials.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, nameEN: value } : entry) } })} onChangeAR={(value) => setData({ ...data, testimonials: { ...data.testimonials, items: data.testimonials.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, nameAR: value } : entry) } })} />
                <LocaleField labelEN="Role" labelAR="الدور" valueEN={item.roleEN} valueAR={item.roleAR} onChangeEN={(value) => setData({ ...data, testimonials: { ...data.testimonials, items: data.testimonials.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, roleEN: value } : entry) } })} onChangeAR={(value) => setData({ ...data, testimonials: { ...data.testimonials, items: data.testimonials.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, roleAR: value } : entry) } })} />
                <LocaleField multiline labelEN="Quote" labelAR="الاقتباس" valueEN={item.quoteEN} valueAR={item.quoteAR} onChangeEN={(value) => setData({ ...data, testimonials: { ...data.testimonials, items: data.testimonials.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, quoteEN: value } : entry) } })} onChangeAR={(value) => setData({ ...data, testimonials: { ...data.testimonials, items: data.testimonials.items.map((entry, itemIndex) => itemIndex === index ? { ...entry, quoteAR: value } : entry) } })} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="cta" className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
            <LocaleField multiline labelEN="Heading" labelAR="العنوان الرئيسي" valueEN={data.cta.headingEN} valueAR={data.cta.headingAR} onChangeEN={(value) => setData({ ...data, cta: { ...data.cta, headingEN: value } })} onChangeAR={(value) => setData({ ...data, cta: { ...data.cta, headingAR: value } })} />
            <LocaleField labelEN="Button" labelAR="الزر" valueEN={data.cta.buttonEN} valueAR={data.cta.buttonAR} onChangeEN={(value) => setData({ ...data, cta: { ...data.cta, buttonEN: value } })} onChangeAR={(value) => setData({ ...data, cta: { ...data.cta, buttonAR: value } })} />
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.cta.buttonHref} onChange={(event) => setData({ ...data, cta: { ...data.cta, buttonHref: event.target.value } })} placeholder="Button href" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
