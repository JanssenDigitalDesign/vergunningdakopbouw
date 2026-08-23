"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/site";
import { primaryButtonClass } from "@/lib/ui";

const CONSENT_KEY = "cookie-consent";
type Consent = "accepted" | "rejected" | null;

// Analytics cookies are non-essential under Dutch/EU law, so
// GoogleAnalytics must never render before the visitor has explicitly
// opted in. useSyncExternalStore (rather than an effect + setState) reads
// localStorage in a way React considers SSR-safe: the server always
// renders the "no choice yet" state, then this resyncs to the real stored
// value before the browser paints, so there's no flash of the banner for
// returning visitors who already chose.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function getServerSnapshot(): Consent {
  return null;
}

function persistConsent(value: Consent) {
  try {
    if (value) localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage unavailable (private browsing, blocked) — the choice still
    // applies to this page view via the listener notification below.
  }
  listeners.forEach((listener) => listener());
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // No tracker configured yet for this site — nothing to gate consent for.
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookiemelding"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-line bg-white/95 px-4 py-5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur sm:px-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-brand-ink-muted">
              Wij gebruiken alleen analytische cookies (Google Analytics) om te zien hoe bezoekers
              onze website gebruiken. Deze plaatsen we pas na uw toestemming. Lees meer in ons{" "}
              <Link href="/privacyverklaring" className="font-semibold text-brand-navy hover:underline">
                privacy- en cookiebeleid
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => persistConsent("rejected")}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:border-brand-navy"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={() => persistConsent("accepted")}
                className={primaryButtonClass("sm")}
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
