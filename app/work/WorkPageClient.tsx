'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { CTABanner } from '@/components/shared/CTABanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { WorkData } from '@/lib/types/content';

const categories = ['all', 'Marketing', 'Branding', 'Web', 'Motion'] as const;
const labels: Record<(typeof categories)[number], string> = {
  all: 'All',
  Marketing: 'Marketing',
  Branding: 'Branding',
  Web: 'Web',
  Motion: 'Motion',
};

interface Props {
  workData: WorkData;
}

export default function WorkPageClient({ workData }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [category, setCategory] = useState<(typeof categories)[number]>('all');

  const filteredProjects = useMemo(() => {
    if (category === 'all') return workData.projects;

    const categoryMatchers: Record<string, RegExp> = {
      Marketing: /media|marketing|analytics|paid/i,
      Branding: /brand|launch/i,
      Web: /web|ux|seo/i,
      Motion: /motion/i,
    };

    return workData.projects.filter((project) => project.tags.some((tag) => categoryMatchers[category]?.test(tag)));
  }, [category, workData.projects]);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={isArabic ? workData.hero.headingAR : workData.hero.headingEN}
          subtitle={isArabic ? workData.hero.subheadingAR : workData.hero.subheadingEN}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.work') }]}
        />

        <section className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={isArabic ? workData.hero.headingAR : workData.hero.headingEN} accent={isArabic ? workData.hero.accentWordAR : workData.hero.accentWordEN} subtitle={isArabic ? workData.hero.subheadingAR : workData.hero.subheadingEN} />
            <Tabs value={category} onValueChange={(value) => setCategory(value as (typeof categories)[number])}>
              <div className="flex justify-center mb-10">
                <TabsList>
                  {categories.map((item) => (
                    <TabsTrigger key={item} value={item}>
                      {item === 'all' ? t('work.all') : labels[item]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent value={category}>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      title={isArabic ? project.titleAR : project.titleEN}
                      tags={project.tags}
                      image={project.coverUrl}
                      slug={project.slug}
                      viewLabel={t('work.viewCaseStudy')}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-20 dark:bg-sop-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('testimonials.title')} accent={t('testimonials.titleAccent')} subtitle={t('testimonials.subtitle')} />
            <div className="grid lg:grid-cols-3 gap-6">
              {(['t1', 't2', 't3'] as const).map((key) => (
                <TestimonialCard key={key} name={t(`testimonials.${key}.name`)} role={t(`testimonials.${key}.role`)} quote={t(`testimonials.${key}.quote`)} />
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
