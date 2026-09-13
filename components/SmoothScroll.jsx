"use client";

import { useEffect } from "react";

/**
 * Site-wide motion plumbing for the restyled Dutch homepage: Lenis smooth
 * scroll, GSAP ScrollTrigger wired to it, and a click handler that makes
 * every in-page `href="#id"` link (nav, CTAs, footer) scroll smoothly
 * instead of jumping — Lenis does not intercept hash-link clicks on its
 * own, so without this they'd snap instantly while wheel scrolling stays
 * smooth, which reads as broken rather than intentional.
 *
 * Renders nothing. Mounted once in the (nl) root layout.
 *
 * `prefers-reduced-motion: reduce` skips Lenis and ScrollTrigger entirely —
 * anchor clicks still work, just as an instant native jump.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis = null;
    let ScrollTrigger = null;
    let cancelled = false;

    async function init() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      if (!reduceMotion) {
        const [{ default: Lenis }, stModule] = await Promise.all([
          import("lenis"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        ScrollTrigger = stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        // One clock drives Lenis's raf. Feeding it from two loops with
        // different time bases corrupts its internal delta and freezes
        // scrolling entirely — this bit it once already.
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }

      window.__lenis = lenis;
    }

    init();

    function onClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -84 });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
      }
      history.pushState(null, "", "#" + id);
    }

    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (lenis) lenis.destroy();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
      window.__lenis = null;
    };
  }, []);

  return null;
}
