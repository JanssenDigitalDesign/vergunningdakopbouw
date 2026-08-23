-- Adds a "werkwijze" (process steps) section to the landing page content,
-- mirroring the step-by-step process section common on competitor sites.

alter table public.landing_pages
  add column if not exists process_steps jsonb not null default '[]'::jsonb;

comment on column public.landing_pages.process_steps is
  'Array of {"title": "...", "description": "..."} shown as a numbered werkwijze/process section.';

update public.landing_pages
set process_steps = '[
    {"title": "U neemt contact op", "description": "Deel uw adres, een korte omschrijving van de gewenste verbouwing en het liefst een paar foto''s of een situatieschets."},
    {"title": "Wij maken uw tekening", "description": "Onze tekenaar werkt uw vergunningtekening uit conform de eisen van het Omgevingsloket."},
    {"title": "Controle en aanpassing", "description": "U ontvangt de conceptversie terug en we verwerken uw eventuele opmerkingen."},
    {"title": "Klaar voor indiening", "description": "U ontvangt de definitieve, indieningsklare tekening — gemiddeld binnen 5 werkdagen."}
  ]'::jsonb,
  updated_at = now()
where domain = 'vergunningtekening.nl';
