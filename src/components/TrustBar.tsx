import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { BlueprintGrid } from "@/components/decor/BlueprintGrid";
import { ShieldCheckIcon, ClipboardCheckIcon, FileCheckIcon } from "@/components/icons";

const ITEMS = [
  {
    icon: ShieldCheckIcon,
    label: "Omgevingsloket",
    description: "Tekeningen conform de eisen van het Omgevingsloket",
  },
  {
    icon: ClipboardCheckIcon,
    label: "Welstandscommissie",
    description: "Rekening houdend met welstandseisen van uw gemeente",
  },
  {
    icon: FileCheckIcon,
    label: "Bbl",
    description: "Opgesteld conform het Besluit bouwwerken leefomgeving",
  },
];

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-brand-navy">
      <Image
        src="/images/trustbar-roof-frame.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/75" />
      <BlueprintGrid className="text-white/[0.04]" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <Reveal>
          <p className="mb-8 max-w-xl font-heading text-lg font-semibold uppercase tracking-tight text-white sm:text-xl">
            Elke tekening voldoet aantoonbaar aan de regels
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-gold ring-1 ring-inset ring-white/10">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-heading text-base font-bold uppercase tracking-wide text-white">
                    {item.label}
                  </p>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
