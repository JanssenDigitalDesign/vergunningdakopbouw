import { useId } from "react";

// A stylised "coverage" visual for region pages — a dot-grid (echoing the
// BlueprintGrid motif used elsewhere) plus a pulsing marker and radius
// rings, labelled with the province name. Deliberately not a literal
// province-border map (hard to get geographically right) and not a stock
// photo (which wouldn't actually depict the region) — an honest, on-brand
// stand-in for "we work throughout this area".
export function CoverageMap({ regionName, className = "" }: { regionName: string; className?: string }) {
  const patternId = useId();

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-brand-navy ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full text-white/10" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="absolute h-40 w-40 rounded-full border border-brand-gold/20" />
        <span className="absolute h-24 w-24 animate-ping rounded-full border border-brand-gold/30 [animation-duration:3s]" />
        <span className="absolute h-24 w-24 rounded-full border border-brand-gold/40" />
        <span className="relative h-4 w-4 rounded-full bg-brand-gold shadow-[0_0_0_6px_rgba(192,138,62,0.25)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/70 to-transparent p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Dekking</p>
        <p className="mt-1 font-heading text-2xl font-bold uppercase tracking-tight text-white">
          {regionName}
        </p>
      </div>
    </div>
  );
}
