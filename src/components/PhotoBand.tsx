import Image from "next/image";
import { Reveal } from "@/components/Reveal";

// A full-bleed photo interlude to break up the page rhythm between content
// sections, the way premium architecture/real-estate sites use a large
// image as a pause rather than another card grid.
export function PhotoBand() {
  return (
    <section className="relative flex h-[50vh] min-h-[360px] items-center overflow-hidden">
      <Image
        src="/images/blueprint-villa-section.jpg"
        alt="Historische blauwdruk van een doorsnede van een villa"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-brand-navy/10" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="max-w-xl font-heading text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">
            Van eerste schets tot een tekening die voldoet aan de eisen van
            uw gemeente
          </p>
        </Reveal>
      </div>
    </section>
  );
}
