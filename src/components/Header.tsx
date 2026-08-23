import Link from "next/link";
import type { LandingPageContent } from "@/types/content";
import { primaryButtonClass } from "@/lib/ui";
import { CALENDLY_URL } from "@/lib/site";
import { CalendarIcon } from "@/components/icons";
import { BrandLockup } from "@/components/BrandMark";

const NAV_LINKS = [
  { href: "/#diensten", label: "Diensten" },
  { href: "/#werkwijze", label: "Werkwijze" },
  { href: "/#pakketten", label: "Pakketten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/veelgestelde-vragen", label: "Veelgestelde vragen" },
];

// Header is used on every page (homepage, /over-ons, /veelgestelde-vragen,
// /privacyverklaring — wired up once in layout.tsx), so links to
// homepage-only sections point at "/#section" rather than a bare
// "#section": a bare anchor would silently do nothing outside the
// homepage. "#offerte" stays bare since ContactSection is on every page.
export function Header({ content }: { content: LandingPageContent }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-white/80 shadow-sm shadow-slate-900/[0.03] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/">
          <BrandLockup
            name={content.brand_name}
            badgeClassName="bg-brand-navy text-white"
            wordmarkClassName="text-xl text-brand-navy"
            accentClassName="text-brand-gold-dark"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <TopLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Hidden below lg: MobileCtaBar already gives mobile visitors a
              persistent CTA, and there isn't room for both these buttons
              and the hamburger button in a narrow header row. */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand-navy/20 px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:border-brand-navy hover:bg-brand-beige"
            >
              <CalendarIcon className="h-4 w-4" />
              Plan gesprek
            </a>
            <a href="#offerte" className={primaryButtonClass("sm")}>
              Offerte aanvragen
            </a>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function TopLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-brand-navy"
    >
      {label}
      <span className="absolute inset-x-3 -bottom-[1px] h-px scale-x-0 bg-brand-gold transition-transform duration-200 ease-out group-hover:scale-x-100" />
    </a>
  );
}

// Zero-JS mobile menu built on <details>/<summary> (same disclosure
// primitive already used for the FAQ accordion) so Header doesn't need to
// become a client component just to show a menu.
function MobileMenu() {
  return (
    <details className="group relative lg:hidden">
      <summary
        aria-label="Menu"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-brand-line text-brand-navy [&::-webkit-details-marker]:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg viewBox="0 0 24 24" className="hidden h-5 w-5 group-open:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </summary>
      <div className="fixed inset-x-0 top-[73px] z-50 max-h-[calc(100vh-73px)] overflow-y-auto border-t border-brand-line bg-white p-5 shadow-xl">
        <ul className="space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-navy hover:bg-brand-beige">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
