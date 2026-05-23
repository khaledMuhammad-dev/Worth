'use client'

import slugify from 'slugify'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'

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
      <AdminHeader title="New Article" subtitle="Create a new bilingual blog post" onSave={save} saving={saving} />
      <div className="grid gap-6 p-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <LocaleField labelEN="Title" labelAR="Title" valueEN={titleEN} valueAR={titleAR} onChangeEN={(value) => { setTitleEN(value); setSlug(slugify(value || 'article', { lower: true, strict: true })) }} onChangeAR={setTitleAR} />
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Slug</label>
            <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={slug} onChange={(event) => setSlug(event.target.value)} />
          </div>
          <LocaleField multiline labelEN="Excerpt" labelAR="Excerpt" valueEN={excerptEN} valueAR={excerptAR} onChangeEN={(value) => setExcerptEN(value.slice(0, 160))} onChangeAR={(value) => setExcerptAR(value.slice(0, 160))} />
          <ImageField label="Cover URL" value={coverUrl} onChange={setCoverUrl} />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author" />
          <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="Tags, comma separated" />
          <input type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={publishedAt} onChange={(event) => setPublishedAt(event.target.value)} />
          <label className="flex items-center gap-2 text-sm font-medium text-foreground"><input type="checkbox" checked={status === 'published'} onChange={(event) => setStatus(event.target.checked ? 'published' : 'draft')} />Published</label>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <div className="mb-3 text-sm font-medium text-foreground">MDX Editor</div>
          <textarea value={mdxContent} onChange={(event) => setMdxContent(event.target.value)} className="min-h-[700px] w-full rounded-xl border border-gray-200 p-4 font-mono text-sm focus:border-primary focus:outline-none" />
        </div>
      </div>
    </div>
  )
}
