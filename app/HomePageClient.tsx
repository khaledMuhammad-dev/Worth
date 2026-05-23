'use client';

import { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BarChart3, Brush, Clapperboard, Globe, ArrowRight, TrendingUp, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { CTABanner } from '@/components/shared/CTABanner';
import type { HomeData } from '@/lib/types/content';

interface Props {
  homeData: HomeData;
}

const serviceConfigs = {
  marketing: { Icon: BarChart3, iconBg: 'bg-[#FEF3C7]', iconClass: 'text-[#A16207]' },
  brand: { Icon: Brush, iconBg: 'bg-[#F3E8FF]', iconClass: 'text-[#7E22CE]' },
  motion: { Icon: Clapperboard, iconBg: 'bg-[#DCFCE7]', iconClass: 'text-[#15803D]' },
  web: { Icon: Globe, iconBg: 'bg-[#DBEAFE]', iconClass: 'text-[#1D4ED8]' },
} as const;

function splitHeading(heading: string, accent: string) {
  if (!accent || !heading.includes(accent)) {
    return { base: heading, accent };
  }

  return {
    base: heading.split(accent)[0].trim(),
    accent,
  };
}

export default function HomePageClient({ homeData }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let heroSplit: SplitText | null = null;
    let removeMouseMove: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const h1 = document.querySelector('.hero-heading');
      if (h1) {
        heroSplit = new SplitText(h1, { type: 'words' });
        gsap.fromTo(
          heroSplit.words,
          { opacity: 0, y: 60, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
        gsap.to('.accent-word', {
          textShadow: '0 0 24px rgba(249,115,22,0.6)',
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      }

      gsap.fromTo(
        ['.hero-sub', '.hero-stats', '.hero-ctas'],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.9, ease: 'power2.out' }
      );

      gsap.utils.toArray<Element>('.dot').forEach((dot, index) => {
        gsap.to(dot, {
          y: 'random(-15, 15)',
          x: 'random(-10, 10)',
          duration: 'random(2, 4)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });

      if (window.innerWidth >= 1024) {
        const onMouseMove = (event: MouseEvent) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 20;
          const y = (event.clientY / window.innerHeight - 0.5) * 12;
          gsap.to('.hero-illustration', { x, y, duration: 0.6, ease: 'power1.out' });
        };

        window.addEventListener('mousemove', onMouseMove);
        removeMouseMove = () => window.removeEventListener('mousemove', onMouseMove);
      }
    }, heroRef);

    return () => {
      removeMouseMove?.();
      heroSplit?.revert();
      ctx.revert();
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let servicesSplit: SplitText | null = null;
    let aboutSplit: SplitText | null = null;

    const ctx = gsap.context(() => {
      const servH = document.querySelector('.services-heading');
      if (servH) {
        servicesSplit = new SplitText(servH, { type: 'chars' });
        gsap.fromTo(
          servicesSplit.chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: servH, start: 'top 85%' },
          }
        );
      }

      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.icon-box',
        { rotation: -15, opacity: 0, scale: 0.7 },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.step-circle',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: '.process-section', start: 'top 75%' },
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.step-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.process-section', start: 'top 70%' },
          delay: 0.7,
        }
      );

      const connector = document.querySelector<SVGPathElement>('.process-connector');
      if (connector) {
        const pathLength = connector.getTotalLength();
        gsap.set(connector, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(connector, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.process-section', start: 'top 75%' },
        });
      }

      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((element) => {
        const raw = element.dataset.value || '0';
        if (Number.isNaN(Number(raw))) return;

        const target = parseInt(raw, 10);
        const suffix = element.dataset.suffix || '';
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 85%' },
          onUpdate() {
            element.textContent = Math.round(counter.val) + suffix;
          },
        });
      });

      gsap.fromTo(
        '.about-illustration',
        { opacity: 0, x: -60, scale: 0.92 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-section', start: 'top 75%' },
        }
      );

      const aboutBody = document.querySelector('.about-body');
      if (aboutBody) {
        aboutSplit = new SplitText(aboutBody, { type: 'lines' });
        gsap.fromTo(
          aboutSplit.lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: aboutBody, start: 'top 80%' },
          }
        );
      }

      gsap.fromTo(
        '.star',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          duration: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.footer-logo',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: 'footer', start: 'top 90%' },
        }
      );
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: 'footer', start: 'top 90%' },
        }
      );

      ScrollTrigger.refresh();
    }, heroRef);

    return () => {
      servicesSplit?.revert();
      aboutSplit?.revert();
      ctx.revert();
    };
  }, [prefersReduced]);

  const services = useMemo(
    () =>
      homeData.services.items.map((service) => {
        const config = serviceConfigs[service.id as keyof typeof serviceConfigs] ?? serviceConfigs.web;
        return {
          icon: <config.Icon className={`h-6 w-6 ${config.iconClass}`} />,
          iconBg: config.iconBg,
          title: isArabic ? service.titleAR : service.titleEN,
          description: isArabic ? service.descriptionAR : service.descriptionEN,
          href: service.href,
        };
      }),
    [homeData.services.items, isArabic]
  );

  const steps = useMemo(
    () =>
      homeData.process.steps.map((step) => ({
        number: step.number,
        title: isArabic ? step.titleAR : step.titleEN,
        description: isArabic ? step.descriptionAR : step.descriptionEN,
      })),
    [homeData.process.steps, isArabic]
  );

  const stats = useMemo(() => {
    const icons = [TrendingUp, Users, MapPin] as const;
    return homeData.hero.stats.map((stat, index) => ({
      value: stat.value,
      suffix: stat.suffix,
      label: isArabic ? stat.labelAR : stat.labelEN,
      Icon: icons[index] ?? TrendingUp,
    }));
  }, [homeData.hero.stats, isArabic]);

  const testimonials = useMemo(
    () =>
      homeData.testimonials.items.map((item) => ({
        id: item.id,
        name: isArabic ? item.nameAR : item.nameEN,
        role: isArabic ? item.roleAR : item.roleEN,
        quote: isArabic ? item.quoteAR : item.quoteEN,
        avatar: item.avatarUrl,
      })),
    [homeData.testimonials.items, isArabic]
  );

  const heroHeading = splitHeading(
    isArabic ? homeData.hero.headingAR : homeData.hero.headingEN,
    isArabic ? homeData.hero.accentWordAR : homeData.hero.accentWordEN
  );

  const servicesHeading = splitHeading(
    isArabic ? homeData.services.headingAR : homeData.services.headingEN,
    isArabic ? homeData.services.accentWordAR : homeData.services.accentWordEN
  );

  return (
    <div ref={heroRef}>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="pointer-events-none select-none" aria-hidden>
            <div className="dot absolute left-8 top-12 h-3 w-3 rounded-full bg-[#F97316] opacity-30" />
            <div className="dot absolute right-12 top-20 h-4 w-4 rounded-full bg-[#F97316] opacity-20" />
            <div className="dot absolute bottom-16 left-1/4 h-2 w-2 rounded-full bg-[#F97316] opacity-40" />
            <div className="dot absolute bottom-10 right-1/3 h-5 w-5 rounded-full border border-[#F97316] opacity-20" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 xl:gap-16">
            <div className="max-w-xl">
              <motion.span
                initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                transition={prefersReduced ? undefined : { duration: 0.4, delay: 0.1 }}
                className="mb-6 inline-flex items-center rounded-full bg-[#FFF4EE] px-4 py-1.5 text-sm font-semibold text-[#F97316]"
              >
                Worth Agency
              </motion.span>

              <h1
                className="hero-heading heading-xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: 'var(--font-heading)', perspective: '600px' }}
              >
                {heroHeading.base}{' '}
                {heroHeading.accent ? <span className="accent-word text-[#F97316]">{heroHeading.accent}</span> : null}
              </h1>

              <p className="hero-sub mt-6 max-w-lg text-lg leading-relaxed text-[#6B7280]">
                {isArabic ? homeData.hero.subheadingAR : homeData.hero.subheadingEN}
              </p>

              <div className="hero-ctas mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.div whileHover={prefersReduced ? undefined : { scale: 1.04 }} whileTap={prefersReduced ? undefined : { scale: 0.97 }}>
                  <Link
                    href={homeData.hero.primaryCtaHref}
                    className="inline-flex items-center justify-center rounded-lg bg-[#F97316] px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#EA6C00]"
                    data-cursor="hover"
                  >
                    {isArabic ? homeData.hero.primaryCtaAR : homeData.hero.primaryCtaEN}
                  </Link>
                </motion.div>
                <motion.div whileHover={prefersReduced ? undefined : { scale: 1.04 }} whileTap={prefersReduced ? undefined : { scale: 0.97 }}>
                  <Link
                    href={homeData.hero.secondaryCtaHref}
                    className="inline-flex items-center justify-center rounded-lg border border-[#F97316] px-7 py-3.5 text-base font-semibold text-[#F97316] transition-colors duration-200 hover:bg-[#FFF4EE]"
                    data-cursor="hover"
                  >
                    {isArabic ? homeData.hero.secondaryCtaAR : homeData.hero.secondaryCtaEN}
                  </Link>
                </motion.div>
              </div>

              <div className="hero-stats mt-10 flex items-center gap-0 divide-x divide-[#F0F0F0] overflow-hidden rounded-xl border border-[#F0F0F0] bg-[#F9FAFB]">
                {stats.map(({ value, suffix, label, Icon }) => {
                  const isNum = !Number.isNaN(Number(value));
                  return (
                    <div key={label} className="flex flex-1 flex-col items-center px-3 py-4">
                      <Icon className="mb-1.5 h-4 w-4 text-[#F97316]" />
                      <div
                        className="stat-number text-xl font-bold text-[#1A1A2E]"
                        data-value={isNum ? value : undefined}
                        data-suffix={suffix}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {value}
                        {suffix}
                      </div>
                      <div className="mt-0.5 text-xs text-[#6B7280]">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="hero-illustration relative hidden sm:block"
              initial={prefersReduced ? false : { opacity: 0, x: 80 }}
              animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
              transition={prefersReduced ? undefined : { duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform' }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-6 shadow-xl md:p-8">
                <motion.div
                  animate={prefersReduced ? undefined : { y: [0, -10, 0] }}
                  transition={prefersReduced ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1A1A2E] via-[#1f2747] to-[#F97316] p-7 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Growth Snapshot</p>
                    <h2 className="mt-3 text-2xl font-bold leading-snug md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                      Strategy. Creative. Performance.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      We build brands and digital systems that look premium, move faster, and convert better.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {['Positioning & messaging', 'Paid media systems', 'High-converting websites', 'Content built for scale'].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs leading-snug text-white/80">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#F0F0F0] bg-white p-4 shadow-md">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF4EE]">
                    <TrendingUp className="h-4 w-4 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A2E]">Recent client win</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#6B7280]">
                      3.4× qualified leads after a full brand &amp; website relaunch.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="services-heading heading-l font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
                {servicesHeading.base} <span className="text-[#F97316]">{servicesHeading.accent}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
                {isArabic ? homeData.services.headingAR : homeData.services.headingEN}
              </p>
            </div>
            <div className="services-grid grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <div key={service.href} className="service-card">
                  <ServiceCard {...service} learnMore={t('services.learnMore')} iconBg={service.iconBg} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="process-section bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={isArabic ? homeData.process.headingAR : homeData.process.headingEN}
              accent={isArabic ? homeData.process.accentWordAR : homeData.process.accentWordEN}
              subtitle={isArabic ? homeData.hero.subheadingAR : homeData.hero.subheadingEN}
            />

            <div className="relative mb-[-20px] hidden lg:block" aria-hidden>
              <svg
                className="w-full"
                height="4"
                viewBox="0 0 1000 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  className="process-connector"
                  d="M0 2 L1000 2"
                  stroke="#F97316"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div
                    className="step-circle mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F97316] font-bold text-white"
                    style={{ fontFamily: 'var(--font-heading)', willChange: 'transform' }}
                  >
                    {step.number}
                  </div>
                  <div className="step-content">
                    <h3 className="mb-3 text-lg font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section overflow-hidden bg-[#1A1A2E] py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="max-w-prose">
              <motion.p
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReduced ? undefined : { duration: 0.5 }}
                className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#F97316]"
              >
                About Worth
              </motion.p>
              <motion.h2
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReduced ? undefined : { duration: 0.6, delay: 0.1 }}
                className="heading-l font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('about.title')} <span className="text-[#F97316]">{t('about.titleAccent')}</span>
              </motion.h2>
              <p className="about-body mt-5 leading-relaxed text-white/70">{t('about.body')}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Worth partners with founders, marketing teams, and modern brands that want more than polished output. We build strategic clarity, premium creative, and the systems needed to turn momentum into measurable growth.
              </p>
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReduced ? undefined : { duration: 0.5, delay: 0.3 }}
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                className="mt-8 inline-block"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#EA6C00]"
                  data-cursor="hover"
                >
                  {t('about.readMore')}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </motion.div>
            </div>

            <div className="about-illustration relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6" style={{ willChange: 'transform' }}>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#F97316]/20 blur-3xl" aria-hidden />
              <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: 'Built for growth', body: 'Every deliverable is designed to move the business forward — from positioning to paid performance.' },
                  { title: 'Premium by default', body: 'Strategic rigor meets sharp execution so the brand feels elevated at every touchpoint.' },
                  { title: 'Operationally clear', body: 'Timelines, reporting, and communication stay structured, transparent, and proactive.' },
                  { title: 'Regionally fluent', body: 'We understand MENA audiences, bilingual brand environments, and regional growth dynamics.' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={prefersReduced ? undefined : { delay: index * 0.1, duration: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <h3 className="mb-2 text-base font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section bg-[#F9FAFB] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={isArabic ? homeData.testimonials.headingAR : homeData.testimonials.headingEN}
              accent={isArabic ? homeData.testimonials.accentWordAR : homeData.testimonials.accentWordEN}
              subtitle={isArabic ? homeData.hero.subheadingAR : homeData.hero.subheadingEN}
            />
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial={prefersReduced ? false : 'hidden'}
                  whileInView={prefersReduced ? undefined : 'visible'}
                  viewport={{ once: true, amount: 0.3 }}
                  variants={testimonialVariants}
                  className="flex flex-col"
                  style={{ willChange: 'transform' }}
                >
                  <TestimonialCard
                    name={item.name}
                    role={item.role}
                    quote={item.quote}
                    avatar={item.avatar}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title={isArabic ? homeData.cta.headingAR : homeData.cta.headingEN}
          accent=""
          buttonLabel={isArabic ? homeData.cta.buttonAR : homeData.cta.buttonEN}
          buttonHref={homeData.cta.buttonHref}
        />
      </main>
      <Footer />
    </div>
  );
}

const testimonialVariants = {
  hidden: (index: number) => ({ opacity: 0, y: 50, rotate: index % 2 === 0 ? -3 : 3 }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};
