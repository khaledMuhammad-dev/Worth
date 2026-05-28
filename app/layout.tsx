import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import I18nProvider from '@/components/providers/I18nProvider';
import GSAPProvider from '@/components/providers/GSAPProvider';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import PublicLayout from '@/components/PublicLayout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { getContentData } from '@/lib/content';
import type { Announcement } from '@/lib/types/content';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Worth Agency — Every brand has a story. We make it valuable.',
  description:
    'Full-service digital agency offering marketing, media buying, brand identity, motion graphics, and web development.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const announcements = await getContentData<Announcement[]>('announcements');

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${plusJakartaSans.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <I18nProvider>
            <GSAPProvider>
              <Loader />
              <CustomCursor />
              <ScrollProgressBar />
              <PublicLayout announcements={announcements}>{children}</PublicLayout>
            </GSAPProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
