'use client'

import slugify from 'slugify'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import MDXPreview from '@/components/blog/MDXPreview'

const starterContent = `---
slug: new-article
title: New Worth Article
---

## Introduction

Write your article in MDX here.
`

export default function AdminNewBlogPage() {
  const router = useRouter()
  const [titleEN, setTitleEN] = useState('')
  const [titleAR, setTitleAR] = useState('')
  const [slug, setSlug] = useState('')
  const [excerptEN, setExcerptEN] = useState('')
  const [excerptAR, setExcerptAR] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [author, setAuthor] = useState('Worth Team')
  const [tags, setTags] = useState('marketing, strategy')
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [mdxContent, setMdxContent] = useState(starterContent)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('editor')
  const { t } = useTranslation()

  const save = async () => {
    const safeSlug = slug || slugify(titleEN || 'article', { lower: true, strict: true })
    setSaving(true)
    const response = await fetch('/api/admin/blog/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: safeSlug,
        mdxContent,
        meta: {
          slug: safeSlug,
          titleEN,
          titleAR,
          excerptEN,
          excerptAR,
          author,
          coverUrl,
          tags: tags.split(',').map((item) => item.trim()).filter(Boolean),
          status,
          publishedAt,
          updatedAt: publishedAt,
        },
      }),
    })
    setSaving(false)

    if (response.ok) {
      router.push(`/admin/blog/${safeSlug}`)
    }
  }

  return (
    <div>
      <AdminHeader title={t('admin.blog.newArticleTitle')} subtitle={t('admin.blog.newArticleSubtitle')} onSave={save} saving={saving} />
      <div className="grid gap-6 p-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <LocaleField labelEN="Title" labelAR="Title" valueEN={titleEN} valueAR={titleAR} onChangeEN={(value) => { setTitleEN(value); setSlug(slugify(value || 'article', { lower: true, strict: true })) }} onChangeAR={setTitleAR} />
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">{t('admin.blog.slug')}</label>
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={slug} onChange={(event) => setSlug(event.target.value)} />
          </div>
          <LocaleField multiline labelEN="Excerpt" labelAR="Excerpt" valueEN={excerptEN} valueAR={excerptAR} onChangeEN={(value) => setExcerptEN(value.slice(0, 160))} onChangeAR={(value) => setExcerptAR(value.slice(0, 160))} />
          <ImageField label={t('admin.blog.coverUrl')} value={coverUrl} onChange={setCoverUrl} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder={t('admin.blog.authorPlaceholder')} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={tags} onChange={(event) => setTags(event.target.value)} placeholder={t('admin.blog.tagsPlaceholder')} />
          <input type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={publishedAt} onChange={(event) => setPublishedAt(event.target.value)} />
          <div className="flex items-center gap-3">
            <Switch checked={status === 'published'} onCheckedChange={(checked) => setStatus(checked ? 'published' : 'draft')} id="published-new" />
            <label htmlFor="published-new" className="cursor-pointer text-sm font-medium text-foreground">{t('admin.blog.publishedLabel')}</label>
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
