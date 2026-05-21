'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BarChart3, Brush, Clapperboard, Globe, ArrowRight, TrendingUp, Users, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { CTABanner } from '@/components/shared/CTABanner';

export default function HomePageClient() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <BarChart3 className="h-6 w-6 text-[#A16207]" />,
      iconBg: 'bg-[#FEF3C7]',
      title: t('services.marketing.title'),
      description: t('services.marketing.description'),
      href: '/services/marketing-media-buying',
    },
    {
      icon: <Brush className="h-6 w-6 text-[#7E22CE]" />,
      iconBg: 'bg-[#F3E8FF]',
      title: t('services.brand.title'),
      description: t('services.brand.description'),
      href: '/services/brand-identity',
    },
    {
      icon: <Clapperboard className="h-6 w-6 text-[#15803D]" />,
      iconBg: 'bg-[#DCFCE7]',
      title: t('services.motion.title'),
      description: t('services.motion.description'),
      href: '/services/motion-graphics',
    },
    {
      icon: <Globe className="h-6 w-6 text-[#1D4ED8]" />,
      iconBg: 'bg-[#DBEAFE]',
      title: t('services.web.title'),
      description: t('services.web.description'),
      href: '/services/web-development',
    },
  ];

  const steps = [
    { number: '01', title: t('process.step1.title'), description: t('process.step1.description') },
    { number: '02', title: t('process.step2.title'), description: t('process.step2.description') },
    { number: '03', title: t('process.step3.title'), description: t('process.step3.description') },
    { number: '04', title: t('process.step4.title'), description: t('process.step4.description') },
  ];

  const stats = [
    { value: '200+', label: 'Projects', Icon: TrendingUp },
    { value: '18', label: 'Specialists', Icon: Users },
    { value: 'MENA', label: 'Region', Icon: MapPin },
  ];

  const testimonials = ['t1', 't2', 't3'] as const;

  return (
    <>
      <Navbar />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          {/* Decorative dots */}
          <div className="pointer-events-none select-none" aria-hidden>
            <div className="absolute left-8 top-12 h-3 w-3 rounded-full bg-[#F97316] opacity-30" />
            <div className="absolute right-12 top-20 h-4 w-4 rounded-full bg-[#F97316] opacity-20" />
            <div className="absolute bottom-16 left-1/4 h-2 w-2 rounded-full bg-[#F97316] opacity-40" />
            <div className="absolute bottom-10 right-1/3 h-5 w-5 rounded-full border border-[#F97316] opacity-20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* ── Left: Text content ── */}
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-[#FFF4EE] px-4 py-1.5 text-sm font-semibold text-[#F97316] mb-6">
                Worth Agency
              </span>

              <h1
                className="heading-xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('hero.tagline')}{' '}
                <span className="text-[#F97316]">{t('hero.taglineAccent')}</span>
              </h1>

              <p className="mt-6 text-[#6B7280] leading-relaxed text-lg max-w-lg">
                {t('hero.subtitle')}
              </p>

              {/* CTAs: side-by-side on sm+, stacked on mobile */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold rounded-lg px-7 py-3.5 text-base transition-colors duration-200"
                >
                  {t('hero.cta1')}
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center border border-[#F97316] text-[#F97316] hover:bg-[#FFF4EE] font-semibold rounded-lg px-7 py-3.5 text-base transition-colors duration-200"
                >
                  {t('hero.cta2')}
                </Link>
              </div>

              {/* Stats row with dividers */}
              <div className="mt-10 flex items-center gap-0 divide-x divide-[#F0F0F0] border border-[#F0F0F0] rounded-xl overflow-hidden bg-[#F9FAFB]">
                {stats.map(({ value, label, Icon }) => (
                  <div key={label} className="flex-1 flex flex-col items-center py-4 px-3">
                    <Icon className="h-4 w-4 text-[#F97316] mb-1.5" />
                    <div
                      className="text-xl font-bold text-[#1A1A2E]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {value}
                    </div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Visual card ── */}
            <div className="relative hidden sm:block">
              <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-6 md:p-8 shadow-xl overflow-hidden">
                {/* Main gradient card */}
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1A1A2E] via-[#1f2747] to-[#F97316] p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
                    Growth Snapshot
                  </p>
                  <h2
                    className="mt-3 text-2xl md:text-3xl font-bold leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Strategy. Creative. Performance.
                  </h2>
                  <p className="mt-3 text-white/70 leading-relaxed text-sm">
                    We build brands and digital systems that look premium, move faster, and convert better.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      'Positioning & messaging',
                      'Paid media systems',
                      'High-converting websites',
                      'Content built for scale',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/80 leading-snug"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating "client win" card — inside the column, no overflow */}
                <div className="mt-4 rounded-xl bg-white p-4 shadow-md border border-[#F0F0F0] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF4EE] flex items-center justify-center shrink-0">
                    <TrendingUp className="h-4 w-4 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A2E]">Recent client win</p>
                    <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                      3.4× qualified leads after a full brand & website relaunch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="py-16 md:py-24 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t('services.title')}
              accent={t('services.titleAccent')}
              subtitle={t('services.subtitle')}
            />
            {/* 4-col grid: 1 col mobile → 2 col sm → 4 col lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {services.map((service) => (
                <ServiceCard key={service.href} {...service} learnMore={t('services.learnMore')} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t('process.title')}
              accent={t('process.titleAccent')}
              subtitle={t('process.subtitle')}
            />
            {/*
              Steps grid — CSS grid naturally places items from the reading-start
              edge, so in RTL mode step 01 appears on the right (start) → correct.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F97316] text-white font-bold mb-5 shrink-0"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-lg font-bold text-[#1A1A2E] mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ABOUT TEASER ─── */}
        <section className="py-16 md:py-24 bg-[#1A1A2E] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            {/* Text column */}
            <div className="max-w-prose">
              <p className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-4">
                About Worth
              </p>
              <h2
                className="heading-l font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('about.title')}{' '}
                <span className="text-[#F97316]">{t('about.titleAccent')}</span>
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                {t('about.body')}
              </p>
              <p className="mt-4 text-white/60 leading-relaxed text-sm">
                Worth partners with founders, marketing teams, and modern brands that want more than polished output. We build strategic clarity, premium creative, and the systems needed to turn momentum into measurable growth.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C00] text-white font-semibold rounded-lg px-7 py-3.5 text-base transition-colors duration-200"
              >
                {t('about.readMore')}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>

            {/* Visual column */}
            <div className="relative min-h-[340px] rounded-[2rem] border border-white/10 bg-white/5 p-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#F97316]/20 blur-3xl pointer-events-none" aria-hidden />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {[
                  { title: 'Built for growth', body: 'Every deliverable is designed to move the business forward — from positioning to paid performance.' },
                  { title: 'Premium by default', body: 'Strategic rigor meets sharp execution so the brand feels elevated at every touchpoint.' },
                  { title: 'Operationally clear', body: 'Timelines, reporting, and communication stay structured, transparent, and proactive.' },
                  { title: 'Regionally fluent', body: 'We understand MENA audiences, bilingual brand environments, and regional growth dynamics.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <h3
                      className="text-white font-bold text-base mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-16 md:py-24 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t('testimonials.title')}
              accent={t('testimonials.titleAccent')}
              subtitle={t('testimonials.subtitle')}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {testimonials.map((key) => (
                <TestimonialCard
                  key={key}
                  name={t(`testimonials.${key}.name`)}
                  role={t(`testimonials.${key}.role`)}
                  quote={t(`testimonials.${key}.quote`)}
                />
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
