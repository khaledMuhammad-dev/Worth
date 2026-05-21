'use client';

import { useTranslation } from 'react-i18next';
import { Compass, Database, Handshake, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABanner } from '@/components/shared/CTABanner';
import { teamMembers, clientLogos } from '@/lib/site-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function AboutPageClient() {
  const { t } = useTranslation();

  const values = [
    { icon: Compass, title: t('about.values.bold.title'), body: t('about.values.bold.description') },
    { icon: Database, title: t('about.values.data.title'), body: t('about.values.data.description') },
    { icon: Handshake, title: t('about.values.partnership.title'), body: t('about.values.partnership.description') },
    { icon: Sparkles, title: t('about.values.craft.title'), body: t('about.values.craft.description') },
  ];

  const milestones = ['2020', '2021', '2022', '2023', '2024'] as const;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageHero.about')}
          subtitle={t('about.body')}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.about') }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
            <div>
              <SectionHeading title={t('about.whoWeAre')} accent={t('about.titleAccent')} center={false} />
              <div className="space-y-6 text-lg leading-8 text-[#6B7280] max-w-3xl">
                <p>{t('about.whoBody1')}</p>
                <p>{t('about.whoBody2')}</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-8 shadow-sm">
              <div className="grid gap-5">
                {[
                  ['Ambitious by design', 'We help businesses look sharper, communicate clearly, and move with more confidence.'],
                  ['Built for modern teams', 'Our process is collaborative, transparent, and made for fast-moving stakeholders.'],
                  ['Measured by impact', 'We care about outcomes just as much as we care about aesthetics.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-3xl bg-white border border-[#F0F0F0] p-6">
                    <h3 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                    <p className="mt-3 text-[#6B7280] leading-7">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F97316]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-10 md:p-14 backdrop-blur-sm">
              <p className="text-white/80 uppercase text-sm tracking-[0.2em]">{t('about.philosophy')}</p>
              <h2 className="mt-4 text-3xl md:text-5xl text-white max-w-4xl">
                Strategy gives direction. Creativity gives momentum. Craft makes it unforgettable.
              </h2>
              <p className="mt-6 text-white/80 text-lg leading-8 max-w-3xl">{t('about.philosophyBody')}</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.values.title')} accent={t('about.values.titleAccent')} />
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4EE]">
                    <Icon className="h-5 w-5 text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                  <p className="mt-3 text-[#6B7280] leading-7">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.team.title')} accent={t('about.team.titleAccent')} subtitle={t('about.team.subtitle')} />
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] p-6 shadow-sm">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>{member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-5 text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#F97316]">{member.role}</p>
                  <p className="mt-4 text-[#6B7280] leading-7">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#1A1A2E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.milestones.title')} accent={t('about.milestones.titleAccent')} />
            <div className="relative mt-14 border-s border-white/10 ms-4">
              {milestones.map((year) => (
                <div key={year} className="mb-10 ms-8 last:mb-0">
                  <span className="absolute -start-[11px] flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#1A1A2E] bg-[#F97316]" />
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#F97316]">{t(`about.milestones.${year}.year`)}</p>
                    <h3 className="mt-2 text-2xl text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t(`about.milestones.${year}.title`)}</h3>
                    <p className="mt-3 text-white/70 leading-7">{t(`about.milestones.${year}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.clients.title')} accent={t('about.clients.titleAccent')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {clientLogos.map((logo) => (
                <div key={logo} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] py-8 px-4 text-center text-[#6B7280] font-semibold tracking-[0.2em] text-sm">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
