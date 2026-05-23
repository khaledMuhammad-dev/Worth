'use client'

import { useMemo, useState } from 'react'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'
import initialData from '@/content/data/announcements.json'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

interface Announcement {
  id: string
  active: boolean
  priority: number
  messageEN: string
  messageAR: string
  ctaLabelEN: string
  ctaLabelAR: string
  ctaHref: string
  bgColor: string
  textColor: string
  emoji: string
  startDate: string
  expiryDate: string
  dismissible: boolean
}

const emptyForm: Omit<Announcement, 'id' | 'priority'> = {
  active: true,
  messageEN: '',
  messageAR: '',
  ctaLabelEN: '',
  ctaLabelAR: '',
  ctaHref: '/pricing',
  bgColor: '#F97316',
  textColor: '#ffffff',
  emoji: '🎉',
  startDate: '',
  expiryDate: '',
  dismissible: true,
}

export default function AnnouncementPage() {
  const [items, setItems] = useState<Announcement[]>(() => JSON.parse(JSON.stringify(initialData)))
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const sortedItems = useMemo(() => [...items].sort((a, b) => a.priority - b.priority), [items])

  const persist = async (nextItems: Announcement[]) => {
    setItems(nextItems)
    await fetch('/api/admin/save/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextItems),
    })
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (item: Announcement) => {
    setEditingId(item.id)
    setForm({
      active: item.active,
      messageEN: item.messageEN,
      messageAR: item.messageAR,
      ctaLabelEN: item.ctaLabelEN,
      ctaLabelAR: item.ctaLabelAR,
      ctaHref: item.ctaHref,
      bgColor: item.bgColor,
      textColor: item.textColor,
      emoji: item.emoji,
      startDate: item.startDate,
      expiryDate: item.expiryDate,
      dismissible: item.dismissible,
    })
    setOpen(true)
  }

  const saveItem = async () => {
    setSaving(true)
    const nextItems = editingId
      ? items.map((item) =>
          item.id === editingId ? { ...item, ...form } : item
        )
      : [...items, { id: Date.now().toString(), priority: items.length + 1, ...form }]

    await persist(nextItems)
    setSaving(false)
    setOpen(false)
  }

  const removeItem = async (id: string) => {
    const nextItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, priority: index + 1 }))
    await persist(nextItems)
  }

  const toggleActive = async (id: string) => {
    const nextItems = items.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    )
    await persist(nextItems)
  }

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <div>
      <AdminHeader title="Announcements" subtitle="Manage announcement bar messages" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Plus size={16} /> Add Announcement
          </button>
        </div>

        <div className="space-y-3">
          {sortedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4">
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-gray-500">#{item.priority}</span>
              <span className="text-xl">{item.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.messageEN}</p>
                <p className="text-xs text-muted">{item.startDate} → {item.expiryDate}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                {item.active ? 'Active' : 'Inactive'}
              </span>
              <button type="button" onClick={() => toggleActive(item.id)} className="rounded border border-gray-200 px-2 py-1 text-xs transition hover:bg-gray-50">Toggle</button>
              <button type="button" onClick={() => openEdit(item)} className="text-gray-400 transition hover:text-primary"><Edit2 size={16} /></button>
              <button type="button" onClick={() => removeItem(item.id)} className="text-gray-400 transition hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full max-w-md overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingId ? 'Edit Announcement' : 'New Announcement'}</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 px-6 pb-6">
            {[
              ['Message EN', 'messageEN'],
              ['CTA Label EN', 'ctaLabelEN'],
              ['CTA Href', 'ctaHref'],
              ['Emoji', 'emoji'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
                <input
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  value={form[key as keyof typeof form] as string}
                  onChange={(event) => updateField(key as keyof typeof form, event.target.value)}
                />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Message AR</label>
              <input dir="rtl" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-arabic" value={form.messageAR} onChange={(event) => updateField('messageAR', event.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">CTA Label AR</label>
              <input dir="rtl" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-arabic" value={form.ctaLabelAR} onChange={(event) => updateField('ctaLabelAR', event.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Background Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={form.bgColor} onChange={(event) => updateField('bgColor', event.target.value)} className="h-9 w-10 cursor-pointer rounded border" />
                  <span className="text-sm text-gray-600">{form.bgColor}</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Text Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={form.textColor} onChange={(event) => updateField('textColor', event.target.value)} className="h-9 w-10 cursor-pointer rounded border" />
                  <span className="text-sm text-gray-600">{form.textColor}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Start Date</label>
                <input type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.startDate} onChange={(event) => updateField('startDate', event.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Expiry Date</label>
                <input type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.expiryDate} onChange={(event) => updateField('expiryDate', event.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Active</label>
              <button type="button" onClick={() => updateField('active', !form.active)} className={`h-6 w-10 rounded-full transition ${form.active ? 'bg-primary' : 'bg-gray-200'}`}>
                <span className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Dismissible</label>
              <button type="button" onClick={() => updateField('dismissible', !form.dismissible)} className={`h-6 w-10 rounded-full transition ${form.dismissible ? 'bg-primary' : 'bg-gray-200'}`}>
                <span className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${form.dismissible ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <button type="button" onClick={saveItem} disabled={saving} className="w-full rounded-lg bg-primary py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Announcement'}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
