import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy-policy",
  title: "Privacy - Policy",
  description:
    "How FasterAdmin collects, uses and stores your data, and how to exercise your rights under the GDPR.",
});

const blocks = [
  {
    heading: "1. What We Collect",
    paras: [
      "We collect a few things — but only what’s necessary to run the site, improve our work, or stay in touch with you.",
      "Here’s what that might include:",
    ],
    list: [
      "Basic contact info (like your name, email, or company) when you fill out a form or book a call",
      "Analytics data (like page views, time on site, device type, etc.) collected via Google Analytics and Google Tag Manager",
      "Advertising data collected via the Meta Pixel, if you arrived from a Meta ad",
      "Project-related details if you’re working with us — tools, workflows, and feedback",
      "Any info you choose to share when you email, call, or message us",
    ],
  },
  {
    heading: "2. What We Use It For",
    paras: ["We only use the data we collect for things that actually make sense. Like:"],
    list: [
      "Responding to your messages or inquiries",
      "Sending relevant project updates if we’re working together",
      "Improving how the site performs and how people interact with it",
      "Understanding what people care about, so we can write better content and build better things",
    ],
  },
  {
    paras: ["We don’t use your data to spam, retarget, or hand off to some third-party sales list."],
  },
  {
    heading: "3. How We Store It",
    paras: [
      "All personal data is stored securely and only accessible by people who need it to do the work — usually just us, based in Amsterdam. We use secure systems (Google Workspace, Airtable, n8n) and keep everything password-protected. If you’ve ever worked with us, your project files are safe and archived for backup purposes only.",
    ],
  },
  {
    heading: "4. Third-Party Tools",
    paras: ["We use a few trusted tools to make the site and the booking flow work:"],
    list: [
      "Google Analytics and Google Tag Manager – for anonymous site usage stats",
      "Meta Pixel – for advertising, if you arrived from a Meta ad",
      "Google Calendar – to book and manage The Ops Call",
      "n8n – to route contact form submissions and booking requests",
    ],
  },
  {
    paras: [
      "These tools may collect basic usage data, but we don’t give them access to your personal info unless it’s required to complete a project (with your approval).",
    ],
  },
  {
    heading: "5. Cookies",
    paras: [
      "We may use basic cookies to track how people interact with the site — nothing invasive or personal. You can always disable cookies in your browser settings if you’d prefer not to be tracked at all.",
    ],
  },
  {
    heading: "6. Your Rights",
    paras: ["You can always:"],
    list: [
      "Ask us what data we have on you",
      "Request a copy of that data",
      "Ask us to delete it at any time",
      "Tell us to stop contacting you",
    ],
  },
  { paras: ["To do any of that, just email us at joey@getfasteradmin.com"] },
  {
    heading: "7. Data Retention",
    paras: [
      "If you become a client, we’ll keep your project files, name, and contact info for reference and ongoing collaboration. If not, we’ll delete any inquiry-related data after 12 months.",
      "We never hold on to anything longer than we need to.",
    ],
  },
  {
    heading: "8. Updates to This Policy",
    paras: [
      "We may update this page from time to time. If we do, we’ll post the changes here and update the “last updated” date below.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy"
      intro="Whether you’re browsing the site or reaching out for a project, this policy covers how we handle your data."
      blocks={blocks}
      updated="Last updated: August 2026"
    />
  );
}
