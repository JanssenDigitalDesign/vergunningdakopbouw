import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";
import type { LandingPageContent } from "@/types/content";
import { ClockIcon, MapPinIcon, ChatIcon, CalendarIcon, MailIcon } from "@/components/icons";
import { primaryButtonClass, secondaryButtonClass } from "@/lib/ui";
import { CALENDLY_URL } from "@/lib/site";

// A real photo of a technical drawing being worked on — warm wood desk,
// scale ruler, rolled drawing — instead of an abstract render of the
// drawing itself: the earlier duotone-elevation hero read as an unfinished
// wireframe (floating, unexplained detail-callout numbers) rather than a
// confident piece of design. This keeps the "we draw real permit
// drawings" signal without that artifact, and actually earns the Ken
// Burns zoom, which needs a photo with real depth to look intentional.
export function Hero({ content }: { content: LandingPageContent }) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src="/images/dakopbouw-bouwproces-hero.jpg"
          alt="Dakopbouw in aanbouw op een bestaand pand met steigers"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/65 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:pb-32">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
          {content.service_area} &middot; levertijd {content.delivery_time}
        </p>

        <h1 className="max-w-4xl break-words font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl sm:leading-[0.88] lg:text-8xl">
          {content.h1}
        </h1>

        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#offerte" className={primaryButtonClass()}>
            {content.cta_text}
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${secondaryButtonClass} gap-2.5 border-white/30 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white hover:text-brand-navy`}
          >
            <CalendarIcon className="h-4 w-4" />
            Plan gratis kennismakingsgesprek
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <TrustPill icon={MailIcon}>Offerte binnen 24 uur</TrustPill>
          <TrustPill icon={ClockIcon}>{content.delivery_time} levertijd</TrustPill>
          <TrustPill icon={MapPinIcon}>{content.service_area}</TrustPill>
          <TrustPill icon={ChatIcon}>Persoonlijk contact</TrustPill>
        </div>
      </div>

      <a
        href="#diensten"
        aria-label="Scroll naar diensten"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition hover:text-white sm:flex"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 animate-bounce"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </section>
  );
}

function TrustPill({
  icon: Icon,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur">
      <Icon className="h-4 w-4 text-white/80" />
      {children}
    </span>
  );
}
