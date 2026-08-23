// This site currently serves a single domain. Kept as one constant (rather
// than deriving it from the request) so build-time pages (sitemap, robots,
// metadata) all agree on the canonical URL.
export const SITE_DOMAIN = "vergunningdakopbouw.nl";
export const SITE_URL = `https://${SITE_DOMAIN}`;

// Assumes the phone number also receives WhatsApp messages (common for
// small businesses using WhatsApp Business on their main line) — confirm
// this is actually the case before relying on it.
export function whatsAppLink(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

// The hero's secondary CTA books a free 15–30 min intro video call instead
// of a phone call — provided directly by the client.
export const CALENDLY_URL = "https://calendly.com/3dcreates-info/30-min-gratis-kennismakingsgesprek";

// This site's own GA4 measurement ID.
export const GA_MEASUREMENT_ID = "G-QF7BMCTC68";

// Where new contact-form leads are emailed — the lead itself is always
// saved to Supabase regardless of whether this email send succeeds.
export const LEAD_NOTIFICATION_EMAIL = "info@janssendigital.com";
