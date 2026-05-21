import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact | Worth Agency',
  description: 'Get in touch with Worth Agency to discuss your next brand, marketing, motion, or website project.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
