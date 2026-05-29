'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useUIStore } from '@/stores/ui.store'
import AdminHeader from '@/components/admin/AdminHeader'
import LocaleField from '@/components/admin/LocaleField'
import { Switch } from '@/components/ui/switch'
import initialData from '@/content/data/contact.json'

interface ContactData {
  hero: { headingEN: string; headingAR: string; subheadingEN: string; subheadingAR: string }
  info: { email: string; phone: string; addressEN: string; addressAR: string; mapEmbedUrl: string; bookingUrl: string }
  socials: { platform: string; url: string }[]
  formFields: { id: string; labelEN: string; labelAR: string; type: string; required: boolean }[]
}

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/save/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        useUIStore.getState().addToast({ type: 'success', title: t('admin.toast.savedTitle'), description: t('admin.toast.savedDesc') })
      } else {
        useUIStore.getState().addToast({ type: 'error', title: t('admin.toast.saveFailedTitle'), description: t('admin.toast.saveFailedDesc') })
      }
    } catch {
      useUIStore.getState().addToast({ type: 'error', title: t('admin.toast.saveFailedTitle'), description: t('admin.toast.saveFailedDesc') })
    }
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title={t('admin.contact.title')} subtitle={t('admin.contact.subtitle')} onSave={save} saving={saving} />
      <div className="space-y-6 p-6">
        <div className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          <LocaleField labelEN="Hero Heading" labelAR="عنوان الهيرو" valueEN={data.hero.headingEN} valueAR={data.hero.headingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, headingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, headingAR: value } })} />
          <LocaleField multiline labelEN="Hero Subheading" labelAR="العنوان الفرعي للهيرو" valueEN={data.hero.subheadingEN} valueAR={data.hero.subheadingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, subheadingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, subheadingAR: value } })} />
        </div>
        <div className="grid gap-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6 md:grid-cols-2">
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.email} onChange={(event) => setData({ ...data, info: { ...data.info, email: event.target.value } })} placeholder={t('admin.contact.emailPlaceholder')} />
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.phone} onChange={(event) => setData({ ...data, info: { ...data.info, phone: event.target.value } })} placeholder={t('admin.contact.phonePlaceholder')} />
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.mapEmbedUrl} onChange={(event) => setData({ ...data, info: { ...data.info, mapEmbedUrl: event.target.value } })} placeholder={t('admin.contact.mapEmbedUrl')} />
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.bookingUrl} onChange={(event) => setData({ ...data, info: { ...data.info, bookingUrl: event.target.value } })} placeholder={t('admin.contact.bookingUrl')} />
          <LocaleField multiline labelEN="Address" labelAR="العنوان" valueEN={data.info.addressEN} valueAR={data.info.addressAR} onChangeEN={(value) => setData({ ...data, info: { ...data.info, addressEN: value } })} onChangeAR={(value) => setData({ ...data, info: { ...data.info, addressAR: value } })} />
        </div>
        <div className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">{t('admin.contact.socialsTitle')}</h2>
            <button type="button" onClick={() => setData({ ...data, socials: [...data.socials, { platform: '', url: '' }] })} className="flex items-center gap-1 text-sm text-primary"><Plus size={14} />{t('admin.contact.addSocial')}</button>
          </div>
          {data.socials.map((social, index) => (
            <div key={`${social.platform}-${index}`} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
              <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={social.platform} onChange={(event) => setData({ ...data, socials: data.socials.map((entry, itemIndex) => itemIndex === index ? { ...entry, platform: event.target.value } : entry) })} placeholder={t('admin.contact.platformPlaceholder')} />
              <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={social.url} onChange={(event) => setData({ ...data, socials: data.socials.map((entry, itemIndex) => itemIndex === index ? { ...entry, url: event.target.value } : entry) })} placeholder={t('admin.contact.urlPlaceholder')} />
              <button type="button" onClick={() => setData({ ...data, socials: data.socials.filter((_, itemIndex) => itemIndex !== index) })} className="text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
          <h2 className="font-semibold text-foreground">{t('admin.contact.formFieldsTitle')}</h2>
          {data.formFields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={field.id} onChange={(event) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, id: event.target.value } : entry) })} placeholder={t('admin.contact.fieldId')} />
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={field.type} onChange={(event) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, type: event.target.value } : entry) })} placeholder={t('admin.contact.fieldType')} />
                <div className="flex items-center gap-2">
                  <Switch checked={field.required} onCheckedChange={(checked) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, required: checked } : entry) })} id={`req-${index}`} />
                  <label htmlFor={`req-${index}`} className="cursor-pointer text-sm text-foreground">{t('admin.contact.requiredLabel')}</label>
                </div>
              </div>
              <LocaleField labelEN="Label" labelAR="التسمية" valueEN={field.labelEN} valueAR={field.labelAR} onChangeEN={(value) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelAR: value } : entry) })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
