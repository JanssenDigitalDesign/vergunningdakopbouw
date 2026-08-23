import { SITE_URL } from "@/lib/site";
import type { FaqItem, LandingPageContent } from "@/types/content";

export function StructuredData({ content }: { content: LandingPageContent }) {
  const testimonials = content.testimonials ?? [];
  // Only ever computed from real reviews already in Supabase — never a
  // fabricated rating. Omitted entirely while that array is empty, per
  // Google's guidelines against unverified/fake AggregateRating markup.
  const aggregateRating =
    testimonials.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (
            testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
          ).toFixed(1),
          reviewCount: testimonials.length,
        }
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: content.brand_name,
        url: SITE_URL,
        telephone: content.phone,
        areaServed: "NL",
        description: content.meta_description,
        ...(aggregateRating ? { aggregateRating } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// A standalone FAQPage graph for a given list of Q&As — used on
// /veelgestelde-vragen, where the visible content is a bigger, aggregated
// set (general + every service's FAQ) than the homepage's single-source
// content.faq. Must always match the visible text exactly.
export function FaqPageStructuredData({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
