import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { CookieConsent } from "@/components/CookieConsent";
import { getLandingPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Bold, condensed display font for headings — mirrors the confident,
// tight-tracked heading style used as a design reference, using a
// freely-licensed Google Font instead of the reference site's proprietary
// typeface.
const headingCondensed = Barlow_Condensed({
  variable: "--font-heading-condensed",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getLandingPageContent();

  return (
    <html
      lang="nl"
      className={`${inter.variable} ${headingCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white pb-20 text-brand-navy font-sans lg:pb-0">
        <Header content={content} />
        <main className="flex-1">{children}</main>
        <Footer content={content} />
        <MobileCtaBar content={content} />
        <CookieConsent />
      </body>
    </html>
  );
}
