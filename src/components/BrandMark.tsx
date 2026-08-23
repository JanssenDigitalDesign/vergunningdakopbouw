// A stacked-roofline pictogram (existing volume + an added top layer)
// instead of the plain roofline used on the other JDD sites — this is the
// dakopbouw brand.
export function BrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V13h16v7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 13V8l6-4 6 4v5" stroke="currentColor" strokeWidth="1.7" strokeDasharray="1.6 1.8" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// A dimension line with tick-mark ends and a centre point — the exact
// annotation convention used on every drawing this business produces —
// stretched under the whole icon+wordmark lockup. Doing it this way (one
// rule spanning the full lockup) gives the mark more presence than simply
// enlarging the icon square would, and ties the icon and wordmark together
// as a single unit instead of two loose elements.
function DimensionRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      className={`h-1.5 w-full ${className}`}
      aria-hidden="true"
    >
      <line x1="1" y1="3" x2="99" y2="3" stroke="var(--brand-gold)" strokeWidth="1" />
      <line x1="1" y1="0.5" x2="1" y2="5.5" stroke="var(--brand-gold)" strokeWidth="1" />
      <line x1="99" y1="0.5" x2="99" y2="5.5" stroke="var(--brand-gold)" strokeWidth="1" />
      <circle cx="50" cy="3" r="1.1" fill="var(--brand-gold)" />
    </svg>
  );
}

// Tints the tail of the brand name from its last recognizable root word
// onward ("vergunning" or "tekening" — permit / drawing, the two words
// every one of these brand names is built from) so a dense compound word
// reads as two parts instead of one solid block of caps. Falls back to a
// plain string when neither root is found, so this stays safe for any
// brand name.
const ROOTS = ["vergunning", "tekening"];

export function BrandWordmark({
  name,
  accentClassName,
}: {
  name: string;
  accentClassName: string;
}) {
  const lower = name.toLowerCase();

  // A root word right at the start (e.g. "Vergunningdakopbouw") reads
  // better with the *remainder* accented — otherwise the whole name would
  // end up colored, which isn't a two-tone effect at all.
  for (const root of ROOTS) {
    if (lower.startsWith(root) && lower.length > root.length) {
      return (
        <>
          {name.slice(0, root.length)}
          <span className={accentClassName}>{name.slice(root.length)}</span>
        </>
      );
    }
  }

  // Otherwise, accent from the last occurrence of either root to the end
  // (e.g. "Aanbouw|Vergunning", "Snellebouw|Tekening").
  const splitIndex = Math.max(lower.lastIndexOf("vergunning"), lower.lastIndexOf("tekening"));
  if (splitIndex <= 0) return <>{name}</>;

  return (
    <>
      {name.slice(0, splitIndex)}
      <span className={accentClassName}>{name.slice(splitIndex)}</span>
    </>
  );
}

// The full lockup (icon badge + wordmark + dimension rule) shared by
// Header and Footer — only the color tokens differ between a light and a
// dark surface.
export function BrandLockup({
  name,
  badgeClassName,
  wordmarkClassName,
  accentClassName,
}: {
  name: string;
  badgeClassName: string;
  wordmarkClassName: string;
  accentClassName: string;
}) {
  return (
    <span className="inline-flex flex-col">
      <span className="flex items-center gap-2.5">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${badgeClassName}`}>
          <BrandIcon />
        </span>
        <span className={`font-heading font-bold uppercase tracking-tight ${wordmarkClassName}`}>
          <BrandWordmark name={name} accentClassName={accentClassName} />
        </span>
      </span>
      <DimensionRule className="mt-1.5" />
    </span>
  );
}
