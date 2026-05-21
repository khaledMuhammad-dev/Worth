'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import type { ArticleDetail } from '@/lib/site-data';

export default function ArticlePageClient({ article }: { article: ArticleDetail }) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={article.title}
          subtitle={article.excerpt}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: article.title },
          ]}
        />

        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 rounded-[2rem] bg-gradient-to-br from-[#1A1A2E] to-[#F97316] min-h-[320px]" />
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#6B7280] mb-10">
              <span className="rounded-full bg-[#FFF4EE] px-3 py-1 font-semibold text-[#F97316]">{article.category}</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.author} — {article.role}</span>
            </div>
            <div className="space-y-12">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-lg leading-8 text-[#6B7280]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
