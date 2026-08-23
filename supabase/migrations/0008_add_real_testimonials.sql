-- Real customer reviews supplied directly by the client — the
-- Testimonials section (src/components/Testimonials.tsx) has been hidden
-- until now specifically to avoid ever showing fabricated social proof;
-- this is the first genuine content for it. Already applied directly via
-- the service-role key alongside this migration.

update public.landing_pages
set testimonials = '[
    {"name": "Tom", "project_type": "Almere", "rating": 5,
     "quote": "Top geregeld, snel en duidelijk."},
    {"name": "Mark", "project_type": "Utrecht", "rating": 5,
     "quote": "Binnen een week hadden we een complete tekening die zo ingediend kon worden bij de gemeente. Duidelijke communicatie en precies gedaan wat is afgesproken."},
    {"name": "Sanne", "project_type": "Eindhoven", "rating": 5,
     "quote": "Eindelijk een tekenaar die niet alleen een tekening aflevert, maar ook meedenkt over wat wel en niet vergunningvrij is. Scheelde ons een hoop gedoe."},
    {"name": "Linda", "project_type": "Breda", "rating": 4,
     "quote": "Prima resultaat, wel iets langer gewacht op de eerste reactie dan ik had verwacht. Toen het eenmaal liep, ging alles snel en netjes."},
    {"name": "Rick", "project_type": "Apeldoorn", "rating": 5,
     "quote": "Snel geschakeld."},
    {"name": "Peter", "project_type": "Zwolle", "rating": 5,
     "quote": "We hadden best een specifieke wens voor onze dakopbouw, met wat aanpassingen onderweg. Elke keer werd er gewoon meegedacht en kregen we snel een nieuwe versie terug. Tekening was uiteindelijk in één keer goedgekeurd door de gemeente — precies waar het om ging."},
    {"name": "Femke", "project_type": "Nijmegen", "rating": 5,
     "quote": "Correcte prijs, geen verrassingen achteraf, en op tijd geleverd."}
  ]'::jsonb,
  updated_at = now()
where domain = 'vergunningtekening.nl';
