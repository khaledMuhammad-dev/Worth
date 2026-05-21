import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service | Worth Agency',
  description: 'Review the terms governing the use of Worth Agency’s website and services.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Terms of Service" subtitle="Last updated: January 1, 2024" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#6B7280] leading-8">
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Acceptance of Terms</h2>
              <p className="mt-4">By accessing this website or engaging Worth Agency for services, you agree to these terms. If you do not agree, please discontinue use of the site and our services.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Scope of Services</h2>
              <p className="mt-4">All services are defined in project proposals, statements of work, or retainer agreements. Timelines, deliverables, revisions, and fees are outlined in those agreements and take precedence over general website content.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Intellectual Property</h2>
              <p className="mt-4">Unless otherwise stated in writing, Worth Agency retains ownership of pre-existing methodologies, templates, and internal tools. Final approved client deliverables transfer according to the commercial agreement in place and only after all outstanding fees are paid.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Payment and Cancellation</h2>
              <p className="mt-4">Invoices are due according to the agreed payment schedule. Late payments may pause work until accounts are brought current. Either party may terminate a project or retainer according to the notice period specified in the agreement.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Limitation of Liability</h2>
              <p className="mt-4">Worth Agency is not liable for indirect, incidental, or consequential damages arising from the use of this website or our services. Our total liability is limited to the amount paid by the client for the specific services giving rise to the claim, where permitted by law.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
