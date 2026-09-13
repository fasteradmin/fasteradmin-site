import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | FasterAdmin.com",
  description:
    "Plan het startgesprek: 20 tot 30 minuten, geen verkooppraatje. Vertel ons hoe het werk nu loopt en waar het vastloopt.",
  locale: "nl_NL",
  languages: { nl: "/contact", en: "/eng/contact", "x-default": "/contact" },
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow text-grey-600">Plan het startgesprek</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            Twintig minuten, geen verkooppraatje.
          </h1>
          <p className="h-display mt-2 text-brand">Kies hieronder een tijd.</p>
        </div>
      </section>

      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}
