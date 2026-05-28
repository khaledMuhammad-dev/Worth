'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';
import type { ContactData } from '@/lib/types/content';

interface Props {
  contactData: ContactData;
}

export default function ContactPageClient({ contactData }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={isArabic ? contactData.hero.headingAR : contactData.hero.headingEN}
          subtitle={isArabic ? contactData.hero.subheadingAR : contactData.hero.subheadingEN}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.contact') }]}
        />

        <section className="bg-white py-20 dark:bg-sop-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-8 shadow-sm md:p-10 dark:border-sop-border dark:bg-sop-surface dark:shadow-sop-card">
              <h2 className="text-3xl font-bold text-[#1A1A2E] dark:text-sop-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.title')} <span className="text-[#F97316]">{t('contact.titleAccent')}</span></h2>
              <p className="mt-4 text-[#6B7280] leading-8 dark:text-sop-muted">{isArabic ? contactData.hero.subheadingAR : contactData.hero.subheadingEN}</p>
              <form
                className="mt-8 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                  setForm({ name: '', email: '', service: '', message: '' });
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder={isArabic ? contactData.formFields.nameAR : contactData.formFields.nameEN}
                    className="h-14 rounded-xl border border-[#F0F0F0] bg-white px-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none dark:border-sop-border dark:bg-sop-bg dark:text-sop-foreground dark:placeholder:text-sop-subtle"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder={isArabic ? contactData.formFields.emailAR : contactData.formFields.emailEN}
                    className="h-14 rounded-xl border border-[#F0F0F0] bg-white px-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none dark:border-sop-border dark:bg-sop-bg dark:text-sop-foreground dark:placeholder:text-sop-subtle"
                  />
                </div>
                <input
                  required
                  value={form.service}
                  onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
                  placeholder={isArabic ? contactData.formFields.serviceAR : contactData.formFields.serviceEN}
                  className="h-14 w-full rounded-xl border border-[#F0F0F0] bg-white px-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none dark:border-sop-border dark:bg-sop-bg dark:text-sop-foreground dark:placeholder:text-sop-subtle"
                />
                <textarea
                  required
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  placeholder={isArabic ? contactData.formFields.messageAR : contactData.formFields.messageEN}
                  rows={6}
                  className="w-full rounded-2xl border border-[#F0F0F0] bg-white px-4 py-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none dark:border-sop-border dark:bg-sop-bg dark:text-sop-foreground dark:placeholder:text-sop-subtle"
                />
                <Button type="submit" size="lg">{isArabic ? contactData.formFields.submitAR : contactData.formFields.submitEN}</Button>
                {submitted && <p className="text-sm font-medium text-[#F97316]">{t('contact.form.success')}</p>}
              </form>
            </div>

            <div className="rounded-[2rem] border border-transparent bg-[#1A1A2E] p-8 text-white md:p-10 dark:border-sop-border dark:bg-sop-overlay">
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.info.title')}</h3>
              <p className="mt-4 text-white/70 leading-8">{isArabic ? contactData.info.addressAR : contactData.info.addressEN}</p>
              <div className="mt-8 space-y-5">
                {[
                  { icon: Mail, label: isArabic ? contactData.info.emailAR : contactData.info.emailEN },
                  { icon: Phone, label: contactData.info.phone },
                  { icon: MapPin, label: isArabic ? contactData.info.addressAR : contactData.info.addressEN },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-sop-border dark:bg-sop-surface/60">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316]/20">
                      <Icon className="h-5 w-5 text-[#F97316]" />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
                <a href={contactData.info.bookingUrl}>
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {t('contact.bookCall')}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
