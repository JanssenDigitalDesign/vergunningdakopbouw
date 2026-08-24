import Image from "next/image";
import type { LandingPageContent, ServiceItem } from "@/types/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { GlowBlob } from "@/components/decor/GlowBlob";
import { DEFAULT_SERVICE_IMAGE } from "@/lib/serviceImages";
import { ClipboardCheckIcon, RulerPencilIcon, ShieldCheckIcon, FileCheckIcon } from "@/components/icons";

const ICONS = [ClipboardCheckIcon, RulerPencilIcon, ShieldCheckIcon, FileCheckIcon];

// Every site's four services follow the same recurring pattern (the main
// drawing service, a vergunningvrij-toets, constructieve onderbouwing,
// begeleiding/aanvraag) — matching on that pattern here means each card
// gets a genuinely different, topically-correct photo without needing a
// bespoke image per service per site. Falls back to the site's own hero
// photo (DEFAULT_SERVICE_IMAGE) for the main service and anything that
// doesn't match a known pattern, so a card is never left without an image.
const FALLBACK_IMAGES: { src: string; alt: string }[] = [
  DEFAULT_SERVICE_IMAGE,
  { src: "/images/hero-drafting-desk.jpg", alt: "Tekenaar werkt aan een technische bouwtekening" },
  { src: "/images/hero-villa.jpg", alt: "Vrijstaande woning waarvoor een vergunningtekening is gemaakt" },
  { src: "/images/hero-vergunningtekening.jpg", alt: "Uitgewerkte vergunningtekening met maatvoering" },
];

function matchImage(title: string): { src: string; alt: string } | null {
  const t = title.toLowerCase();
  if (t.includes("toets") || t.includes("check")) {
    return { src: "/images/service-toets.jpg", alt: "Inspecteur controleert een checklist op locatie" };
  }
  if (t.includes("constructie") || t.includes("onderbouwing")) {
    return { src: "/images/service-constructie.jpg", alt: "Detail van een constructieve staalverbinding" };
  }
  if (t.includes("begeleiding") || t.includes("aanvraag") || t.includes("indienen")) {
    return { src: "/images/aanvraag-proces-hero.jpg", alt: "Aanvraagformulier wordt ingevuld" };
  }
  return null;
}

// Matches each card to a topically-correct photo first, then fills any card
// left without one (no keyword match, or its match already taken by an
// earlier card) from a small pool of generic photos, so no two cards on the
// same page ever repeat an image regardless of the service titles.
function imagesFor(services: ServiceItem[]): { src: string; alt: string }[] {
  const used = new Set<string>();
  const matched = services.map((service) => {
    const image = matchImage(service.title);
    if (image && !used.has(image.src)) {
      used.add(image.src);
      return image;
    }
    return null;
  });

  let poolIndex = 0;
  return matched.map((image) => {
    if (image) return image;
    while (poolIndex < FALLBACK_IMAGES.length && used.has(FALLBACK_IMAGES[poolIndex].src)) {
      poolIndex++;
    }
    const fallback = FALLBACK_IMAGES[poolIndex] ?? DEFAULT_SERVICE_IMAGE;
    used.add(fallback.src);
    poolIndex++;
    return fallback;
  });
}

export function Services({ content }: { content: LandingPageContent }) {
  const images = imagesFor(content.services);
  return (
    <section id="diensten" className="relative overflow-hidden border-b border-brand-line bg-white">
      <GlowBlob className="-bottom-32 -left-24 h-80 w-80 bg-brand-navy/10" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Diensten"
          title="Diensten voor uw dakopbouwvergunning"
          description="Van eerste schets tot een tekening die voldoet aan de eisen van uw gemeente."
        />

        {/* Horizontal scroll-snap row instead of a 3-and-1 grid: shows as
            many cards as fit the viewport at once, and scrolls (trackpad,
            touch, or arrow keys once focused) for the rest — no JS needed. */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
          {content.services.map((service, index) => (
            <div key={service.title} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
              <Reveal delay={index * 75}>
                <ServiceCard service={service} index={index} image={images[index]} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  image,
}: {
  service: ServiceItem;
  index: number;
  image: { src: string; alt: string };
}) {
  const Icon = ICONS[index % ICONS.length];

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
