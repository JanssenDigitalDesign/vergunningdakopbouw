import type { LandingPageContent } from "@/types/content";
import { primaryButtonClass } from "@/lib/ui";

// A persistent bottom action bar on mobile, where the header's CTA is easy
// to scroll past. Pure CSS (no JS), hidden from lg upward where the header
// CTA is always visible anyway.
export function MobileCtaBar({ content }: { content: LandingPageContent }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-brand-line bg-white/95 p-3 shadow-[0_-4px_16px_rgba(11,11,40,0.08)] backdrop-blur lg:hidden">
      <a
        href={`tel:${content.phone.replace(/\s+/g, "")}`}
        aria-label={`Bel ${content.brand_name}: ${content.phone}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-line text-brand-navy"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2z" />
        </svg>
      </a>
      <a href="#offerte" className={`flex-1 ${primaryButtonClass("sm")}`}>
        {content.cta_text}
      </a>
    </div>
  );
}
