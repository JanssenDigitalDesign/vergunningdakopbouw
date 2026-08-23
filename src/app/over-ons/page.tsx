import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TrustBar } from "@/components/TrustBar";
import { ContactSection } from "@/components/ContactSection";
import { getLandingPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent();
  const title = `Over ons | ${content.brand_name}`;
  const description = `${content.brand_name} is onderdeel van Janssen Digital Design B.V. — een technisch teken- en 3D-visualisatiebureau voor de bouw. Lees hoe wij werken.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/over-ons` },
    openGraph: { title, description, url: `${SITE_URL}/over-ons`, locale: "nl_NL", type: "website" },
  };
}

// PLACEHOLDER COPY — rewrite the intro + body paragraphs below for this
// site's specific niche before launch. Kept generic here only so the
// template builds; every real site should read as written for its own
// specialty, not a copy-paste of another site's "why us" story.
export default async function OverOnsPage() {
  const content = await getLandingPageContent();

  return (
    <>
      <PageHeader
        eyebrow="Over ons"
        h1="Gespecialiseerd in vergunningtekeningen voor dakopbouwen"
        intro={`${content.brand_name} is onderdeel van Janssen Digital Design B.V., een bureau dat dagelijks technische tekeningen, 3D-modellen en visualisaties maakt voor de bouw- en interieurbranche.`}
        image="/images/dutch-streetscape.jpg"
        imageAlt="Nederlandse woonstraat met rijtjeshuizen"
        ctaLabel={content.cta_text}
        breadcrumb={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Over ons" }]} />}
      />

      <section className="border-b border-brand-line bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="Wie wij zijn" title="Waarom een gespecialiseerd tekenbureau" />
          <Reveal delay={100} className="mt-8 space-y-5 text-brand-ink-muted">
            <p>
              Janssen Digital Design B.V. maakt al jaren technische tekeningen, 3D-modellen en
              visualisaties voor partijen in de bouw — van individuele verbouwingen tot
              seriematige woningbouwprojecten. {content.brand_name} is de tak van dat bureau die
              zich specifiek richt op vergunningtekeningen voor dakopbouwen.
            </p>
            <p>
              Die specialisatie maakt het verschil: een dakopbouw is, anders dan veel andere
              verbouwingen, vrijwel altijd vergunningplichtig. Gemeenten toetsen dit bovendien aan
              hun eigen welstandsbeleid, dat per gemeente en soms zelfs per straat kan verschillen.
              Doordat we dagelijks met dit type project werken, weten we precies waar een toetser
              op let en waar een
              aanvraag op vast kan lopen.
            </p>
            <p>
              We werken bewust met een kleine, vaste groep tekenaars in plaats van een anoniem
              formulier: u heeft tijdens het hele traject één aanspreekpunt, en u ontvangt uw
              conceptversie altijd terug voordat de tekening definitief wordt.
            </p>
          </Reveal>
        </div>
      </section>

      <TrustBar />

      <ContactSection content={content} />
    </>
  );
}
