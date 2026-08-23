import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { BlueprintGrid } from "@/components/decor/BlueprintGrid";
import { GlowBlob } from "@/components/decor/GlowBlob";
import { Reveal } from "@/components/Reveal";
import { ClockIcon } from "@/components/icons";
import type { LandingPageContent } from "@/types/content";

export function ContactSection({ content }: { content: LandingPageContent }) {
  return (
    <section id="offerte" className="relative overflow-hidden bg-brand-navy">
      <Image
        src="/images/contact-onsite-review.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/90 to-brand-navy" />
      <BlueprintGrid className="text-white/5" />
      <GlowBlob className="-top-32 left-1/4 h-96 w-96 bg-brand-navy-light/40" />
      <GlowBlob className="-bottom-32 right-1/4 h-80 w-80 bg-brand-gold/10" />

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <Reveal>
          <h2 className="font-heading text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
            {content.cta_text}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Binnen {content.delivery_time}* een complete tekening,{" "}
            {content.service_area.toLowerCase()}. Geen verplichtingen vooraf.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <ClockIcon className="h-4 w-4 text-brand-gold" />
            U ontvangt binnen 24 uur een reactie met offerte
          </span>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-2xl ring-1 ring-white/10 sm:p-10">
            <ContactForm content={content} />
          </div>
        </Reveal>

        <p className="mx-auto mt-4 max-w-xl text-xs text-slate-400">
          * Exclusief eventuele tijd voor een constructieberekening door de constructeur, indien
          dit voor uw project nodig is.
        </p>
      </div>
    </section>
  );
}
