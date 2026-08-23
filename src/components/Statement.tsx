import Image from "next/image";
import { Reveal } from "@/components/Reveal";

// Deliberately breaks the card-grid rhythm the rest of the homepage runs
// on (Features/Services/Packages are all rounded-card grids) —
// one full-bleed, near-black band with a single large typographic
// statement and nothing else: no cards, no icons, no grid. Background is
// a real 1900s Amsterdam City Archives cyanotype blueprint (public-domain
// archive material, not a client's confidential drawing) — it doubles as
// the most literal possible "blueprint" visual the brand's near-black
// palette already gestures at.
export function Statement() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-brand-navy-dark">
      <Image
        src="/images/blueprint-damrak.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark via-brand-navy-dark/90 to-brand-navy-dark" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            <span className="h-px w-6 bg-brand-gold" aria-hidden="true" />
            Onze belofte
            <span className="h-px w-6 bg-brand-gold" aria-hidden="true" />
          </span>
          <p className="mt-6 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Eén keer goed getekend.
            <br />
            <span className="text-brand-gold">Geen verrassingen</span> bij de gemeente.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-slate-300">
            Geen halve tekening die alsnog terugkomt van de balie. Wij toetsen elke tekening aan
            de eisen van het Omgevingsloket vóórdat u hem indient.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
