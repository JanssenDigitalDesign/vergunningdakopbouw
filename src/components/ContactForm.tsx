"use client";

import { useState, type FormEvent } from "react";
import type { LandingPageContent } from "@/types/content";
import { primaryButtonClass } from "@/lib/ui";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ content }: { content: LandingPageContent }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never fill this hidden field.
    if (formData.get("company")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Er ging iets mis. Probeer het opnieuw.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-brand-navy/30 bg-brand-beige p-6 text-brand-navy">
        <p className="font-semibold">Bedankt voor uw aanvraag!</p>
        <p className="mt-1 text-sm">
          We nemen zo snel mogelijk persoonlijk contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="company">Bedrijf</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Naam *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Telefoonnummer
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
          />
        </div>
      </div>
      <p className="text-xs text-slate-500">Vul minimaal e-mailadres of telefoonnummer in.</p>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Vertel kort over uw project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Adres, gewenste verbouwing, eventueel foto's/situatieschets volgen per e-mail"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto ${primaryButtonClass()}`}
      >
        {status === "submitting" ? "Versturen..." : content.cta_text}
      </button>
    </form>
  );
}
