'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import type { BlogMeta } from '@/lib/content';

interface Props {
  posts: BlogMeta[];
}

export default function InsightsPageClient({ posts }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [email, setEmail] = useState('');
  const featured = useMemo(() => posts[0], [posts]);
  const others = useMemo(() => posts.slice(1, 7), [posts]);

  if (!featured) {
    return (
      <>
        <Navbar />
        <main>
          <PageHero
            title={t('pageHero.insights')}
            subtitle={t('insights.subtitle')}
            breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.insights') }]}
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageHero.insights')}
          subtitle={t('insights.subtitle')}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.insights') }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('insights.title')} accent={t('insights.titleAccent')} subtitle={t('insights.subtitle')} />
            <Link href={`/insights/${featured.slug}`} className="group grid lg:grid-cols-[1.2fr_0.8fr] gap-8 rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div
                className="rounded-[1.5rem] bg-gradient-to-br from-[#1A1A2E] to-[#F97316] min-h-[280px]"
                style={{ backgroundImage: featured.coverUrl ? `url(${featured.coverUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="flex flex-col justify-center">
                <span className="inline-flex w-fit rounded-full bg-[#FFF4EE] px-3 py-1 text-xs font-semibold text-[#F97316]">{t('insights.featured')}</span>
                <h2 className="mt-4 text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{isArabic ? featured.titleAR : featured.titleEN}</h2>
                <p className="mt-4 text-[#6B7280] leading-8">{isArabic ? featured.excerptAR : featured.excerptEN}</p>
                <div className="mt-6 flex items-center gap-3 text-sm text-[#6B7280]">
                  <span>{featured.tags[0] ?? 'Insights'}</span>
                  <span>•</span>
                  <span>{featured.publishedAt}</span>
                  <span>•</span>
                  <span>{featured.author}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#F97316] group-hover:gap-3 transition-all">
                  {t('insights.readMore')} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {others.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="group rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="mb-5 h-48 rounded-2xl bg-gradient-to-br from-[#FFF4EE] to-[#F97316]/20"
                  style={{ backgroundImage: article.coverUrl ? `url(${article.coverUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="text-sm text-[#F97316] font-semibold">{article.tags[0] ?? 'Insights'}</div>
                <h3 className="mt-3 text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{isArabic ? article.titleAR : article.titleEN}</h3>
                <p className="mt-4 text-[#6B7280] leading-7">{isArabic ? article.excerptAR : article.excerptEN}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-[#6B7280]">
                  <span>{article.publishedAt}</span>
                  <span>{article.author}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] bg-[#1A1A2E] p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t('insights.newsletter.title')}</h2>
              <p className="mt-3 text-white/70 text-lg">{t('insights.newsletter.subtitle')}</p>
              <form
                className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                onSubmit={(event) => {
                  event.preventDefault();
                  setEmail('');
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('insights.newsletter.placeholder')}
                  className="h-14 flex-1 rounded-xl border border-white/10 bg-white/10 px-5 text-white placeholder:text-white/40 focus:outline-none"
                />
                <Button type="submit" size="lg">{t('insights.newsletter.button')}</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
