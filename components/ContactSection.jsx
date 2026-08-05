"use client";

import { useState } from "react";

/**
 * The dark contact block that closes every page.
 *
 * NOTE: the Framer original posted to Framer's own hosted form handler,
 * which does not exist off-platform. FORM_ENDPOINT below needs to point at
 * a real handler (Formspree, Netlify Forms, n8n webhook, etc.) before
 * launch. Until it is set, the form fails closed and tells the user to
 * email instead, rather than silently dropping leads.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export default function ContactSection() {
  const [state, setState] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!FORM_ENDPOINT) {
      setState("unconfigured");
      return;
    }

    setState("sending");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) e.target.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="section-contact" className="bg-navy">
      <div className="container-site grid gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className="h-section text-white">
            If you&apos;re tired of repetitive manual admin work, and ready to get your time back.
          </h2>
          <p className="h-section mt-2 text-brand">Fill in the form below now.</p>
          <p className="body-base mt-8 max-w-md text-grey-400">
            Go through your current set-up with one of our experts, get honest advice, and a team
            that cares about the outcome as much as you do. Whether you prefer a quick call or a
            simple email, getting started is easy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <Field label="Name *" name="Name" placeholder="Jane Foster" required />
          <Field label="E-mail *" name="Email" type="email" placeholder="jerry@fasteradmin.com" required />
          <Field
            label="Project and goals *"
            name="Message"
            placeholder="Tell us more"
            required
            textarea
          />

          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-[40px] bg-white px-8 py-4 text-sm font-medium text-navy transition-colors hover:bg-grey-150 disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Send message"}
          </button>

          {state === "sent" && (
            <p className="text-sm text-brand">Thanks, we&apos;ll be in touch shortly.</p>
          )}
          {state === "error" && (
            <p className="text-sm text-accent">
              Something went wrong. Please email us directly instead.
            </p>
          )}
          {state === "unconfigured" && (
            <p className="text-sm text-accent">
              This form isn&apos;t connected yet. Set NEXT_PUBLIC_FORM_ENDPOINT before launch.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text", required, textarea }) {
  const cls =
    "w-full border-b border-white/25 bg-transparent pb-3 text-base text-white placeholder:text-white/35 focus:border-brand focus:outline-none";

  return (
    <label className="block">
      <span className="mb-3 block text-base text-white">{label}</span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={3} className={`${cls} resize-y`} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} required={required} className={cls} />
      )}
    </label>
  );
}
