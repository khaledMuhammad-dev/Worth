'use client'

import { useState } from 'react'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/work.json'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'

interface Project {
  id: string
  slug: string
  titleEN: string
  titleAR: string
  coverUrl: string
  tags: string[]
  industryEN: string
  industryAR: string
  year: string
  featured: boolean
  summaryEN: string
  summaryAR: string
  challengeEN: string
  challengeAR: string
  solutionEN: string
  solutionAR: string
  resultsEN: string[]
  resultsAR: string[]
  galleryUrls: string[]
}

export default function AdminWorkPage() {
  const [projects, setProjects] = useState<Project[]>(() => JSON.parse(JSON.stringify(initialData.projects)))
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const { t } = useTranslation()
  const [form, setForm] = useState<Project>({
    id: '',
    slug: '',
    titleEN: '',
    titleAR: '',
    coverUrl: '',
    tags: [],
    industryEN: '',
    industryAR: '',
    year: '',
    featured: false,
    summaryEN: '',
    summaryAR: '',
    challengeEN: '',
    challengeAR: '',
    solutionEN: '',
    solutionAR: '',
    resultsEN: [''],
    resultsAR: [''],
    galleryUrls: [''],
  })

  const persist = async (nextProjects: Project[]) => {
    setProjects(nextProjects)
    await fetch('/api/admin/save/work', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects: nextProjects }),
    })
  }

  const openCreate = () => {
    setEditingId(null)
    setForm({ ...form, id: '', slug: '', titleEN: '', titleAR: '', coverUrl: '', tags: [], industryEN: '', industryAR: '', year: '', featured: false, summaryEN: '', summaryAR: '', challengeEN: '', challengeAR: '', solutionEN: '', solutionAR: '', resultsEN: [''], resultsAR: [''], galleryUrls: [''] })
    setOpen(true)
  }

  const openEdit = (project: Project) => {
    setEditingId(project.id)
    setForm(JSON.parse(JSON.stringify(project)))
    setOpen(true)
  }

  const saveProject = async () => {
    setSaving(true)
    const nextProjects = editingId
      ? projects.map((project) => (project.id === editingId ? form : project))
      : [...projects, { ...form, id: Date.now().toString() }]
    await persist(nextProjects)
    setSaving(false)
    setOpen(false)
  }

  const removeProject = async (id: string) => {
    await persist(projects.filter((project) => project.id !== id))
  }

  return (
    <div>
      <AdminHeader title={t('admin.work.title')} subtitle={t('admin.work.subtitle')} />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"><Plus size={16} />{t('admin.work.addProject')}</button>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3">{t('admin.work.tableTitle')}</th>
                <th className="px-4 py-3">{t('admin.work.tableSlug')}</th>
                <th className="px-4 py-3">{t('admin.work.tableYear')}</th>
                <th className="px-4 py-3">{t('admin.work.tableFeatured')}</th>
                <th className="px-4 py-3">{t('admin.work.tableActions')}</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
                    <p className="text-sm font-medium text-foreground">{t('admin.work.noProjects')}</p>
                    <p className="mt-1 text-xs text-muted">{t('admin.work.noProjectsHint')}</p>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-foreground">{project.titleEN}</td>
                    <td className="px-4 py-3 text-muted">{project.slug}</td>
                    <td className="px-4 py-3 text-muted">{project.year}</td>
                    <td className="px-4 py-3">{project.featured ? t('admin.work.yes') : t('admin.work.no')}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button type="button" onClick={() => openEdit(project)} className="text-gray-400 hover:text-primary"><Edit2 size={16} /></button>
                        <button type="button" onClick={() => setConfirmId(project.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full max-w-2xl overflow-y-auto sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{editingId ? t('admin.work.editProject') : t('admin.work.newProject')}</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 px-6 pb-6">
            <div className="grid gap-3 md:grid-cols-2">
              <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder={t('admin.work.slug')} />
              <input className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} placeholder={t('admin.work.year')} />
            </div>
            <LocaleField labelEN="Title" labelAR="العنوان" valueEN={form.titleEN} valueAR={form.titleAR} onChangeEN={(value) => setForm({ ...form, titleEN: value })} onChangeAR={(value) => setForm({ ...form, titleAR: value })} />
            <ImageField label={t('admin.work.coverUrl')} value={form.coverUrl} onChange={(value) => setForm({ ...form, coverUrl: value })} />
            <LocaleField labelEN="Industry" labelAR="القطاع" valueEN={form.industryEN} valueAR={form.industryAR} onChangeEN={(value) => setForm({ ...form, industryEN: value })} onChangeAR={(value) => setForm({ ...form, industryAR: value })} />
            <LocaleField multiline labelEN="Summary" labelAR="الملخص" valueEN={form.summaryEN} valueAR={form.summaryAR} onChangeEN={(value) => setForm({ ...form, summaryEN: value })} onChangeAR={(value) => setForm({ ...form, summaryAR: value })} />
            <LocaleField multiline labelEN="Challenge" labelAR="التحدي" valueEN={form.challengeEN} valueAR={form.challengeAR} onChangeEN={(value) => setForm({ ...form, challengeEN: value })} onChangeAR={(value) => setForm({ ...form, challengeAR: value })} />
            <LocaleField multiline labelEN="Solution" labelAR="الحل" valueEN={form.solutionEN} valueAR={form.solutionAR} onChangeEN={(value) => setForm({ ...form, solutionEN: value })} onChangeAR={(value) => setForm({ ...form, solutionAR: value })} />
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">{t('admin.work.tagsLabel')}</label>
              <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={form.tags.join(', ')} onChange={(event) => setForm({ ...form, tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{t('admin.work.resultsEN')}</h3>
              {form.resultsEN.map((result, index) => (
                <div key={index} className="flex gap-2">
                  <input className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm" value={result} onChange={(event) => setForm({ ...form, resultsEN: form.resultsEN.map((entry, itemIndex) => itemIndex === index ? event.target.value : entry) })} />
                  <button type="button" onClick={() => setForm({ ...form, resultsEN: form.resultsEN.filter((_, itemIndex) => itemIndex !== index) })} className="text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => setForm({ ...form, resultsEN: [...form.resultsEN, ''] })} className="text-sm text-primary">{t('admin.work.addResult')}</button>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{t('admin.work.resultsAR')}</h3>
              {form.resultsAR.map((result, index) => (
                <div key={index} className="flex gap-2">
                  <input dir="rtl" className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-arabic" value={result} onChange={(event) => setForm({ ...form, resultsAR: form.resultsAR.map((entry, itemIndex) => itemIndex === index ? event.target.value : entry) })} />
                  <button type="button" onClick={() => setForm({ ...form, resultsAR: form.resultsAR.filter((_, itemIndex) => itemIndex !== index) })} className="text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => setForm({ ...form, resultsAR: [...form.resultsAR, ''] })} className="text-sm text-primary">{t('admin.work.addResult')}</button>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{t('admin.work.galleryUrls')}</h3>
              {form.galleryUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm" value={url} onChange={(event) => setForm({ ...form, galleryUrls: form.galleryUrls.map((entry, itemIndex) => itemIndex === index ? event.target.value : entry) })} />
                  <button type="button" onClick={() => setForm({ ...form, galleryUrls: form.galleryUrls.filter((_, itemIndex) => itemIndex !== index) })} className="text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => setForm({ ...form, galleryUrls: [...form.galleryUrls, ''] })} className="text-sm text-primary">{t('admin.work.addImage')}</button>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">{t('admin.work.featured')}</label>
              <Switch checked={form.featured} onCheckedChange={(checked) => setForm({ ...form, featured: checked })} />
            </div>
            <button type="button" onClick={saveProject} disabled={saving} className="w-full rounded-lg bg-primary py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60">{saving ? t('admin.work.savingProject') : t('admin.work.saveProject')}</button>
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirmId !== null}
        title={t('admin.work.deleteProject')}
        description={`"${projects.find((p) => p.id === confirmId)?.titleEN ?? ''}" ${t('admin.work.deleteProjectDesc')}`}
        confirmLabel={t('admin.work.deleteProject')}
        onConfirm={() => { if (confirmId) { void removeProject(confirmId); setConfirmId(null) } }}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
