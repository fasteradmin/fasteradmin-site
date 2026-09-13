"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";

/**
 * Full-bleed banner hero, shared by both locales (2026-09 restyle): a
 * rounded-bottom-corner photo, a solid-to-transparent panel fade behind the
 * copy (the photo's own built-in fade is too gradual on its own — see this
 * file's git history if that gradient ever needs retuning), and a composed
 * GSAP word-stagger on the headline. English previously kept a separate
 * two-column layout with a receipt image; that's retired in favour of this
 * one shared design, translated per locale like every other home/* section.
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
      const img = root.querySelector("[data-hero-img]");

      gsap.set(words, { opacity: 0, y: 16 });
      gsap.set(rest, { opacity: 0, y: 16 });
      if (img) gsap.set(img, { scale: 1.12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(words, { opacity: 1, y: 0, duration: 0.7, stagger: 0.045 }, 0.05)
        .to(rest, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.25);
      if (img) tl.to(img, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-0 overflow-hidden rounded-b-[24px] bg-surface-alt md:min-h-[660px] md:rounded-b-[40px]"
    >
      {/* Deep-cropping this wide photo into a narrow tall viewport lands on
          a plain, textureless slice of it (mostly his dark shirt) — it
          reads as a blank panel, not a hero image. Simplest fix: it's a
          desktop-only element, same as the earlier artifact build. */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          data-hero-img
          src="/img/hero-banner-2026-09.webp"
          alt={
            locale === "nl"
              ? "Ondernemer aan zijn bureau, kijkt peinzend naar links terwijl hij aan zijn baard trekt"
              : "A business owner at his desk, looking thoughtfully to the side while stroking his beard"
          }
          fill
          priority
          className="object-cover object-[58%_32%]"
        />
        {/* Solid panel behind the copy, fading into the photo — the photo's
            own baked-in fade is a soft gradient from pixel zero, not a hard
            edge, so it can't carry text contrast on its own. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-surface-alt) 0%, var(--color-surface-alt) 32%, rgba(244,246,248,0) 56%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(14,42,68,.18), rgba(14,42,68,0) 45%)" }}
        />
      </div>

      <div className="relative flex min-h-0 items-center md:min-h-[660px]">
        <div className="w-full max-w-full md:max-w-[42%] px-6 py-14 sm:px-10 md:pl-[100px] md:pr-10">
          <p data-fade className="eyebrow text-brand">
            {t.eyebrow}
          </p>
          <h1 className="h-display mt-4 text-navy">
            {t.words.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                {line.map((w, j) => (
                  <span key={j} data-word className="inline-block">
                    {w}
                    {j < line.length - 1 ? " " : ""}
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
      </div>
    </section>
  );
}
