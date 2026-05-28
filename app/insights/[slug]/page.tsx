import type { Metadata } from 'next'
import ArticlePageClient from './ArticlePageClient'
import { getBlogMeta, getBlogPost } from '@/lib/content'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const posts = await getBlogMeta()
  return posts.filter((p) => p.status === 'published').map((p) => ({ slug: p.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allMeta = await getBlogMeta()
  const meta = allMeta.find((p) => p.slug === slug)
  if (!meta || meta.status !== 'published') notFound()

  const raw = await getBlogPost(slug)
  const { content } = matter(raw)
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] },
  })

  const related = allMeta
    .filter((p) => p.slug !== slug && p.status === 'published' && p.tags.some((tag) => meta.tags.includes(tag)))
    .slice(0, 3)

  return <ArticlePageClient meta={meta} mdxSource={mdxSource} related={related} />
}

export const metadata: Metadata = {
  title: 'Insights | Worth Agency',
}
