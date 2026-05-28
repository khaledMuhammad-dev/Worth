'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import initialData from '@/content/data/blog-meta.json'

interface BlogMeta {
  slug: string
  titleEN: string
  titleAR: string
  excerptEN: string
  excerptAR: string
  author: string
  coverUrl: string
  tags: string[]
  status: string
  publishedAt: string
  updatedAt: string
}

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogMeta[]>(() => JSON.parse(JSON.stringify(initialData)))
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null)
  const { t } = useTranslation()

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesStatus = filter === 'all' || item.status === filter
      const search = query.toLowerCase()
      const matchesQuery = [item.titleEN, item.titleAR, item.slug, item.author, item.tags.join(' ')].join(' ').toLowerCase().includes(search)
      return matchesStatus && matchesQuery
    })
  }, [filter, items, query])

  const remove = async (slug: string) => {
    await fetch('/api/admin/blog/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
    setItems((current) => current.filter((item) => item.slug !== slug))
  }

  return (
    <div>
      <AdminHeader title={t('admin.blog.title')} subtitle={t('admin.blog.subtitle')} />
      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 md:flex-row md:items-center md:justify-between">
          <input className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 text-sm" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('admin.blog.searchPlaceholder')} />
          <div className="flex flex-wrap gap-2">
            {(['all', 'published', 'draft'] as const).map((value) => (
              <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-sm ${filter === value ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>
                {t(`admin.blog.${value}`)}
              </button>
            ))}
            <Link href="/admin/blog/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">{t('admin.blog.newArticle')}</Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3">{t('admin.blog.tableTitle')}</th>
                <th className="px-4 py-3">{t('admin.blog.tableStatus')}</th>
                <th className="px-4 py-3">{t('admin.blog.tableAuthor')}</th>
                <th className="px-4 py-3">{t('admin.blog.tableUpdated')}</th>
                <th className="px-4 py-3">{t('admin.blog.tableActions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
                    <p className="text-sm font-medium text-foreground">{t('admin.blog.noArticles')}</p>
                    <p className="mt-1 text-xs text-muted">
                      {query || filter !== 'all' ? t('admin.blog.noArticlesFilterHint') : t('admin.blog.noArticlesHint')}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.slug} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{item.titleEN}</div>
                      <div className="text-xs text-muted">/{item.slug}</div>
                    </td>
                    <td className="px-4 py-3 capitalize">{item.status}</td>
                    <td className="px-4 py-3 text-muted">{item.author}</td>
                    <td className="px-4 py-3 text-muted">{item.updatedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link href={`/admin/blog/${item.slug}`} className="text-gray-400 hover:text-primary"><Pencil size={16} /></Link>
                        <button type="button" onClick={() => setConfirmSlug(item.slug)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmSlug !== null}
        title={t('admin.blog.deleteTitle')}
        description={`"${items.find((i) => i.slug === confirmSlug)?.titleEN ?? confirmSlug}" ${t('admin.blog.deleteDesc')}`}
        confirmLabel={t('admin.blog.deleteArticle')}
        onConfirm={() => { if (confirmSlug) { void remove(confirmSlug); setConfirmSlug(null) } }}
        onCancel={() => setConfirmSlug(null)}
      />
    </div>
  )
}
