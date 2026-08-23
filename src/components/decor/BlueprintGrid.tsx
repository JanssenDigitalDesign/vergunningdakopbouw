import { useId } from "react";

// A faint blueprint-style grid used as a background texture. Pure SVG/CSS,
// no image request, so it costs nothing in page weight or LCP.
//
// Uses useId() for the pattern id because this component is rendered more
// than once per page (Hero, ContactSection) — a fixed id would collide,
// and duplicate SVG ids make url(#id) references resolve unpredictably.
export function BlueprintGrid({ className = "" }: { className?: string }) {
  const patternId = useId();

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
