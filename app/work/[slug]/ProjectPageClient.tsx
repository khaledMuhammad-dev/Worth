'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Building2, BriefcaseBusiness, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { CTABanner } from '@/components/shared/CTABanner';
import type { ProjectDetail } from '@/lib/site-data';

export default function ProjectPageClient({ project, nextProject }: { project: ProjectDetail; nextProject: ProjectDetail }) {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={project.title}
          subtitle={project.summary}
          breadcrumb={[
            { label: t('pageHero.home'), href: '/' },
            { label: t('pageHero.work'), href: '/work' },
            { label: project.title },
          ]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 items-start">
              <div>
                <div className="rounded-[2rem] bg-gradient-to-br from-[#FFF4EE] via-white to-[#F97316]/15 min-h-[360px] border border-[#F0F0F0] shadow-sm" />
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  {[
                    { icon: Building2, label: 'Client', value: project.client },
                    { icon: BriefcaseBusiness, label: 'Industry', value: project.industry },
                    { icon: Target, label: 'Lead service', value: project.service },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4EE]">
                        <Icon className="h-4 w-4 text-[#F97316]" />
                      </div>
                      <p className="mt-4 text-sm text-[#6B7280]">{label}</p>
                      <p className="mt-1 font-semibold text-[#1A1A2E]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#FFF4EE] px-3 py-1 text-sm font-semibold text-[#F97316]">{tag}</span>
                  ))}
                </div>
                <div className="mt-8 space-y-5 text-lg leading-8 text-[#6B7280]">
                  {project.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">{t('work.challenge')}</p>
              <h2 className="mt-4 text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t('work.challenge')}</h2>
              <p className="mt-4 text-[#6B7280] leading-8">{project.challenge}</p>
            </div>
            <div className="rounded-3xl border border-[#F0F0F0] bg-white p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">{t('work.solution')}</p>
              <h2 className="mt-4 text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t('work.solution')}</h2>
              <p className="mt-4 text-[#6B7280] leading-8">{project.solution}</p>
            </div>
            <div className="rounded-3xl border border-[#F0F0F0] bg-[#1A1A2E] p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">{t('work.results')}</p>
              <h2 className="mt-4 text-3xl text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t('work.results')}</h2>
              <ul className="mt-5 space-y-4 text-white/80 leading-7">
                {project.results.map((result) => (
                  <li key={result} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">{result}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#F97316]">{t('work.nextProject')}</p>
                <h2 className="mt-3 text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{nextProject.title}</h2>
                <p className="mt-3 text-[#6B7280] max-w-2xl leading-8">{nextProject.summary}</p>
              </div>
              <Link href={`/work/${nextProject.slug}`} className="inline-flex items-center gap-2 font-semibold text-[#F97316] hover:gap-3 transition-all">
                {t('work.nextProject')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
