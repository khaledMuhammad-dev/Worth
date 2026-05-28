'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import MDXPreview from '@/components/blog/MDXPreview'

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
  const [activeTab, setActiveTab] = useState('editor')
  const { t } = useTranslation()

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
    return <div className="p-6 text-sm text-muted">{t('admin.blog.loadingArticle')}</div>
  }

  return (
    <div>
      <AdminHeader title={t('admin.blog.editTitle', { title: meta.titleEN })} subtitle={t('admin.blog.editArticleSubtitle')} onSave={save} saving={saving} />
      <div className="grid gap-6 p-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <LocaleField labelEN="Title" labelAR="العنوان" valueEN={meta.titleEN} valueAR={meta.titleAR} onChangeEN={(value) => setMeta({ ...meta, titleEN: value })} onChangeAR={(value) => setMeta({ ...meta, titleAR: value })} />
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">{t('admin.blog.slug')}</label>
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-gray-50" value={meta.slug} readOnly />
          </div>
          <LocaleField multiline labelEN="Excerpt" labelAR="المقتطف" valueEN={meta.excerptEN} valueAR={meta.excerptAR} onChangeEN={(value) => setMeta({ ...meta, excerptEN: value.slice(0, 160) })} onChangeAR={(value) => setMeta({ ...meta, excerptAR: value.slice(0, 160) })} />
          <ImageField label={t('admin.blog.coverUrl')} value={meta.coverUrl} onChange={(value) => setMeta({ ...meta, coverUrl: value })} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={meta.author} onChange={(event) => setMeta({ ...meta, author: event.target.value })} placeholder={t('admin.blog.authorPlaceholder')} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={meta.tags.join(', ')} onChange={(event) => setMeta({ ...meta, tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} placeholder={t('admin.blog.tagsPlaceholderShort')} />
          <input type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={meta.publishedAt} onChange={(event) => setMeta({ ...meta, publishedAt: event.target.value })} />
          <div className="flex items-center gap-3">
            <Switch checked={meta.status === 'published'} onCheckedChange={(checked) => setMeta({ ...meta, status: checked ? 'published' : 'draft' })} id="published-edit" />
            <label htmlFor="published-edit" className="cursor-pointer text-sm font-medium text-foreground">{t('admin.blog.publishedLabel')}</label>
          </div>
        </div>

        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-gray-100 bg-white px-6 py-4">
              <span className="text-sm font-medium text-foreground">{t('admin.blog.contentLabel')}</span>
              <TabsList>
                <TabsTrigger value="editor">{t('admin.blog.mdxEditorTab')}</TabsTrigger>
                <TabsTrigger value="preview">{t('admin.blog.previewTab')}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor">
              <div className="rounded-b-xl border border-gray-100 bg-white p-4">
                <textarea
                  value={mdxContent}
                  onChange={(event) => setMdxContent(event.target.value)}
                  className="min-h-[700px] w-full rounded-xl border border-gray-200 p-4 font-mono text-sm focus:border-primary focus:outline-none"
                  placeholder="Write MDX content here…"
                />
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <div className="rounded-b-xl border border-gray-100 bg-gray-50 p-4">
                <MDXPreview content={mdxContent} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
