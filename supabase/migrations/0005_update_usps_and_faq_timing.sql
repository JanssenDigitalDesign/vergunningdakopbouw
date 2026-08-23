-- Two content tweaks requested directly by the client:
-- 1. The "vrijblijvende offerte" USP now leads with the concrete 24-hour
--    response promise instead of the vaguer "no obligation" framing.
-- 2. The delivery-time FAQ answer now calls out that a constructeur's
--    constructieberekening (when the project needs one) adds time on top
--    of the 5 werkdagen, since that dependency is outside this business's
--    control — the client was specifically worried about over-promising
--    here.
-- Already applied directly to the live Supabase project (service-role
-- key) alongside this migration, for the historical record / for
-- recreating the environment from scratch.

update public.landing_pages
set usps = (
  select jsonb_agg(
    case
      when value = 'Vrijblijvende offerte, geen verplichtingen vooraf'
        then '"Offerte binnen 24 uur, geen verplichtingen vooraf"'::jsonb
      else value
    end
  )
  from jsonb_array_elements(usps)
),
faq = (
  select jsonb_agg(
    case
      when value->>'question' = 'Hoe lang duurt het voordat mijn tekening klaar is?'
        then jsonb_set(
          value,
          '{answer}',
          '"Gemiddeld 5 werkdagen na aanlevering van de benodigde gegevens/foto''s/situatie. Is voor uw project een constructieberekening nodig, dan komt de tijd die de constructeur daarvoor nodig heeft daar nog bovenop — dat hangt af van de constructeur en valt buiten onze planning."'::jsonb
        )
      else value
    end
  )
  from jsonb_array_elements(faq)
),
updated_at = now()
where domain = 'vergunningtekening.nl';
