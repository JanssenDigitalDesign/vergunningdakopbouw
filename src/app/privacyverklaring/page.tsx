import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { getLandingPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent();
  const title = `Privacy- en cookiebeleid | ${content.brand_name}`;
  const description =
    "Lees welke gegevens wij verzamelen, waarom, en welke cookies deze website plaatst.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/privacyverklaring` },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: `${SITE_URL}/privacyverklaring`, locale: "nl_NL", type: "website" },
  };
}

// Legal content — every fact here is something we actually know (brand
// name, legal entity, phone, the processors this codebase genuinely
// integrates with: Supabase for form submissions, Calendly for bookings,
// Google Analytics gated behind CookieConsent.tsx, Vercel for hosting).
// Deliberately does NOT state a specific retention period for lead data or
// the Supabase hosting region — not confirmed yet, so not invented for a
// legal document.
export default async function PrivacyverklaringPage() {
  const content = await getLandingPageContent();

  return (
    <>
      <section className="border-b border-brand-line bg-brand-beige">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-28 sm:px-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy- en cookiebeleid" }]} />
          <span className="mt-4 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-dark">
            <span className="h-px w-6 bg-brand-gold-dark" aria-hidden="true" />
            Privacy
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-navy sm:text-5xl">
            Privacy- en cookiebeleid
          </h1>
          <p className="mt-4 max-w-2xl text-brand-ink-muted">
            Hoe wij omgaan met uw gegevens wanneer u deze website bezoekt of een offerte
            aanvraagt.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-14 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Wie wij zijn" title="Verwerkingsverantwoordelijke" />
            <div className="mt-6 space-y-4 text-brand-ink-muted">
              <p>
                {content.brand_name} is onderdeel van Janssen Digital Design B.V., gevestigd aan de
                Snellius 1, 6422 RM Heerlen, ingeschreven bij de Kamer van Koophandel onder nummer
                42049714. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals
                beschreven in deze verklaring. Voor vragen over uw gegevens kunt u ons bereiken via
                het{" "}
                <a href="#offerte" className="font-semibold text-brand-navy hover:underline">
                  contactformulier
                </a>{" "}
                op deze website of telefonisch via{" "}
                <a
                  href={`tel:${content.phone.replace(/\s+/g, "")}`}
                  className="font-semibold text-brand-navy hover:underline"
                >
                  {content.phone}
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading eyebrow="Uw gegevens" title="Welke gegevens verzamelen wij en waarom" />
            <div className="mt-6 space-y-5 text-brand-ink-muted">
              <div>
                <p className="font-semibold text-brand-navy">Offerteaanvraag / contactformulier</p>
                <p className="mt-1">
                  Wanneer u een offerte aanvraagt, verwerken wij de gegevens die u zelf invult —
                  zoals naam, e-mailadres, telefoonnummer en projectgegevens — om uw aanvraag te
                  beoordelen, een offerte op te stellen en, indien u akkoord gaat, de
                  vergunningtekening te maken. Rechtsgrond: uitvoering van (de aanloop naar) een
                  overeenkomst.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Kennismakingsgesprek via Calendly</p>
                <p className="mt-1">
                  Plant u een gratis kennismakingsgesprek in via de Calendly-link op deze website,
                  dan verwerkt Calendly de gegevens die u daarbij invult (zoals naam, e-mailadres
                  en het gekozen tijdstip) om de afspraak te plannen. Dit gebeurt op het platform
                  van Calendly zelf — raadpleeg het privacybeleid van Calendly voor meer informatie
                  over hun verwerking.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Google Analytics (alleen na toestemming)</p>
                <p className="mt-1">
                  Als u hiervoor toestemming geeft via de cookiemelding, gebruiken wij Google
                  Analytics om te zien hoe bezoekers onze website gebruiken — bijvoorbeeld welke
                  pagina&apos;s bezocht worden en via welke bron. Deze gegevens worden niet gebruikt
                  om u persoonlijk te identificeren. Rechtsgrond: uw toestemming, die u op elk
                  moment kunt intrekken door uw browsergegevens voor deze website te wissen.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Cookies" title="Welke cookies plaatst deze website" />
            <div className="mt-6 space-y-5 text-brand-ink-muted">
              <div>
                <p className="font-semibold text-brand-navy">Functioneel (altijd actief)</p>
                <p className="mt-1">
                  Eén functionele opslagwaarde (in uw browser, niet als cookie maar als
                  &lsquo;local storage&rsquo;) onthoudt of u de cookiemelding al heeft
                  geaccepteerd of geweigerd, zodat deze niet bij elk bezoek opnieuw verschijnt.
                  Hiervoor is geen toestemming vereist, omdat dit strikt noodzakelijk is voor de
                  werking van de melding zelf.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Analytisch (alleen na toestemming)</p>
                <p className="mt-1">
                  Na uw toestemming plaatst Google Analytics cookies (onder andere met de naam
                  <code className="mx-1 rounded bg-brand-beige px-1.5 py-0.5 text-sm">_ga</code>
                  en varianten daarvan) om bezoekersstatistieken bij te houden. U kunt deze
                  toestemming op elk moment intrekken via uw browserinstellingen.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <SectionHeading eyebrow="Derde partijen" title="Met wie delen wij gegevens" />
            <div className="mt-6 space-y-4 text-brand-ink-muted">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-brand-navy">Supabase</span> — voor het veilig
                  opslaan van de gegevens uit uw offerteaanvraag.
                </li>
                <li>
                  <span className="font-semibold text-brand-navy">Calendly</span> — voor het
                  inplannen van een kennismakingsgesprek, indien u daarvoor kiest.
                </li>
                <li>
                  <span className="font-semibold text-brand-navy">Google Analytics (Google Ireland
                  Limited)</span> — voor bezoekersstatistieken, uitsluitend na uw toestemming.
                </li>
                <li>
                  <span className="font-semibold text-brand-navy">Vercel</span> — voor het hosten
                  van deze website.
                </li>
              </ul>
              <p>
                Wij verkopen uw gegevens nooit aan derden en delen ze niet voor
                marketingdoeleinden van andere partijen.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <SectionHeading eyebrow="Bewaartermijn" title="Hoe lang bewaren wij uw gegevens" />
            <div className="mt-6 space-y-4 text-brand-ink-muted">
              <p>
                Wij bewaren uw gegevens niet langer dan nodig is voor het doel waarvoor ze zijn
                verzameld. Gegevens uit een offerteaanvraag die niet tot een opdracht leidt,
                verwijderen wij binnen een redelijke termijn. Voor gegevens die onderdeel worden
                van een factuur geldt de wettelijke fiscale bewaarplicht van 7 jaar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <SectionHeading eyebrow="Uw rechten" title="Wat u kunt doen" />
            <div className="mt-6 space-y-4 text-brand-ink-muted">
              <p>Op grond van de AVG heeft u het recht om:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>uw gegevens in te zien;</li>
                <li>onjuiste gegevens te laten corrigeren;</li>
                <li>uw gegevens te laten verwijderen;</li>
                <li>de verwerking van uw gegevens te beperken;</li>
                <li>bezwaar te maken tegen de verwerking;</li>
                <li>uw gegevens over te laten dragen; en</li>
                <li>een eerder gegeven toestemming (bijvoorbeeld voor Google Analytics) in te trekken.</li>
              </ul>
              <p>
                Om van deze rechten gebruik te maken, kunt u contact met ons opnemen via het{" "}
                <a href="#offerte" className="font-semibold text-brand-navy hover:underline">
                  contactformulier
                </a>{" "}
                of telefonisch. U heeft daarnaast altijd het recht om een klacht in te dienen bij de{" "}
                <a
                  href="https://www.autoriteitpersoonsgegevens.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-navy hover:underline"
                >
                  Autoriteit Persoonsgegevens
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <SectionHeading eyebrow="Beveiliging" title="Hoe wij uw gegevens beschermen" />
            <div className="mt-6 space-y-4 text-brand-ink-muted">
              <p>
                Wij nemen passende technische en organisatorische maatregelen om uw gegevens te
                beschermen tegen verlies of onrechtmatig gebruik, zoals versleutelde verbindingen
                (HTTPS) en toegangsbeperking tot de systemen waarin uw gegevens worden opgeslagen.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <SectionHeading eyebrow="Wijzigingen" title="Wijzigingen in dit beleid" />
            <div className="mt-6 space-y-4 text-brand-ink-muted">
              <p>
                Wij kunnen dit privacy- en cookiebeleid van tijd tot tijd aanpassen, bijvoorbeeld
                bij wijzigingen in de website of wet- en regelgeving. De meest recente versie staat
                altijd op deze pagina.
              </p>
              <p className="text-sm text-brand-ink-muted/80">Laatst bijgewerkt: augustus 2026.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
