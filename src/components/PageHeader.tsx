import Image from "next/image";
import { GrainOverlay } from "@/components/decor/GrainOverlay";
import { primaryButtonClassOnDark } from "@/lib/ui";

// Compact hero for service/region sub-pages — same Ken Burns/gradient
// language as the homepage Hero (src/components/Hero.tsx) so the site
// still feels like one piece, but ~50vh instead of full-viewport: visitors
// arriving from a service/region search want the actual content fast, not
// another full-screen photo.
export function PageHeader({
  eyebrow,
  h1,
  intro,
  image,
  imageAlt,
  breadcrumb,
  ctaLabel,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  breadcrumb?: React.ReactNode;
  ctaLabel: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden">
      <div className="absolute inset-0 animate-ken-burns">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-brand-navy/25" />
      <GrainOverlay className="text-white opacity-[0.04] mix-blend-overlay" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
        {breadcrumb}
        <span className="animate-eyebrow inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
          <span className="h-px w-6 bg-brand-gold" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {h1}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-200">{intro}</p>
        <div className="mt-8">
          <a href="#offerte" className={primaryButtonClassOnDark()}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
