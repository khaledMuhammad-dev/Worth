import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Worth Agency',
  description: 'Read Worth Agency’s privacy policy and learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Privacy Policy" subtitle="Last updated: January 1, 2024" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#6B7280] leading-8">
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Overview</h2>
              <p className="mt-4">Worth Agency respects your privacy and is committed to protecting the information you share with us. This policy explains what we collect, why we collect it, how we use it, and the choices available to you.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Information We Collect</h2>
              <p className="mt-4">We may collect personal details such as your name, email address, company name, phone number, and project information when you contact us, subscribe to updates, or engage our services. We also collect limited technical data such as browser type, device information, and pages visited to improve site performance.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>How We Use Your Data</h2>
              <p className="mt-4">We use collected information to respond to inquiries, deliver proposals, manage projects, improve our services, personalize communication, and send occasional updates relevant to your interests. We do not sell personal data to third parties.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Sharing and Retention</h2>
              <p className="mt-4">We only share your information with trusted service providers when necessary to operate our website, manage communications, or deliver services. Data is retained only for as long as needed to fulfill the original purpose, comply with legal obligations, or resolve disputes.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Your Rights</h2>
              <p className="mt-4">You may request access to, correction of, or deletion of your personal information by contacting hello@worth.agency. You may also opt out of marketing communications at any time using the unsubscribe link or by contacting us directly.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
