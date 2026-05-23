'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'
import LocaleField from '@/components/admin/LocaleField'
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

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title="Contact" subtitle="Manage contact details and form labels" onSave={save} saving={saving} />
      <div className="space-y-6 p-6">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <LocaleField labelEN="Hero Heading" labelAR="Hero Heading" valueEN={data.hero.headingEN} valueAR={data.hero.headingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, headingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, headingAR: value } })} />
          <LocaleField multiline labelEN="Hero Subheading" labelAR="Hero Subheading" valueEN={data.hero.subheadingEN} valueAR={data.hero.subheadingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, subheadingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, subheadingAR: value } })} />
        </div>
        <div className="grid gap-4 rounded-xl border border-gray-100 bg-white p-6 md:grid-cols-2">
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.email} onChange={(event) => setData({ ...data, info: { ...data.info, email: event.target.value } })} placeholder="Email" />
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.phone} onChange={(event) => setData({ ...data, info: { ...data.info, phone: event.target.value } })} placeholder="Phone" />
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.mapEmbedUrl} onChange={(event) => setData({ ...data, info: { ...data.info, mapEmbedUrl: event.target.value } })} placeholder="Map embed URL" />
          <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={data.info.bookingUrl} onChange={(event) => setData({ ...data, info: { ...data.info, bookingUrl: event.target.value } })} placeholder="Booking URL" />
          <LocaleField multiline labelEN="Address" labelAR="Address" valueEN={data.info.addressEN} valueAR={data.info.addressAR} onChangeEN={(value) => setData({ ...data, info: { ...data.info, addressEN: value } })} onChangeAR={(value) => setData({ ...data, info: { ...data.info, addressAR: value } })} />
        </div>
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Socials</h2>
            <button type="button" onClick={() => setData({ ...data, socials: [...data.socials, { platform: '', url: '' }] })} className="flex items-center gap-1 text-sm text-primary"><Plus size={14} />Add social</button>
          </div>
          {data.socials.map((social, index) => (
            <div key={`${social.platform}-${index}`} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
              <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={social.platform} onChange={(event) => setData({ ...data, socials: data.socials.map((entry, itemIndex) => itemIndex === index ? { ...entry, platform: event.target.value } : entry) })} placeholder="Platform" />
              <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={social.url} onChange={(event) => setData({ ...data, socials: data.socials.map((entry, itemIndex) => itemIndex === index ? { ...entry, url: event.target.value } : entry) })} placeholder="URL" />
              <button type="button" onClick={() => setData({ ...data, socials: data.socials.filter((_, itemIndex) => itemIndex !== index) })} className="text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="font-semibold text-foreground">Form Fields</h2>
          {data.formFields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={field.id} onChange={(event) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, id: event.target.value } : entry) })} placeholder="Field id" />
                <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={field.type} onChange={(event) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, type: event.target.value } : entry) })} placeholder="Field type" />
                <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={field.required} onChange={(event) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, required: event.target.checked } : entry) })} />Required</label>
              </div>
              <LocaleField labelEN="Label" labelAR="Label" valueEN={field.labelEN} valueAR={field.labelAR} onChangeEN={(value) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelEN: value } : entry) })} onChangeAR={(value) => setData({ ...data, formFields: data.formFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelAR: value } : entry) })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
