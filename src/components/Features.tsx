import type { LandingPageContent } from "@/types/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { GlowBlob } from "@/components/decor/GlowBlob";
import {
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ChatIcon,
  NoStringsIcon,
} from "@/components/icons";

const ICONS = [ClockIcon, ShieldCheckIcon, MapPinIcon, ChatIcon, NoStringsIcon];

// The USP section — deliberately the most trust-forward block on the page:
// every claim here is a concrete reason to pick us over an anonymous
// contact form, not a vague adjective.
export function Features({ content }: { content: LandingPageContent }) {
  return (
    <section className="relative overflow-hidden border-b border-brand-line bg-white">
      <GlowBlob className="left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 bg-brand-navy/10" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Waarom wij"
          title="Waarom klanten voor ons kiezen"
          description="Geen vage beloftes — dit is precies wat u van ons kunt verwachten."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.usps.map((usp, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal key={usp} delay={index * 75}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-brand-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-lg">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-gold/5 transition group-hover:bg-brand-gold/10" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-navy/15 to-brand-navy/5 text-brand-navy ring-1 ring-inset ring-brand-navy/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="relative mt-4 font-medium leading-snug text-brand-navy">{usp}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
