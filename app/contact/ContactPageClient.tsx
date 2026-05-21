'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';

export default function ContactPageClient() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title={t('pageHero.contact')}
          subtitle={t('contact.subtitle')}
          breadcrumb={[{ label: t('pageHero.home'), href: '/' }, { label: t('pageHero.contact') }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="rounded-[2rem] border border-[#F0F0F0] bg-[#F9FAFB] p-8 md:p-10 shadow-sm">
              <h2 className="text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.title')} <span className="text-[#F97316]">{t('contact.titleAccent')}</span></h2>
              <p className="mt-4 text-[#6B7280] leading-8">Tell us what you are building, where you are feeling stuck, and what success looks like for your brand.</p>
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
                    placeholder={t('contact.form.name')}
                    className="h-14 rounded-xl border border-[#F0F0F0] bg-white px-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder={t('contact.form.email')}
                    className="h-14 rounded-xl border border-[#F0F0F0] bg-white px-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none"
                  />
                </div>
                <input
                  required
                  value={form.service}
                  onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
                  placeholder={t('contact.form.service')}
                  className="h-14 w-full rounded-xl border border-[#F0F0F0] bg-white px-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none"
                />
                <textarea
                  required
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  placeholder={t('contact.form.message')}
                  rows={6}
                  className="w-full rounded-2xl border border-[#F0F0F0] bg-white px-4 py-4 text-[#1A1A2E] focus:border-[#F97316] focus:outline-none"
                />
                <Button type="submit" size="lg">{t('contact.form.submit')}</Button>
                {submitted && <p className="text-sm font-medium text-[#F97316]">{t('contact.form.success')}</p>}
              </form>
            </div>

            <div className="rounded-[2rem] bg-[#1A1A2E] p-8 md:p-10 text-white">
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.info.title')}</h3>
              <p className="mt-4 text-white/70 leading-8">We usually reply within one business day with next steps, timing, and a recommended scope.</p>
              <div className="mt-8 space-y-5">
                {[
                  { icon: Mail, label: t('contact.info.email') },
                  { icon: Phone, label: t('contact.info.phone') },
                  { icon: MapPin, label: t('contact.info.address') },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316]/20">
                      <Icon className="h-5 w-5 text-[#F97316]" />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
                <a href="mailto:hello@worth.agency">
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
