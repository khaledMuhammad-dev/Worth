'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Compass, Database, Handshake, Sparkles, Target, Lightbulb, Shield } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABanner } from '@/components/shared/CTABanner';
import type { AboutData } from '@/lib/types/content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const valueIconMap = {
  compass: Compass,
  data: Database,
  handshake: Handshake,
  sparkles: Sparkles,
  target: Target,
  lightbulb: Lightbulb,
  shield: Shield,
} as const;

interface Props {
  aboutData: AboutData;
}

export default function AboutPageClient({ aboutData }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const values = useMemo(
    () =>
      aboutData.values.map((value, index) => {
        const key = value.icon.toLowerCase() as keyof typeof valueIconMap;
        const fallbackIcons = [Compass, Database, Handshake, Sparkles] as const;
        return {
          icon: valueIconMap[key] ?? fallbackIcons[index % fallbackIcons.length],
          title: isArabic ? value.titleAR : value.titleEN,
          body: isArabic ? value.descriptionAR : value.descriptionEN,
        };
      }),
    [aboutData.values, isArabic]
  );

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={isArabic ? aboutData.hero.headingAR : aboutData.hero.headingEN}
          subtitle={isArabic ? aboutData.hero.subheadingAR : aboutData.hero.subheadingEN}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.about') }]}
        />

        <section className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
            <div>
              <SectionHeading title={t('about.whoWeAre')} accent={t('about.titleAccent')} center={false} />
              <div className="max-w-3xl space-y-6 text-lg leading-8 text-[#6B7280] dark:text-sop-muted">
                <p>{isArabic ? aboutData.story.bodyAR : aboutData.story.bodyEN}</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-8 shadow-sm dark:border-sop-border dark:bg-sop-surface dark:shadow-sop-card">
              <div className="grid gap-5">
                {aboutData.values.slice(0, 3).map((item) => {
                  const title = isArabic ? item.titleAR : item.titleEN;
                  const body = isArabic ? item.descriptionAR : item.descriptionEN;
                  return (
                    <div key={item.id} className="rounded-3xl border border-[#F0F0F0] bg-white p-6 dark:border-sop-border dark:bg-sop-elevated">
                      <h3 className="text-xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                      <p className="mt-3 text-[#6B7280] leading-7 dark:text-sop-muted">{body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F97316]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-10 md:p-14 backdrop-blur-sm">
              <p className="text-white/80 uppercase text-sm tracking-[0.2em]">{t('about.philosophy')}</p>
              <h2 className="mt-4 text-3xl md:text-5xl text-white max-w-4xl">
                {isArabic ? aboutData.story.headingAR : aboutData.story.headingEN}
              </h2>
              <p className="mt-6 text-white/80 text-lg leading-8 max-w-3xl">{t('about.philosophyBody')}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-20 dark:bg-sop-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.values.title')} accent={t('about.values.titleAccent')} />
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm dark:border-sop-border dark:bg-sop-elevated dark:shadow-sop-card">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4EE]">
                    <Icon className="h-5 w-5 text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                  <p className="mt-3 text-[#6B7280] leading-7 dark:text-sop-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.team.title')} accent={t('about.team.titleAccent')} subtitle={t('about.team.subtitle')} />
            <div className="grid md:grid-cols-3 gap-6">
              {aboutData.team.map((member) => (
                <div key={member.id} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] p-6 shadow-sm dark:border-sop-border dark:bg-sop-surface dark:shadow-sop-card">
                  <Avatar className="h-16 w-16">
                    {member.photoUrl ? <AvatarImage src={member.photoUrl} alt={member.name} /> : null}
                    <AvatarFallback>{member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-5 text-xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#F97316]">{isArabic ? member.roleAR : member.roleEN}</p>
                  <p className="mt-4 text-[#6B7280] leading-7 dark:text-sop-muted">{isArabic ? member.bioAR : member.bioEN}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1A1A2E] py-20 dark:bg-sop-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.milestones.title')} accent={t('about.milestones.titleAccent')} />
            <div className="relative mt-14 border-s border-white/10 ms-4 dark:border-sop-border">
              {aboutData.milestones.map((milestone) => (
                <div key={milestone.year} className="mb-10 ms-8 last:mb-0">
                  <span className="absolute -start-[11px] flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#1A1A2E] bg-[#F97316]" />
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 dark:border-sop-border dark:bg-sop-surface/50">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#F97316]">{milestone.year}</p>
                    <h3 className="mt-2 text-2xl text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{isArabic ? milestone.titleAR : milestone.titleEN}</h3>
                    <p className="mt-3 text-white/70 leading-7">{isArabic ? milestone.descriptionAR : milestone.descriptionEN}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('about.clients.title')} accent={t('about.clients.titleAccent')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {aboutData.clients.map((client) => (
                <div key={client.id} className="rounded-2xl border border-[#F0F0F0] bg-[#F9FAFB] px-4 py-8 text-center text-sm font-semibold tracking-[0.2em] text-[#6B7280] dark:border-sop-border dark:bg-sop-surface dark:text-sop-muted">
                  {client.logoUrl ? (
                    <Image src={client.logoUrl} alt={client.name} width={160} height={40} className="mx-auto h-10 w-auto object-contain" />
                  ) : client.name}
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
