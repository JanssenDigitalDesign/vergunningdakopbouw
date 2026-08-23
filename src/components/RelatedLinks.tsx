import { Reveal } from "@/components/Reveal";

// A lightweight internal-linking row used at the bottom of service/region
// pages ("Andere diensten" / "Andere regio's") — this cross-linking is what
// actually makes a multi-page SEO structure work, not just having the
// pages exist.
export function RelatedLinks({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-brand-line bg-brand-beige-dark/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-dark">{title}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-brand-navy underline decoration-brand-line underline-offset-4 transition hover:decoration-brand-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
