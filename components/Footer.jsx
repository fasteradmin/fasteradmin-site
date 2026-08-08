import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Cases", href: "/works" },
      { label: "Contact", href: "/contact" },
      { label: "Automation Checker", href: "https://tool.fasteradmin.com" },
    ],
  },
  {
    title: "Social",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/111586950" }],
  },
  {
    title: "Additionals",
    links: [
      { label: "Terms of Service", href: "/terms-of-service-policy" },
      { label: "Privacy Policy", href: "/privacy-policy-policy" },
    ],
  },
];

export default function Footer() {
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
            <p className="mt-3 text-xs text-grey-600">
              Automating repetitive manual tasks you hate.
            </p>
            <p className="mt-8 h-card max-w-sm text-ink-muted">
              The operations systems that let you handle more work without hiring for it.
            </p>
            <p className="mt-4 max-w-sm text-xs text-grey-600">
              Amsterdam, EU. Your data stays in the tools you already use, not shared or sold
              to anyone else.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
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
          <p>© {new Date().getFullYear()} Faster Admin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms-of-service-policy" className="hover:text-navy">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy-policy" className="hover:text-navy">
              Cookies
            </Link>
            <Link href="/privacy-policy-policy" className="hover:text-navy">
              Privacy Policy
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
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
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
