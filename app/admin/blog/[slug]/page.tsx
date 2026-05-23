'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'

interface BlogMeta {
  slug: string
  titleEN: string
  titleAR: string
  excerptEN: string
  excerptAR: string
  author: string
  coverUrl: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt: string
  updatedAt: string
}

export default function AdminEditBlogPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params.slug
  const [meta, setMeta] = useState<BlogMeta | null>(null)
  const [mdxContent, setMdxContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/admin/blog/${slug}`)
      if (!response.ok) {
        setLoading(false)
        return
      }
      const payload = await response.json()
      setMeta(payload.meta)
      setMdxContent(payload.mdxContent)
      setLoading(false)
    }
    void load()
  }, [slug])

  const save = async () => {
    if (!meta) return
    setSaving(true)
    const response = await fetch('/api/admin/blog/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, mdxContent, meta }),
    })
    setSaving(false)
    if (response.ok) router.refresh()
  }

  if (loading || !meta) {
    return <div className="p-6 text-sm text-muted">Loading article...</div>
  }

  return (
    <div>
      <AdminHeader title={`Edit: ${meta.titleEN}`} subtitle="Update article metadata and MDX content" onSave={save} saving={saving} />
      <div className="grid gap-6 p-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <LocaleField labelEN="Title" labelAR="Title" valueEN={meta.titleEN} valueAR={meta.titleAR} onChangeEN={(value) => setMeta({ ...meta, titleEN: value })} onChangeAR={(value) => setMeta({ ...meta, titleAR: value })} />
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Slug</label>
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-gray-50" value={meta.slug} readOnly />
          </div>
          <LocaleField multiline labelEN="Excerpt" labelAR="Excerpt" valueEN={meta.excerptEN} valueAR={meta.excerptAR} onChangeEN={(value) => setMeta({ ...meta, excerptEN: value.slice(0, 160) })} onChangeAR={(value) => setMeta({ ...meta, excerptAR: value.slice(0, 160) })} />
          <ImageField label="Cover URL" value={meta.coverUrl} onChange={(value) => setMeta({ ...meta, coverUrl: value })} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={meta.author} onChange={(event) => setMeta({ ...meta, author: event.target.value })} placeholder="Author" />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={meta.tags.join(', ')} onChange={(event) => setMeta({ ...meta, tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} placeholder="Tags" />
          <input type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={meta.publishedAt} onChange={(event) => setMeta({ ...meta, publishedAt: event.target.value })} />
          <label className="flex items-center gap-2 text-sm font-medium text-foreground"><input type="checkbox" checked={meta.status === 'published'} onChange={(event) => setMeta({ ...meta, status: event.target.checked ? 'published' : 'draft' })} />Published</label>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <div className="mb-3 text-sm font-medium text-foreground">MDX Editor</div>
          <textarea value={mdxContent} onChange={(event) => setMdxContent(event.target.value)} className="min-h-[700px] w-full rounded-xl border border-gray-200 p-4 font-mono text-sm focus:border-primary focus:outline-none" />
        </div>
      </div>
    </div>
  )
}
