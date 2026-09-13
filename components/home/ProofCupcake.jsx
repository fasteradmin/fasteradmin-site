import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const COPY = {
  en: {
    eyebrow: "Proof, not promises",
    stat: "8+ hours saved a week. 3 weeks to build.",
    quote:
      "“Not only did I go from 2-3+ hours to less than 1 hour of admin a day (answering emails, sending offers, etc.). More importantly, I don't have the worry of “Did I miss something or did I do it correct?”",
    name: "Alexander Cordova",
    role: "Marketing Specialist, Cupcake STHLM",
    cta: "Discover how he did it",
  },
  nl: {
    eyebrow: "Bewijs, geen beloftes",
    stat: "8+ uur bespaard per week. 3 weken bouwtijd.",
    // Translated from the customer's original English quote, not verbatim
    // what he said — flagged in the copy doc and in the PR for a native
    // check before this goes live.
    quote:
      "“Ik ging niet alleen van 2-3+ uur naar minder dan 1 uur administratie per dag (mails beantwoorden, offertes versturen, enzovoort). Belangrijker nog: ik heb niet meer de zorg van ‘heb ik iets gemist of heb ik het goed gedaan?’”",
    name: "Alexander Cordova",
    role: "Marketing Specialist, Cupcake STHLM",
    cta: "Ontdek hoe hij dat deed",
  },
};

export default function ProofCupcake({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section className="bg-surface-alt">
      <div className="container-site py-24 lg:py-28">
        <Reveal as="p" className="eyebrow text-ink-muted">
          {t.eyebrow}
        </Reveal>

        <Reveal as="p" className="mt-6 text-sm font-semibold uppercase tracking-wide text-navy">
          {t.stat}
        </Reveal>

        <Reveal
          as="blockquote"
          className="mt-4 max-w-3xl text-2xl font-medium italic leading-tight tracking-[-0.02em] text-navy md:text-[32px]"
        >
          {t.quote}
        </Reveal>

        <Reveal className="mt-12 flex items-center gap-4">
          <Image
            src="/img/QfOGeqDA89lvkdBlJgLaqQuQY.jpeg"
            alt="Alexander Cordova"
            width={64}
            height={64}
            className="h-14 w-14 rounded-xl object-cover"
          />
          <div>
            <p className="text-base font-medium text-navy">{t.name}</p>
            <p className="text-xs font-semibold text-ink-muted">{t.role}</p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <Button href="/works/email-to-quote-system">{t.cta}</Button>
        </Reveal>
      </div>
    </section>
  );
}
