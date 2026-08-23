import Image from "next/image";
import type { LandingPageContent, ServiceItem } from "@/types/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { GlowBlob } from "@/components/decor/GlowBlob";
import { DEFAULT_SERVICE_IMAGE } from "@/lib/serviceImages";
import { DormerIcon, RulerPencilIcon, ShieldCheckIcon, FileCheckIcon } from "@/components/icons";

const ICONS = [DormerIcon, RulerPencilIcon, ShieldCheckIcon, FileCheckIcon];

export function Services({ content }: { content: LandingPageContent }) {
  return (
    <section id="diensten" className="relative overflow-hidden border-b border-brand-line bg-white">
      <GlowBlob className="-bottom-32 -left-24 h-80 w-80 bg-brand-navy/10" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Diensten"
          title="Waar wij u bij helpen"
          description="Van eerste schets tot een tekening die voldoet aan de eisen van uw gemeente."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <Reveal key={service.title} delay={index * 75}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = ICONS[index % ICONS.length];
  const image = DEFAULT_SERVICE_IMAGE;

  return (
    <a
      href="#offerte"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/10 to-transparent" />
        <span className="absolute right-4 top-3 font-heading text-3xl font-extrabold text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur transition duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-semibold text-brand-navy">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm text-brand-ink-muted">{service.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold-dark">
          Offerte aanvragen
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.29 5.15a.75.75 0 111.09-1.03l5.5 5.25a.75.75 0 010 1.06l-5.5 5.25a.75.75 0 11-1.09-1.03l4.098-4.1H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
