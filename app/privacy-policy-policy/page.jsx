import PolicyPage from "@/components/PolicyPage";

export const metadata = { title: "Privacy - Policy" };

/*
 * ⚠️ Reproduced verbatim from the Framer site per the 1:1 rebuild rule.
 * Two known defects carried over intentionally, both need fixing before
 * or shortly after launch:
 *   1. Section 6 points users at legal@noora.studio — a different company's
 *      address, left over from the purchased template.
 *   2. The third-party tool list is inaccurate for the current stack
 *      (names Framer/Plausible; the real stack is GTM, GA4 and Meta Pixel).
 */
const blocks = [
  {
    heading: "1. What We Collect",
    paras: [
      "We collect a few things — but only what’s necessary to run the site, improve our work, or stay in touch with you.",
      "Here’s what that might include:",
    ],
    list: [
      "Basic contact info (like your name, email, or company) when you fill out a form or send us a message",
      "Analytics data (like page views, time on site, device type, etc.) collected via tools like Google Analytics or Plausible",
      "Project-related details if you’re working with us — like brand files, content, and feedback",
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
      "All personal data is stored securely and only accessible by people who need it to do the work — usually just us. We use secure systems (e.g. Gmail, Notion, Framer, Slack) and keep everything password-protected. If you’ve ever worked with us, your project files are safe and archived for backup purposes only.",
    ],
  },
  {
    heading: "4. Third-Party Tools",
    paras: ["Like most websites, we use a few trusted tools to make things work better:"],
    list: [
      "Google Analytics / Plausible – for anonymous site usage stats",
      "Framer – for collaborative design feedback",
      "Slack / Email – for direct project communication",
      "Notion – to organize your project scope, timelines, and feedback",
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
  { paras: ["To do any of that, just email us at legal@noora.studio"] },
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
      updated="Last updated: September 2025"
    />
  );
}
