import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact | FasterAdmin.com",
  description:
    "Book a short meeting. Go through your current set-up with one of our experts and get honest advice.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-grey-150">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow text-grey-600">Contact</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            Want to find out where you too, can optimize your workflow?
          </h1>
          <p className="h-display mt-2 text-brand">Book a short meeting now.</p>
        </div>
      </section>

      <MeetingSection />
      <ContactSection />
    </>
  );
}
