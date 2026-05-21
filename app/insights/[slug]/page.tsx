import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticlePageClient from './ArticlePageClient';
import { articles, getArticleBySlug } from '@/lib/site-data';

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Article Not Found | Worth Agency' };
  }

  return {
    title: `${article.title} | Worth Agency`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return <ArticlePageClient article={article} />;
}
