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
import { projects } from '@/lib/site-data';

const categories = ['all', 'Marketing', 'Branding', 'Web', 'Motion'] as const;
const labels: Record<(typeof categories)[number], string> = {
  all: 'All',
  Marketing: 'Marketing',
  Branding: 'Branding',
  Web: 'Web',
  Motion: 'Motion',
};

export default function WorkPageClient() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<(typeof categories)[number]>('all');

  const filteredProjects = useMemo(() => {
    if (category === 'all') return projects;
    if (category === 'Branding') return projects.filter((project) => project.service === 'Branding');
    return projects.filter((project) => project.service === category);
  }, [category]);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageHero.work')}
          subtitle={t('work.subtitle')}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.work') }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('work.title')} accent={t('work.titleAccent')} subtitle={t('work.subtitle')} />
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
                    <ProjectCard key={project.slug} title={project.title} tags={project.tags} image={project.image} slug={project.slug} viewLabel={t('work.viewCaseStudy')} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-20 bg-[#F9FAFB]">
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
