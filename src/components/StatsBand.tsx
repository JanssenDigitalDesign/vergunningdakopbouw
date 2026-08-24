import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import type { LandingPageContent } from "@/types/content";

// Bold, numeric-style social proof — the thing this site was missing
// compared to competitors that lead with "4.9/5, 133 reviews". We don't
// have real customer reviews yet (Testimonials.tsx correctly stays hidden
// until we do — never fabricate those), so this leads with real,
// already-approved facts instead of inventing quotes or a precise
// customer count we can't back up.
export function StatsBand({ content }: { content: LandingPageContent }) {
  const stats = [
    { value: "Honderden", label: "vergunningtekeningen gemaakt" },
    { value: "24 uur", label: "reactietijd op uw offerte-aanvraag" },
    { value: "12", label: "provincies — heel Nederland" },
    { value: content.delivery_time, label: "gemiddelde levertijd*" },
  ];

  return (
    <section className="border-b border-brand-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 75} className="text-center">
              <CountUp
                value={stat.value}
                className="font-heading text-4xl font-extrabold uppercase tracking-tight text-brand-navy sm:text-5xl"
              />
              <p className="mt-1.5 text-sm text-brand-ink-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-brand-ink-muted">
          * Exclusief eventuele tijd voor een constructieberekening door de constructeur, indien
          dit voor uw project nodig is.
        </p>
      </div>
    </section>
  );
}
