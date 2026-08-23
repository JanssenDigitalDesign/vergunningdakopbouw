import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServiceRoleClient } from "@/lib/supabase";
import { SITE_DOMAIN, LEAD_NOTIFICATION_EMAIL } from "@/lib/site";

const MAX_FIELD_LENGTH = 2000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, unknown>;

  const cleanName = typeof name === "string" ? name.trim().slice(0, MAX_FIELD_LENGTH) : "";
  const cleanEmail = typeof email === "string" ? email.trim().slice(0, MAX_FIELD_LENGTH) : "";
  const cleanPhone = typeof phone === "string" ? phone.trim().slice(0, MAX_FIELD_LENGTH) : "";
  const cleanMessage = typeof message === "string" ? message.trim().slice(0, MAX_FIELD_LENGTH) : "";

  if (!cleanName) {
    return NextResponse.json({ error: "Naam is verplicht." }, { status: 400 });
  }

  if (!cleanEmail && !cleanPhone) {
    return NextResponse.json(
      { error: "Vul minimaal een e-mailadres of telefoonnummer in." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServiceRoleClient();
  const { error } = await supabase.from("leads").insert({
    domain: SITE_DOMAIN,
    name: cleanName,
    email: cleanEmail || null,
    phone: cleanPhone || null,
    message: cleanMessage || null,
  });

  if (error) {
    console.error("Failed to insert lead:", error.message);
    return NextResponse.json(
      { error: "Aanvraag kon niet worden opgeslagen. Probeer het later opnieuw." },
      { status: 500 }
    );
  }

  // The lead is safely in Supabase regardless of what happens below — an
  // email failure here must never turn into a 500 for the visitor, since
  // that would make them think their (already-saved) request failed.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error: sendError } = await resend.emails.send({
        from: `${SITE_DOMAIN} <onboarding@resend.dev>`,
        to: LEAD_NOTIFICATION_EMAIL,
        replyTo: cleanEmail || undefined,
        subject: `[${SITE_DOMAIN}] Nieuwe offerteaanvraag van ${cleanName}`,
        text: [
          `Naam: ${cleanName}`,
          `E-mail: ${cleanEmail || "-"}`,
          `Telefoon: ${cleanPhone || "-"}`,
          "",
          "Bericht:",
          cleanMessage || "-",
        ].join("\n"),
      });
      // The SDK returns { data: null, error } on API-level failures instead
      // of throwing — a bare await here would silently swallow those.
      if (sendError) {
        console.error("Resend rejected the lead notification email:", sendError);
      }
    } catch (emailError) {
      console.error("Failed to send lead notification email:", emailError);
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping lead notification email.");
  }

  return NextResponse.json({ ok: true });
}
