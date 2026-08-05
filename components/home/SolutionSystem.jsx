import Image from "next/image";
import Link from "next/link";

/**
 * One "Time Multiplying System" block: heading + blurb + optional video,
 * then a row of 4 step cards with tool-logo chips and arrow connectors.
 */
export default function SolutionSystem({
  eyebrow,
  title,
  titleMuted,
  blurb,
  steps,
  video,
  reversed,
}) {
  return (
    <div className="rounded-[var(--radius-block)] bg-white p-8 md:p-12">
      <div className={`grid gap-10 lg:grid-cols-[1.1fr_1fr] ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <p className="eyebrow text-brand">{eyebrow}</p>
          <h3 className="h-section mt-4 text-navy">
            {title} {titleMuted && <span className="text-grey-400">{titleMuted}</span>}
          </h3>
          <div className="body-base mt-6 max-w-md space-y-4 text-grey-600">
            {blurb.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {video && (
          <div className="overflow-hidden rounded-[var(--radius-card)]">
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${video}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.title} className="relative">
            <div className="h-full rounded-[var(--radius-card)] border border-brand/30 bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <span aria-hidden>{step.icon}</span>
                {step.title}
              </p>
              <p className="body-base mt-4 text-navy">{step.body}</p>

              {step.logos?.length > 0 && (
                <>
                  <p className="mt-8 text-right text-[11px] text-grey-500">You might be using…</p>
                  <div className="mt-2 flex justify-end gap-2">
                    {step.logos.map((logo) => (
                      <Image
                        key={logo}
                        src={`/img/${logo}`}
                        alt=""
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] rounded-full object-contain"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent xl:block"
              >
                ➔
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-end gap-6">
        <Link
          href="/contact"
          className="rounded-[40px] bg-brand px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Pricing
        </Link>
        <Link href="/contact" className="text-sm text-navy hover:text-brand">
          Tell me more
        </Link>
      </div>
    </div>
  );
}
