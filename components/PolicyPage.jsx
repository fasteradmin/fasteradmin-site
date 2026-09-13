import ContactSection from "@/components/ContactSection";
import { headingSlug } from "@/lib/posts";

/**
 * Shared shell for the two policy pages.
 *
 * `blocks` is an array of { heading?, paras?, list? } rendered in order.
 */
export default function PolicyPage({ title, intro, blocks, updated, locale = "en" }) {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-24">
          <h1 className="h-display text-navy">{title}</h1>
          <p className="body-base mt-6 max-w-2xl text-grey-600">{intro}</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-site max-w-3xl">
          <div className="space-y-12">
            {blocks.map((b) => (
              <div key={b.heading || b.paras?.[0]}>
                {b.heading && (
                  <h2 id={headingSlug(b.heading)} className="text-xl font-semibold tracking-[-0.03em] text-navy">
                    {b.heading}
                  </h2>
                )}

                {b.paras?.map((p) => (
                  <p key={p} className="body-base mt-4 text-grey-600">
                    {p}
                  </p>
                ))}

                {b.list && (
                  <ul className="mt-4 space-y-2">
                    {b.list.map((l) => (
                      <li key={l} className="body-base flex gap-3 text-grey-600">
                        <span aria-hidden className="text-brand">
                          •
                        </span>
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {updated && <p className="mt-16 text-sm text-grey-500">{updated}</p>}
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
