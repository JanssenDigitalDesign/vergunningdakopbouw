import Link from "next/link";
import type { LandingPageContent } from "@/types/content";
import { primaryButtonClassOnDark } from "@/lib/ui";
import { whatsAppLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";
import { BrandLockup } from "@/components/BrandMark";

const MORE_LINKS = [
  { href: "/#diensten", label: "Diensten" },
  { href: "/#werkwijze", label: "Werkwijze" },
  { href: "/#pakketten", label: "Pakketten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/veelgestelde-vragen", label: "Veelgestelde vragen" },
  { href: "#offerte", label: "Offerte aanvragen" },
];

export function Footer({ content }: { content: LandingPageContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-navy text-slate-300">
      <div className="h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/50 to-brand-gold/0" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <BrandLockup
              name={content.brand_name}
              badgeClassName="bg-white/10 text-white"
              wordmarkClassName="text-white text-lg"
              accentClassName="text-brand-gold"
            />
            <p className="mt-3 text-sm text-slate-400">{content.service_area}</p>

            <a
              href={`tel:${content.phone.replace(/\s+/g, "")}`}
              className="mt-5 block text-sm font-medium text-white hover:text-brand-gold"
            >
              {content.phone}
            </a>
            <a
              href={whatsAppLink(content.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-brand-gold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a href="#offerte" className={`mt-4 ${primaryButtonClassOnDark("sm")}`}>
              Offerte aanvragen
            </a>
          </div>

          <FooterColumn title="Meer" items={MORE_LINKS} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>{content.footer_legal_line}</p>
            <p className="mt-1">
              &copy; {year} {content.brand_name}. Alle rechten voorbehouden.
            </p>
          </div>
          <Link href="/privacyverklaring" className="text-slate-400 hover:text-brand-gold">
            Privacy- en cookiebeleid
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-sm text-slate-300 hover:text-brand-gold">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
