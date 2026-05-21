import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/providers/I18nProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Worth Agency — Every brand has a story. We make it valuable.",
  description:
    "Full-service digital agency offering marketing, media buying, brand identity, motion graphics, and web development.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
