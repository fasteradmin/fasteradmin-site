/**
 * English-only. This is the section the Dutch side replaced with the
 * long-form Manifesto (see Manifesto.jsx) — the copy doc explicitly says the
 * old "you're not short on tools" framing folds into the manifesto rather
 * than existing alongside it. No Dutch equivalent of this file; the English
 * homepage keeps it as it always was.
 */
export default function ProblemEn() {
  return (
    <section className="bg-surface-alt py-24 lg:py-32">
      <div className="container-site">
        <h2 id="not-short-on-tools" className="h-section max-w-3xl text-navy">
          You&apos;re not short on tools. You&apos;re short on people.
        </h2>

        <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
          <p>
            Ask most owners at this size how the back office is running and the answer is
            some version of &quot;it&apos;s a mess.&quot; Four out of five companies
            we&apos;ve talked to opened with exactly that word.
          </p>
          <p>
            A request comes in by email or WhatsApp. Someone reads it, then retypes the
            same details into three different tools by hand. Somewhere in that stack is
            probably a tool you already paid for to fix exactly this, sitting there
            unconnected to everything else. The week&apos;s plan lives in a spreadsheet, or
            in one person&apos;s head, and it only updates when that person remembers to.
          </p>
          <p className="text-navy">
            You can&apos;t fix this by hiring. Most Dutch companies at this size can&apos;t
            fill the role that would fix it, which is why automation ends up first on the
            list, not somewhere down it.
          </p>
        </div>
      </div>
    </section>
  );
}
