import Link from "next/link";
import type { LandingPageContent } from "@/types/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ChatIcon, CalendarIcon } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/site";

export function Faq({ content }: { content: LandingPageContent }) {
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="Vragen"
              title="Veelgestelde vragen"
              description="Staat uw vraag er niet bij? We beantwoorden hem graag persoonlijk."
            />
            <Reveal delay={100}>
              <a
                href={`tel:${content.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-xl border border-brand-line bg-brand-beige p-4 transition hover:border-brand-gold/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                  <ChatIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Bel ons direct</p>
                  <span className="text-sm text-brand-gold-dark">Persoonlijk contact met een specialist</span>
                </div>
              </a>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 rounded-xl border border-brand-line bg-brand-beige p-4 transition hover:border-brand-gold/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Liever plannen?</p>
                  <span className="text-sm text-brand-gold-dark">Plan gratis kennismakingsgesprek</span>
                </div>
              </a>
            </Reveal>
            <Reveal delay={140}>
              <Link
                href="/veelgestelde-vragen"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold-dark hover:text-brand-gold"
              >
                Bekijk alle veelgestelde vragen
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.29 5.15a.75.75 0 111.09-1.03l5.5 5.25a.75.75 0 010 1.06l-5.5 5.25a.75.75 0 11-1.09-1.03l4.098-4.1H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="space-y-3">
            {content.faq.map((item, index) => (
              <Reveal key={item.question} delay={index * 60}>
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
  );
}
