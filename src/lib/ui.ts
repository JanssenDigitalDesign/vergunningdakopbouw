// Shared button styling so every CTA on the page (header, hero, footer,
// form) reads as the same confident, high-contrast action instead of
// slightly-different one-off button styles.
//
// The primary action is filled with the brand's amber accent rather than
// navy — on a site this navy/paper-heavy, a navy-on-white or beige-on-navy
// button barely registers as "the" thing to click. Amber is used nowhere
// else as a fill, so wherever it appears solid, it's unambiguously the
// action to take. Both variants (light-surface and dark-surface) use the
// same amber fill since amber has enough contrast against both.
function sizing(size: "sm" | "md") {
  return size === "sm" ? "px-4 py-2.5 text-sm" : "px-7 py-3.5 text-base";
}

export function primaryButtonClass(size: "sm" | "md" = "md") {
  return `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg ${sizing(size)} font-semibold text-brand-navy bg-gradient-to-b from-brand-gold to-brand-gold-dark shadow-lg shadow-brand-gold-dark/30 ring-1 ring-inset ring-white/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-gold-dark/40 active:translate-y-0 active:shadow-md`;
}

export function primaryButtonClassOnDark(size: "sm" | "md" = "md") {
  return `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg ${sizing(size)} font-semibold text-brand-navy bg-gradient-to-b from-brand-gold to-brand-gold-dark shadow-lg shadow-black/30 ring-1 ring-inset ring-white/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md`;
}

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-brand-navy transition duration-200 hover:-translate-y-0.5 hover:border-brand-navy hover:shadow-md";
