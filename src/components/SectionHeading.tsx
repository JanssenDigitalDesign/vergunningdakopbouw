import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

// The repeated "eyebrow label + big uppercase H2 (+ optional intro line)"
// block used at the top of every content section. Centralised so the new
// eyebrow motif (small tracked-out label above every heading — the
// editorial-studio signal referenced from everwonder.studio) stays
// consistent instead of six slightly-different copies.
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`animate-eyebrow inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] ${
          align === "center" ? "justify-center" : ""
        } ${light ? "text-brand-gold" : "text-brand-gold-dark"}`}
      >
        <span className="h-px w-6 bg-brand-gold" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl ${
          light ? "text-brand-beige" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 ${light ? "text-brand-beige/70" : "text-brand-ink-muted"}`}>{description}</p>
      )}
    </Reveal>
  );
}
