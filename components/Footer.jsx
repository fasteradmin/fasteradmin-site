import Link from "next/link";
import { isOwnDomain } from "@/lib/links";
import Image from "next/image";

/**
 * Copy per locale. English is unchanged except "Automation Checker" ->
 * "Tijdlek-scan", the same correction made in Nav.jsx — see the comment
 * there. Everything else in the "en" block is byte-identical to what shipped
 * before the Dutch homepage existed.
 *
 * Two lines are left in English inside the "nl" block on purpose: the
 * tagline under the logo ("The operations systems...") and the data-privacy
 * line ("Amsterdam, EU..."). These read as brand copy, not micro-copy, and
 * Joey asked that they go to his copywriter rather than be translated here.
 * Both are pasted verbatim in the PR description.
 */
const COPY = {
  en: {
    tagline: "Automating repetitive manual tasks you hate.",
    pitch: "The operations systems that let you handle more work without hiring for it.",
    privacy:
      "Amsterdam, EU. Your data stays in the tools you already use, not shared or sold to anyone else.",
    columns: [
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "/eng" },
          { label: "About", href: "/eng/about" },
          { label: "Cases", href: "/eng/works" },
          { label: "Learn", href: "/learn" },
          { label: "Contact", href: "/eng/contact" },
          { label: "Tijdlek-scan", href: "https://tool.fasteradmin.com" },
        ],
      },
      {
        title: "Social",
        links: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/111586950" }],
      },
      {
        title: "Additionals",
        links: [
          { label: "Terms of Service", href: "/eng/terms-of-service-policy" },
          { label: "Privacy Policy", href: "/eng/privacy-policy-policy" },
        ],
      },
    ],
    legal: {
      terms: "Terms & Conditions",
      cookies: "Cookies",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
    },
  },
  nl: {
    tagline: "We automatiseren het repetitieve handwerk waar je een hekel aan hebt.",
    // Left in English deliberately — see the file comment above.
    pitch: "The operations systems that let you handle more work without hiring for it.",
    privacy:
      "Amsterdam, EU. Your data stays in the tools you already use, not shared or sold to anyone else.",
    columns: [
      {
        title: "Navigatie",
        links: [
          { label: "Home", href: "/" },
          { label: "Over ons", href: "/about" },
          { label: "Cases", href: "/works" },
          { label: "Inzichten", href: "/learn" },
          { label: "Contact", href: "/contact" },
          { label: "Tijdlek-scan", href: "https://tool.fasteradmin.com" },
        ],
      },
      {
        title: "Social",
        links: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/111586950" }],
      },
      {
        title: "Overig",
        links: [
          { label: "Algemene voorwaarden", href: "/terms-of-service-policy" },
          { label: "Privacybeleid", href: "/privacy-policy-policy" },
        ],
      },
    ],
    legal: {
      terms: "Algemene voorwaarden",
      cookies: "Cookies",
      privacy: "Privacybeleid",
      rights: "Alle rechten voorbehouden.",
    },
  },
};

export default function Footer({ locale = "en" }) {
  const t = COPY[locale];
  // The bottom legal bar is shared markup (not per-locale JSX), but the two
  // policy pages moved under /eng for English on 2026-09-13 — so the link
  // targets, unlike everything else here, do need a locale branch.
  const termsHref = locale === "nl" ? "/terms-of-service-policy" : "/eng/terms-of-service-policy";
  const privacyHref = locale === "nl" ? "/privacy-policy-policy" : "/eng/privacy-policy-policy";

  return (
    <footer className="bg-surface-alt">
      <div className="container-site py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <Image
              src="/img/pJFWiP5x9jQeaGSDwZogaYz9Ot8.png"
              alt="Faster Admin"
              width={183}
              height={37}
            />
            <p className="mt-3 text-xs text-grey-600">{t.tagline}</p>
            <p className="mt-8 h-card max-w-sm text-ink-muted">{t.pitch}</p>
            <p className="mt-4 max-w-sm text-xs text-grey-600">{t.privacy}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {t.columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-grey-500">{col.title}</p>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink {...l} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-grey-300 pt-8 text-xs text-grey-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Faster Admin. {t.legal.rights}
          </p>
          <div className="flex gap-6">
            <Link href={termsHref} className="hover:text-navy">
              {t.legal.terms}
            </Link>
            <Link href={privacyHref} className="hover:text-navy">
              {t.legal.cookies}
            </Link>
            <Link href={privacyHref} className="hover:text-navy">
              {t.legal.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, href }) {
  const cls = "text-base text-navy transition-colors hover:text-brand";

  if (href.startsWith("http")) {
    const own = isOwnDomain(href);
    return (
      <a
        href={href}
        {...(own ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={cls}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
