import { cache } from "react";
import { supabaseAnon } from "@/lib/supabase";
import { SITE_DOMAIN } from "@/lib/site";
import type { LandingPageContent } from "@/types/content";

// Memoized per-request: layout.tsx (header/footer) and page.tsx
// (generateMetadata + body) all call this, but it only hits Supabase once.
export const getLandingPageContent = cache(async (): Promise<LandingPageContent> => {
  const { data, error } = await supabaseAnon
    .from("landing_pages")
    .select("*")
    .eq("domain", SITE_DOMAIN)
    .single();

  if (error || !data) {
    throw new Error(
      `Could not load landing page content for domain "${SITE_DOMAIN}" from Supabase. ` +
        `Make sure a row exists for this domain. ${error?.message ?? ""}`
    );
  }

  return data as LandingPageContent;
});
