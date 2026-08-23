-- Initial schema for the domain-network landing pages.
-- Run this once in the Supabase SQL editor (or via `supabase db push`)
-- for the project this site should connect to.

create extension if not exists "pgcrypto";

-- One row per domain. Holds all copy for that domain's landing page so
-- content edits don't require a code deploy.
create table if not exists public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique,
  brand_name text not null,
  h1 text not null,
  meta_title text not null,
  meta_description text not null,
  phone text not null,
  service_area text not null,
  delivery_time text not null,
  cta_text text not null,
  usps jsonb not null default '[]'::jsonb,
  services jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  footer_legal_line text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.landing_pages is
  'One row per domain in the domain network. usps/services/faq are JSON arrays rendered directly by the site.';
comment on column public.landing_pages.usps is 'Array of strings, e.g. ["USP one", "USP two"]';
comment on column public.landing_pages.services is 'Array of {"title": "...", "description": "..."}';
comment on column public.landing_pages.faq is 'Array of {"question": "...", "answer": "..."}';

alter table public.landing_pages enable row level security;

-- Content is public marketing copy, safe to read with the anon key.
create policy "Public can read landing pages"
  on public.landing_pages
  for select
  to anon, authenticated
  using (true);

-- Leads submitted through each site's contact form.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  name text not null,
  email text,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

comment on table public.leads is
  'Contact form submissions. Written only by the server (service role key) via /api/contact — no public policies, so anon/authenticated cannot read or write this table directly.';

alter table public.leads enable row level security;
-- Intentionally no policies here: all access goes through the service role
-- key from the server-side API route, which bypasses RLS.

-- Seed content for vergunningtekening.nl
insert into public.landing_pages (
  domain, brand_name, h1, meta_title, meta_description,
  phone, service_area, delivery_time, cta_text,
  usps, services, faq, footer_legal_line
) values (
  'vergunningtekening.nl',
  'Vergunningtekening',
  'Vergunningtekening nodig? Binnen 5 werkdagen professioneel getekend',
  'Vergunningtekening laten maken | Binnen 5 werkdagen',
  'Snel en vakkundig een vergunningtekening laten maken voor uw verbouwing. Voldoet aan de eisen van uw gemeente. Vraag vrijblijvend een offerte aan.',
  '+31 6 14118713',
  'Heel Nederland',
  '5 werkdagen',
  'Vraag vrijblijvend een offerte aan',
  '[
    "Binnen 5 werkdagen een complete, indieningsklare tekening",
    "Voldoet aan de eisen van uw gemeente/omgevingsvergunning",
    "Voor heel Nederland — al honderden vergunningtekeningen gemaakt",
    "Persoonlijk contact, geen anoniem formulier zonder terugkoppeling",
    "Vrijblijvende offerte, geen verplichtingen vooraf"
  ]'::jsonb,
  '[
    {"title": "Vergunningtekening voor aanbouw", "description": "Een complete tekening voor de uitbreiding van uw woning aan de zijkant of achterzijde."},
    {"title": "Vergunningtekening voor uitbouw", "description": "Technische tekeningen voor het vergroten van een bestaande ruimte."},
    {"title": "Vergunningtekening voor dakopbouw/dakkapel", "description": "Plattegronden, gevelaanzichten en doorsnedes voor uw dakopbouw of dakkapel."},
    {"title": "Vergunningtekening voor garage/bijgebouw", "description": "Tekeningen voor een nieuwe garage, schuur of ander bijgebouw op uw perceel."},
    {"title": "Begeleiding bij de vergunningaanvraag", "description": "Uitleg over het proces rond uw omgevingsvergunning (geen juridisch advies)."}
  ]'::jsonb,
  '[
    {"question": "Wat is een vergunningtekening precies?", "answer": "Een technische tekening die je bij de gemeente indient bij de aanvraag van een omgevingsvergunning, met plattegronden, gevelaanzichten en doorsnedes conform de eisen van het Omgevingsloket."},
    {"question": "Hoe lang duurt het voordat mijn tekening klaar is?", "answer": "Gemiddeld 5 werkdagen na aanlevering van de benodigde gegevens/foto''s/situatie."},
    {"question": "Heb ik altijd een vergunning nodig voor een aanbouw?", "answer": "Niet altijd; sommige kleine bouwwerken zijn vergunningvrij. We adviseren dit graag na het bekijken van uw situatie."},
    {"question": "Wat kost een vergunningtekening?", "answer": "Dat hangt af van de omvang van het project; u ontvangt een vrijblijvende offerte op maat."},
    {"question": "Werken jullie door heel Nederland?", "answer": "Ja, we maken vergunningtekeningen voor klanten in het hele land."},
    {"question": "Wat heb je nodig om te starten?", "answer": "Een adres, een korte omschrijving van de gewenste verbouwing en het liefst een paar foto''s of een situatieschets."}
  ]'::jsonb,
  'Vergunningtekening is onderdeel van Janssen Digital Design B.V.'
)
on conflict (domain) do update set
  brand_name = excluded.brand_name,
  h1 = excluded.h1,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  phone = excluded.phone,
  service_area = excluded.service_area,
  delivery_time = excluded.delivery_time,
  cta_text = excluded.cta_text,
  usps = excluded.usps,
  services = excluded.services,
  faq = excluded.faq,
  footer_legal_line = excluded.footer_legal_line,
  updated_at = now();
