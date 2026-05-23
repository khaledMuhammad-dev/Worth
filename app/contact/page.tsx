import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import { getContentData } from '@/lib/content'
import type { ContactData } from '@/lib/types/content'

interface RawContactData {
  hero: { headingEN: string; headingAR: string; subheadingEN: string; subheadingAR: string }
  info: { email: string; phone: string; addressEN: string; addressAR: string; mapEmbedUrl: string; bookingUrl: string }
  socials: { platform: string; url: string }[]
  formFields: { id: string; labelEN: string; labelAR: string }[]
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact | Worth Agency',
  description: 'Get in touch with Worth Agency.',
}

export default async function ContactPage() {
  const raw = getContentData<RawContactData>('contact')
  const fieldMap = Object.fromEntries(raw.formFields.map((field) => [field.id, field]))
  const contactData: ContactData = {
    hero: {
      headingEN: raw.hero.headingEN,
      headingAR: raw.hero.headingAR,
      accentWordEN: '',
      accentWordAR: '',
      subheadingEN: raw.hero.subheadingEN,
      subheadingAR: raw.hero.subheadingAR,
    },
    info: {
      emailEN: raw.info.email,
      emailAR: raw.info.email,
      phone: raw.info.phone,
      addressEN: raw.info.addressEN,
      addressAR: raw.info.addressAR,
      mapEmbedUrl: raw.info.mapEmbedUrl,
      bookingUrl: raw.info.bookingUrl,
    },
    socials: raw.socials,
    formFields: {
      nameEN: fieldMap.name?.labelEN ?? 'Name',
      nameAR: fieldMap.name?.labelAR ?? 'الاسم',
      emailEN: fieldMap.email?.labelEN ?? 'Email',
      emailAR: fieldMap.email?.labelAR ?? 'البريد الإلكتروني',
      serviceEN: fieldMap.service?.labelEN ?? 'Service Needed',
      serviceAR: fieldMap.service?.labelAR ?? 'الخدمة المطلوبة',
      messageEN: fieldMap.message?.labelEN ?? 'Project Details',
      messageAR: fieldMap.message?.labelAR ?? 'تفاصيل المشروع',
      submitEN: 'Send Message',
      submitAR: 'إرسال الرسالة',
    },
  }

  return <ContactPageClient contactData={contactData} />
}
