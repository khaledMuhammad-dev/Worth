'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/settings.json'

interface SettingsData {
  siteName: string
  defaultLocale: string
  googleAnalyticsId: string
  metaDescriptionEN: string
  metaDescriptionAR: string
  ogImageUrl: string
}

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title={t('admin.settings.title')} subtitle={t('admin.settings.subtitle')} onSave={save} saving={saving} />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6 md:grid-cols-2">
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.siteName} onChange={(event) => setData({ ...data, siteName: event.target.value })} placeholder={t('admin.settings.siteName')} />
          <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.defaultLocale} onChange={(event) => setData({ ...data, defaultLocale: event.target.value })}>
            <option value="en">{t('admin.settings.english')}</option>
            <option value="ar">{t('admin.settings.arabic')}</option>
          </select>
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2" value={data.googleAnalyticsId} onChange={(event) => setData({ ...data, googleAnalyticsId: event.target.value })} placeholder={t('admin.settings.googleAnalyticsId')} />
        </div>
        <div className="rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          <LocaleField multiline labelEN={t('admin.settings.metaDescription')} labelAR={t('admin.settings.metaDescription')} valueEN={data.metaDescriptionEN} valueAR={data.metaDescriptionAR} onChangeEN={(value) => setData({ ...data, metaDescriptionEN: value })} onChangeAR={(value) => setData({ ...data, metaDescriptionAR: value })} />
        </div>
        <div className="rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          <ImageField label={t('admin.settings.ogImageUrl')} value={data.ogImageUrl} onChange={(value) => setData({ ...data, ogImageUrl: value })} />
        </div>
      </div>
    </div>
  )
}
