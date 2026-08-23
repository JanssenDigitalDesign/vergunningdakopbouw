# vergunningtekening.nl

Next.js (App Router, TypeScript, Tailwind) landingspagina voor
**vergunningtekening.nl**. Alle tekst op de pagina (H1, meta tags, USP's,
diensten, FAQ) komt uit Supabase (`landing_pages` tabel), niet uit de code.
Het contactformulier schrijft leads weg naar de `leads` tabel.

Dit is de eerste site van een later grotere groep domeinen. De structuur is
bewust simpel gehouden voor één domein — generaliseren naar een sjabloon
voor de overige domeinen komt in een latere sessie.

## Projectstructuur

```
src/
  app/
    page.tsx           # H1, USP's, diensten, FAQ, contactsectie + generateMetadata
    layout.tsx          # haalt content op, rendert Header/Footer
    sitemap.ts           # /sitemap.xml
    robots.ts            # /robots.txt
    api/contact/route.ts  # POST endpoint dat leads in Supabase schrijft
  components/           # Header, Hero, Services, Faq, ContactForm, Footer, StructuredData
  lib/
    supabase.ts          # Supabase clients (anon voor lezen, service role voor leads)
    content.ts            # haalt de landingspagina-content op (React cache, 1x per request)
    site.ts                # domein/URL-constanten
  types/content.ts        # TypeScript types voor de content

supabase/migrations/0001_init.sql   # schema + seed-data voor deze site
```

## 1. Supabase opzetten

Je hebt al een Supabase-project. Voer de migratie uit:

1. Open je project in [supabase.com](https://supabase.com) → **SQL Editor**.
2. Plak de inhoud van `supabase/migrations/0001_init.sql` en voer uit (Run).

Dit doet drie dingen:

- Maakt de tabel `landing_pages` (content per domein, met RLS: iedereen mag
  lezen, want het is publieke marketingtekst).
- Maakt de tabel `leads` (contactformulier-inzendingen, RLS **zonder** publieke
  policies — alleen de server mag hierin schrijven, via de service role key).
- Zet direct de content van vergunningtekening.nl in `landing_pages` (de
  teksten uit de briefing, letterlijk overgenomen).

Wil je de tekst later aanpassen? Update gewoon de rij in `landing_pages` via
de Supabase Table Editor — geen nieuwe deploy nodig (de pagina revalideert
elk uur, of gebruik `revalidatePath`/redeploy voor direct effect).

### API keys ophalen

In je Supabase project: **Project Settings → API**.

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ geheim, nooit publiek
  maken, nooit met `NEXT_PUBLIC_` prefixen)

## 2. Lokaal draaien

```bash
cp .env.local.example .env.local
# vul de 3 Supabase-variabelen in .env.local in
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Naar GitHub

```bash
git add -A
git commit -m "Initial vergunningtekening.nl site"
```

Maak daarna op [github.com/new](https://github.com/new) een lege repo aan
(zonder README/`.gitignore`, die heeft dit project al), en koppel:

```bash
git remote add origin git@github.com:<jouw-org-of-account>/vergunningtekening.git
git branch -M main
git push -u origin main
```

## 4. Deployen op Vercel

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de zojuist
   aangemaakte GitHub-repo (Vercel detecteert Next.js automatisch).
2. Voeg bij **Environment Variables** dezelfde 3 variabelen toe als in
   `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy. Vercel bouwt en hostet de site op een `*.vercel.app` URL.

Elke push naar `main` deployt automatisch opnieuw (Vercel GitHub-integratie).

## 5. Domein vergunningtekening.nl koppelen (nu bij TransIP)

1. In het Vercel-project: **Settings → Domains** → voeg `vergunningtekening.nl`
   (en optioneel `www.vergunningtekening.nl`) toe.
2. Vercel toont welke DNS-records nodig zijn — meestal:
   - Een **A-record** op `@` naar `76.76.21.21`, of
   - Vercel kan vragen om de nameservers over te zetten (niet nodig, de
     A/CNAME-route volstaat meestal).
   - Een **CNAME** op `www` naar `cname.vercel-dns.com`.
3. Log in bij **TransIP** → Domeinen → vergunningtekening.nl → DNS-instellingen,
   en voeg exact de records toe die Vercel toont (Vercel valideert dit
   automatisch zodra de DNS-wijziging doorkomt, meestal binnen enkele
   minuten tot een paar uur).
4. Zodra Vercel het domein als "Valid Configuration" toont, is de site
   bereikbaar op `https://vergunningtekening.nl` (SSL-certificaat wordt
   automatisch door Vercel geregeld).

## SEO-checklist die al is ingebouwd

- Server-side gerenderde/statische pagina (`revalidate = 3600`), geen
  onnodige client-side JS (FAQ-accordion is native `<details>`, geen JS).
- `generateMetadata` met title/description uit Supabase, canonical URL,
  Open Graph tags.
- `sitemap.xml` en `robots.txt` via Next.js file conventions.
- JSON-LD structured data: `ProfessionalService` + `FAQPage`
  (`src/components/StructuredData.tsx`).
- Semantische HTML: één `<h1>`, `<h2>` per sectie.

## Contactformulier / leads

- `POST /api/contact` valideert (naam verplicht, minimaal e-mail of telefoon)
  en schrijft naar de `leads`-tabel via de service role key (bypassed RLS,
  maar de tabel heeft sowieso geen publieke policies).
- Eenvoudige honeypot tegen spam-bots (verborgen `company`-veld).
- Bekijk binnengekomen leads in Supabase → Table Editor → `leads`, of bouw
  later een klein intern dashboard.
