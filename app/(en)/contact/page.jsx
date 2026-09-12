import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | FasterAdmin.com",
  description:
    "Book The Ops Call: 20 to 30 minutes, no pitch. Walk us through how work moves today and where it gets stuck.",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow text-grey-600">Book The Ops Call</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            Twenty minutes, no pitch.
          </h1>
          <p className="h-display mt-2 text-brand">Pick a time below.</p>
        </div>
      </section>

      <MeetingSection />
      <ContactSection minimal />
    </>
  );
}
