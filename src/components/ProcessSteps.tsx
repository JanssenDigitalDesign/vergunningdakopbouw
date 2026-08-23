import type { LandingPageContent } from "@/types/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { GlowBlob } from "@/components/decor/GlowBlob";
import { MailIcon, RulerPencilIcon, CheckCircleIcon, FileCheckIcon } from "@/components/icons";

const ICONS = [MailIcon, RulerPencilIcon, CheckCircleIcon, FileCheckIcon];

export function ProcessSteps({ content }: { content: LandingPageContent }) {
  const steps = content.process_steps ?? [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <section id="werkwijze" className="relative overflow-hidden border-b border-brand-line bg-brand-beige-dark/30">
      <GlowBlob className="-bottom-24 right-0 h-80 w-80 bg-brand-gold/10" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Werkwijze"
          title="Zo werkt het"
          description="In vier duidelijke stappen naar een indieningsklare vergunningtekening."
        />

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/50 to-brand-gold/0 lg:block"
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <Reveal key={step.title} delay={index * 100}>
                  <li className="group relative h-full rounded-xl border border-brand-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-navy-light text-white shadow-md shadow-brand-navy/20 transition duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="absolute right-5 top-5 font-heading text-3xl font-extrabold text-brand-navy/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-semibold text-brand-navy">{step.title}</h3>
                    <p className="mt-2 text-sm text-brand-ink-muted">{step.description}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
