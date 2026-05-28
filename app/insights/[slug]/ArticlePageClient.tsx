'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import MDXRenderer from '@/components/blog/MDXRenderer';
import type { BlogMeta } from '@/lib/content';

interface Props {
  meta: BlogMeta;
  mdxSource: MDXRemoteSerializeResult;
  related: BlogMeta[];
}

export default function ArticlePageClient({ meta, mdxSource, related }: Props) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const title = isArabic ? meta.titleAR : meta.titleEN;
  const excerpt = isArabic ? meta.excerptAR : meta.excerptEN;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={title}
          subtitle={excerpt}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: title },
          ]}
        />

        <article className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="mb-10 rounded-[2rem] bg-gradient-to-br from-[#1A1A2E] to-[#F97316] min-h-[320px]"
              style={{ backgroundImage: meta.coverUrl ? `url(${meta.coverUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="mb-10 flex flex-wrap items-center gap-3 text-sm text-[#6B7280] dark:text-sop-muted">
              {(meta.tags.length ? meta.tags : ['Insights']).map((tag) => (
                <span key={tag} className="rounded-full bg-[#FFF4EE] px-3 py-1 font-semibold text-[#F97316] dark:bg-sop-hover dark:text-sop-purple">{tag}</span>
              ))}
              <span>{meta.publishedAt}</span>
              <span>•</span>
              <span>{meta.author}</span>
            </div>
            <div className="space-y-12">
              <MDXRenderer source={mdxSource} />
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="bg-[#F9FAFB] py-20 dark:bg-sop-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>Related Articles</h2>
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link key={item.slug} href={`/insights/${item.slug}`} className="rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-sop-border dark:bg-sop-elevated dark:shadow-sop-card dark:hover:shadow-sop-purple">
                    <div className="text-sm font-semibold text-[#F97316]">{item.tags[0] ?? 'Insights'}</div>
                    <h3 className="mt-3 text-xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{isArabic ? item.titleAR : item.titleEN}</h3>
                    <p className="mt-3 text-[#6B7280] leading-7 dark:text-sop-muted">{isArabic ? item.excerptAR : item.excerptEN}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
