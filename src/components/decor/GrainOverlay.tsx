import { useId } from "react";

// A faint film-grain texture for dark/hero sections — pure SVG turbulence
// filter, no image request, so it costs nothing in page weight or LCP.
// Uses useId() for the filter id because this can render more than once
// per page (Hero, PageHeader) — a fixed id would collide.
export function GrainOverlay({ className = "" }: { className?: string }) {
  const filterId = useId();

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}
