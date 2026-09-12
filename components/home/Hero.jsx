import Image from "next/image";
import Button from "@/components/Button";

/**
 * English keeps its original two-column hero with the receipt image. Dutch
 * drops the image per the copy doc's own note ("De bon-afbeelding is van de
 * hero verwijderd") and reuses the site's existing text-only hero pattern
 * (already live on /about) rather than leave an empty grid column.
 */
const COPY = {
  en: {
    eyebrow: "Reliable AI for your operations mess",
    heading: "Get the work done, without the hire you can't make.",
    body: "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
    cta: "Book The Ops Call — 20 Minutes, No Pitch",
    ctaHref: "/eng/#section-meeting",
    secondaryCta: "See a system that caught what a human missed",
    secondaryHref: "/eng/#section-proof",
  },
  nl: {
    eyebrow: "Betrouwbare AI voor de chaos in je backoffice",
    heading: "Het werk gedaan. Zonder er iemand voor aan te nemen.",
    body: "We zetten AI in waar iemand iets moet lezen en beslissen, en betrouwbare code voor de rest. Zodat het blijft werken na oplevering.",
    cta: "Plan 20 minuten met ons",
    ctaHref: "/#section-meeting",
    secondaryCta: "Zie een systeem dat ving wat een mens over het hoofd zag",
    secondaryHref: "/#section-proof",
  },
};

export default function Hero({ locale = "en" }) {
  const t = COPY[locale];

  if (locale === "nl") {
    return (
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow text-grey-600">{t.eyebrow}</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">{t.heading}</h1>

          <p className="body-base mt-8 max-w-md text-grey-600">{t.body}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={t.ctaHref}>{t.cta}</Button>
            <Button href={t.secondaryHref} variant="outline">
              {t.secondaryCta}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="eyebrow text-grey-600">{t.eyebrow}</p>
          <h1 className="h-display mt-4 text-navy">{t.heading}</h1>

          <p className="body-base mt-8 max-w-md text-grey-600">{t.body}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={t.ctaHref}>{t.cta}</Button>
            <Button href={t.secondaryHref} variant="outline">
              {t.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/img/faNLtVTXBShF52wn70kNNP3y0k.png"
            alt="A receipt itemising the hours lost to manual admin tasks"
            width={871}
            height={1084}
            priority
            className="h-auto w-full max-w-[360px] lg:max-h-[460px] lg:w-auto lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
