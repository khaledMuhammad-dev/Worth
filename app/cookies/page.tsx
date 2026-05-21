import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Cookie Policy | Worth Agency',
  description: 'Understand how Worth Agency uses cookies and similar technologies on this website.',
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Cookie Policy" subtitle="Last updated: January 1, 2024" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]} />
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#6B7280] leading-8">
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>What Are Cookies?</h2>
              <p className="mt-4">Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, understand user behavior, and improve browsing experiences.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>How We Use Cookies</h2>
              <p className="mt-4">Worth Agency uses cookies and similar technologies to understand traffic patterns, remember language preferences, improve site performance, and support analytics. Some cookies are essential for the website to function correctly.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Managing Cookies</h2>
              <p className="mt-4">You can control or disable cookies through your browser settings. Please note that removing essential cookies may impact site functionality or limit certain features.</p>
            </section>
            <section>
              <h2 className="text-3xl text-[#1A1A2E] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Third-Party Cookies</h2>
              <p className="mt-4">Some third-party tools used for analytics or performance measurement may place cookies on your device. These providers manage their cookies according to their own privacy and cookie policies.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
