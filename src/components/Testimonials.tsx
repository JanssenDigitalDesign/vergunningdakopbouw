"use client";

import { useEffect, useState } from "react";
import type { LandingPageContent, Testimonial } from "@/types/content";
import { SectionHeading } from "@/components/SectionHeading";

// Hides itself until real reviews exist in Supabase — never seed this with
// fabricated testimonials, that's presenting fake social proof as genuine.
// A client component (not the usual server-rendered section) because the
// slideshow needs interaction state — current slide, autoplay, pause on
// hover — that can't be done server-side.
export function Testimonials({ content }: { content: LandingPageContent }) {
  const testimonials = content.testimonials ?? [];

  if (testimonials.length === 0) {
    return null;
  }

  const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section className="border-b border-brand-line bg-brand-beige-dark/30">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Ervaringen" title="Wat klanten zeggen" align="center" />

        <div className="mt-8 flex items-center justify-center gap-2">
          <Stars rating={Math.round(average)} size="h-5 w-5" />
          <span className="text-sm font-semibold text-brand-navy">{average.toFixed(1)}</span>
          <span className="text-sm text-brand-ink-muted">
            op basis van {testimonials.length} reviews
          </span>
        </div>

        <div className="mt-10">
          <Carousel items={testimonials} />
        </div>
      </div>
    </section>
  );
}

function Carousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const current = items[index];
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-white px-8 py-10 text-center shadow-sm sm:px-16 sm:py-14">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mx-auto h-8 w-8 text-brand-gold/30"
          aria-hidden="true"
        >
          <path d="M9.5 6C6.5 7.5 5 10 5 13c0 2.5 1.7 4.5 4 4.5 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.8-3-.3 0-.6 0-.8.1.3-2 1.8-3.7 3.6-4.6L9.5 6zm9 0c-3 1.5-4.5 4-4.5 7 0 2.5 1.7 4.5 4 4.5 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.8-3-.3 0-.6 0-.8.1.3-2 1.8-3.7 3.6-4.6L18.5 6z" />
        </svg>

        <div key={index} className="animate-testimonial-fade mt-4">
          <Stars rating={current.rating} size="h-5 w-5" className="justify-center" />
          <blockquote className="mx-auto mt-4 max-w-xl text-lg text-brand-navy sm:text-xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm font-semibold text-brand-navy">
            {current.name}
            <span className="font-normal text-brand-ink-muted"> — {current.project_type}</span>
          </p>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Vorige review"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-brand-line bg-white p-2 text-brand-navy transition hover:border-brand-gold sm:flex"
            >
              <ChevronIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Volgende review"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-brand-line bg-white p-2 text-brand-navy transition hover:border-brand-gold sm:flex"
            >
              <ChevronIcon className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.name + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ga naar review van ${item.name}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-gold" : "w-2 bg-brand-navy/15 hover:bg-brand-navy/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Stars({
  rating,
  size = "h-4 w-4",
  className = "",
}: {
  rating: number;
  size?: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${size} ${i < rating ? "text-brand-gold" : "text-slate-200"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
