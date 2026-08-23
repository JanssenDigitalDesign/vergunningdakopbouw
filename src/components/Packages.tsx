import type { LandingPageContent } from "@/types/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckCircleIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonClassOnDark } from "@/lib/ui";

export function Packages({ content }: { content: LandingPageContent }) {
  const packages = content.packages ?? [];

  if (packages.length === 0) {
    return null;
  }

  return (
    <section id="pakketten" className="border-b border-brand-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Pakketten"
          title="Kies uw pakket"
          description="Altijd een offerte op maat — geen vaste prijzen, wel duidelijkheid vooraf over wat u krijgt."
          align="center"
        />

        <div
          className={`mx-auto mt-12 grid max-w-4xl gap-6 ${
            packages.length === 1 ? "max-w-md" : "sm:grid-cols-2"
          }`}
        >
          {packages.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 100}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 ${
                  pkg.highlighted
                    ? "border-brand-navy bg-brand-navy text-white shadow-xl"
                    : "border-brand-line bg-white text-brand-navy shadow-sm"
                }`}
              >
                {pkg.highlighted && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-navy">
                    Meest gekozen
                  </span>
                )}
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight">
                  {pkg.name}
                </h3>
                <p className={`mt-2 text-sm ${pkg.highlighted ? "text-slate-300" : "text-brand-ink-muted"}`}>
                  {pkg.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <CheckCircleIcon
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          pkg.highlighted ? "text-brand-gold" : "text-brand-gold-dark"
                        }`}
                      />
                      <span>
                        {feature}
                        {feature.toLowerCase().includes("werkdagen") && "*"}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#offerte"
                  className={`mt-8 w-full ${
                    pkg.highlighted ? primaryButtonClassOnDark() : primaryButtonClass()
                  }`}
                >
                  Offerte aanvragen
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {packages.some((pkg) => pkg.features.some((f) => f.toLowerCase().includes("werkdagen"))) && (
          <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-brand-ink-muted">
            * Exclusief eventuele tijd voor een constructieberekening door de constructeur, indien
            dit voor uw project nodig is.
          </p>
        )}
      </div>
    </section>
  );
}
