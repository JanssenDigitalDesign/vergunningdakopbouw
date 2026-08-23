// Soft blurred gradient blob used behind hero/CTA content for depth. Pure
// CSS (radial-gradient), no image asset.
export function GlowBlob({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}
