-- Adds a "pakketten" (package tiers, no prices per the brief) section and a
-- "testimonials" (reviews) section to the landing page content.

alter table public.landing_pages
  add column if not exists packages jsonb not null default '[]'::jsonb,
  add column if not exists testimonials jsonb not null default '[]'::jsonb;

comment on column public.landing_pages.packages is
  'Array of {"name": "...", "description": "...", "features": ["..."], "highlighted": true|false}. No prices — CTA is always "offerte aanvragen".';
comment on column public.landing_pages.testimonials is
  'Array of {"name": "...", "project_type": "...", "quote": "...", "rating": 1-5}. Intentionally left empty until real customer reviews exist — the Testimonials section hides itself when this is empty. Never seed with fabricated reviews.';

-- Draft package tiers for vergunningtekening.nl, built only from copy
-- already approved in the 0001 seed (the existing "begeleiding bij de
-- vergunningaanvraag" service). Review the wording before treating this as
-- final — it's a reasonable first draft, not confirmed business copy.
update public.landing_pages
set packages = '[
    {
      "name": "Tekening",
      "description": "De complete vergunningtekening, klaar om zelf in te dienen.",
      "features": [
        "Plattegronden, gevelaanzichten en doorsnedes",
        "Voldoet aan de eisen van het Omgevingsloket",
        "Binnen 5 werkdagen geleverd"
      ],
      "highlighted": false
    },
    {
      "name": "Tekening + Begeleiding",
      "description": "De tekening, plus persoonlijke ondersteuning bij het indienen van uw omgevingsvergunning.",
      "features": [
        "Alles uit het pakket Tekening",
        "Uitleg over het aanvraagproces bij uw gemeente",
        "Eén persoonlijk aanspreekpunt tijdens het traject"
      ],
      "highlighted": true
    }
  ]'::jsonb,
  updated_at = now()
where domain = 'vergunningtekening.nl';
