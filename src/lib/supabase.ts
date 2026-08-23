import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars"
  );
}

// Read-only client for public content (landing_pages). Safe to use with the
// anon key because that table only ever holds public marketing copy and has
// an RLS policy that allows anonymous SELECT.
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// Server-only client for writing leads. Uses the service role key, which
// bypasses RLS, so this must never be imported into client components or
// exposed to the browser. The `leads` table has no public policies at all —
// inserts only happen through this client from the /api/contact route.
export function getSupabaseServiceRoleClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var");
  }
  return createClient(supabaseUrl!, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
}
