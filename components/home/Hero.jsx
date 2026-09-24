"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import ChainDiagram from "@/components/home/ChainDiagram";

/**
 * Two-column hero, shared by both locales: copy with a composed GSAP
 * word-stagger on the left, the animated chain diagram (ChainDiagram) in a
 * grainy colour field on the right. Replaced the full-bleed photo banner on
 * 2026-09-24 (see git history for that version); the photo file stays in
 * public/img.
 */
const COPY = {
  en: {
    eyebrow: "Reliable AI for your operations mess",
    words: [["Get", "the", "Work"], ["Done."], ["Without", "The", "Hire", "You"], ["Can't", "Make."]],
    body: "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
    cta: "Book The Ops Call",
    ctaHref: "/eng/#section-meeting",
  },
  nl: {
    eyebrow: "Betrouwbare automatisering & AI voor de backoffice",
    words: [["Meer", "Werk", "Gedaan."], ["Zonder", "Er", "Iemand"], ["Voor", "Aan", "Te", "Nemen."]],
    body: "We zetten AI in waar iemand iets moet lezen en beslissen. Betrouwbare code voor de rest. Zodat jij tijd hebt voor het werk waar je het verschil maakt.",
    cta: "Plan 20 minuten met ons",
    ctaHref: "/#section-meeting",
  },
};

export default function Hero({ locale = "en" }) {
  const t = COPY[locale];
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !rootRef.current) return;
      const root = rootRef.current;
      const words = root.querySelectorAll("[data-word]");
      const rest = root.querySelectorAll("[data-fade]");

      gsap.set(words, { opacity: 0, y: 16 });
      gsap.set(rest, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(words, { opacity: 1, y: 0, duration: 0.7, stagger: 0.045 }, 0.05)
        .to(rest, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.25);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={rootRef} className="bg-white">
      <div className="container-site grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-24">
        <div>
          <p data-fade className="eyebrow text-brand">
            {t.eyebrow}
          </p>
          <h1 className="h-display mt-4 text-navy">
            {t.words.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                {line.map((w, j) => (
                  <span key={j}>
                    <span data-word className="inline-block">
                      {w}
                    </span>
                    {j < line.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p data-fade className="body-base mt-5 text-grey-600">
            {t.body}
          </p>
          <div data-fade className="mt-8">
            <Button href={t.ctaHref}>{t.cta}</Button>
          </div>
        </div>

        {/* The chain diagram in a colour field replaces the photo banner
            (2026-09-24). The photo stays in public/img for the about page. */}
        <div data-fade className="hero-field p-5 sm:p-7">
          <ChainDiagram locale={locale} />
        </div>
      </div>
    </section>
  );
}
