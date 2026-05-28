'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/navigation.json'

interface NavigationData {
  links: { id: string; labelEN: string; labelAR: string; href: string }[]
  ctaEN: string
  ctaAR: string
  ctaHref: string
}

export default function AdminNavigationPage() {
  const [data, setData] = useState<NavigationData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/navigation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title={t('admin.navigation.title')} subtitle={t('admin.navigation.subtitle')} onSave={save} saving={saving} />
      <div className="space-y-6 p-6">
        <div className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          {data.links.map((link, index) => (
            <div key={link.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
              <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={link.href} onChange={(event) => setData({ ...data, links: data.links.map((entry, itemIndex) => itemIndex === index ? { ...entry, href: event.target.value } : entry) })} placeholder="Href" />
              <LocaleField labelEN="Label" labelAR="التسمية" valueEN={link.labelEN} valueAR={link.labelAR} onChangeEN={(value) => setData({ ...data, links: data.links.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, links: data.links.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelAR: value } : entry) })} />
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          <LocaleField labelEN="CTA" labelAR="زر الدعوة" valueEN={data.ctaEN} valueAR={data.ctaAR} onChangeEN={(value) => setData({ ...data, ctaEN: value })} onChangeAR={(value) => setData({ ...data, ctaAR: value })} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.ctaHref} onChange={(event) => setData({ ...data, ctaHref: event.target.value })} placeholder="CTA href" />
        </div>
      </div>
    </div>
  )
}
