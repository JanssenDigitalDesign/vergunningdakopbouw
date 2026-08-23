import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ContactSection } from "@/components/ContactSection";
import { FaqPageStructuredData } from "@/components/StructuredData";
import { ChatIcon, CalendarIcon } from "@/components/icons";
import { getLandingPageContent } from "@/lib/content";
import { SITE_URL, CALENDLY_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent();
  const title = `Veelgestelde vragen | ${content.brand_name}`;
  const description = `Alle antwoorden op een rij over ${content.brand_name.toLowerCase()}: proces, kosten, levertijd en de eisen waar u rekening mee moet houden.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/veelgestelde-vragen` },
    openGraph: { title, description, url: `${SITE_URL}/veelgestelde-vragen`, locale: "nl_NL", type: "website" },
  };
}

export default async function VeelgesteldeVragenPage() {
  const content = await getLandingPageContent();

  return (
    <>
      <FaqPageStructuredData items={content.faq} />
      <PageHeader
        eyebrow="Vragen"
        h1="Veelgestelde vragen"
        intro="Alles wat u wilt weten over het traject: van proces en levertijd tot kosten en de eisen waar we rekening mee houden."
        image="/images/trust-blueprint-table.jpg"
        imageAlt="Technische tekeningen en een liniaal op een werktafel"
        ctaLabel={content.cta_text}
        breadcrumb={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Veelgestelde vragen" }]} />
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-3 rounded-xl border border-brand-line bg-brand-beige p-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
              <a
                href={`tel:${content.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-sm font-semibold text-brand-navy hover:underline"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                  <ChatIcon className="h-5 w-5" />
                </span>
                Bel gerust: {content.phone}
              </a>
              <span className="hidden h-8 w-px bg-brand-line sm:block" />
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-brand-gold-dark hover:text-brand-gold"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                  <CalendarIcon className="h-5 w-5" />
                </span>
                Plan gratis kennismakingsgesprek
              </a>
            </div>
          </Reveal>

          <div className="mt-14">
            <SectionHeading eyebrow="Algemeen" title="Alle vragen" />
            <div className="mt-6 space-y-3">
              {content.faq.map((item, index) => (
                <Reveal key={item.question} delay={index * 50}>
                  <details className="group rounded-xl border border-brand-line bg-white p-5 open:border-brand-gold/50 open:shadow-md">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-brand-navy">
                      {item.question}
                      <svg
                        className="h-5 w-5 shrink-0 text-brand-navy transition group-open:rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-brand-ink-muted">{item.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection content={content} />
    </>
  );
}
