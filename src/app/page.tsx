import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { StatsBand } from "@/components/StatsBand";
import { Features } from "@/components/Features";
import { Statement } from "@/components/Statement";
import { Services } from "@/components/Services";
import { TrustBar } from "@/components/TrustBar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { PhotoBand } from "@/components/PhotoBand";
import { Packages } from "@/components/Packages";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { ContactSection } from "@/components/ContactSection";
import { StructuredData } from "@/components/StructuredData";
import { getLandingPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

// Content changes rarely (it's edited in Supabase, not by visitors), so the
// page is statically generated and revalidated hourly rather than rendered
// on every request.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent();

  return {
    title: content.meta_title,
    description: content.meta_description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: content.meta_title,
      description: content.meta_description,
      url: SITE_URL,
      siteName: content.brand_name,
      locale: "nl_NL",
      type: "website",
    },
  };
}

export default async function Home() {
  const content = await getLandingPageContent();

  return (
    <>
      <StructuredData content={content} />
      <Hero content={content} />
      <StatsBand content={content} />
      <Features content={content} />
      <Statement />
      <Services content={content} />
      <TrustBar />
      <ProcessSteps content={content} />
      <PhotoBand />
      <Packages content={content} />
      <Testimonials content={content} />
      <Faq content={content} />
      <ContactSection content={content} />
    </>
  );
}
