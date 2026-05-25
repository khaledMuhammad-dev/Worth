'use client'

import { useState, useEffect } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Callout from './Callout'
import CloudinaryImage from './CloudinaryImage'
import Quote from './Quote'
import VideoEmbed from './VideoEmbed'

const components = { VideoEmbed, CloudinaryImage, Callout, Quote }

interface MDXPreviewProps {
  content: string
}

export default function MDXPreview({ content }: MDXPreviewProps) {
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!content.trim()) return
    setLoading(true)
    setError('')

    fetch('/api/admin/blog/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else setSource(data.mdxSource)
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [content])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-muted">
        <span className="animate-pulse">Rendering preview…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[400px] rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="mb-2 text-sm font-medium text-red-700">MDX parse error</p>
        <pre className="whitespace-pre-wrap font-mono text-xs text-red-600">{error}</pre>
      </div>
    )
  }

  if (!source) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-muted">
        No content to preview yet.
      </div>
    )
  }

  return (
    <div className="min-h-[400px] rounded-xl border border-gray-100 bg-white p-8">
      <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-l-primary prose-code:rounded prose-code:bg-orange-50 prose-code:px-1 prose-code:text-primary">
        <MDXRemote {...source} components={components} />
      </div>
    </div>
  )
}
