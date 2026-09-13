import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/eng/terms-of-service-policy",
  title: "Terms of Service - Policy",
  description:
    "Scope, payment terms, revisions and ownership for FasterAdmin engagements.",
  languages: {
    nl: "/terms-of-service-policy",
    en: "/eng/terms-of-service-policy",
    "x-default": "/terms-of-service-policy",
  },
});

const blocks = [
  {
    heading: "1. Scope of Work",
    paras: [
      "Before any project begins, we’ll agree on a written scope — including deliverables, timelines, and pricing. This might be outlined in a proposal, email, or Notion board.",
      "If new tasks or features are added mid-project that fall outside of what was originally agreed on, we’ll re-quote them and confirm with you before moving forward. We won’t surprise you with new costs.",
    ],
  },
  {
    heading: "2. Payment Terms",
    paras: [
      "Our standard terms are 50% upfront, 50% upon delivery unless we’ve agreed to something different in writing.",
      "Final files and live access are delivered after the final payment is received. Late payments of more than 7 days may pause the project timeline. We accept payment via bank transfer, Stripe, or Wise.",
    ],
  },
  {
    heading: "3. Revisions",
    paras: [
      "Every project includes a defined number of revision rounds (typically 2–3 per phase, depending on scope).",
      "Revisions are meant to refine, not restart. If your feedback significantly changes direction after approvals or finalization, we may quote additional work. We’ll always keep you informed before anything is billed.",
    ],
  },
  {
    heading: "4. Timelines & Deadlines",
    paras: [
      "We work fast, but quality takes time. We’ll set a clear schedule and stick to it — assuming feedback, assets, and approvals are provided on time.",
      "If your team goes silent for more than 14 days, we’ll pause the project. A rebooking fee may apply if we need to reschedule your slot in our calendar.",
    ],
  },
  {
    heading: "5. Ownership & Rights",
    paras: [
      "Once the final payment is received, you own the final deliverables.",
      "This includes designs, code, brand assets, and documentation we create for your project. We reserve the right to showcase non-confidential work in our portfolio, case studies, or social media unless you request otherwise in writing before we start.",
    ],
  },
  {
    heading: "6. Communication",
    paras: [
      "Most of our work happens async. We use Slack, email, Framer, Notion, and Loom to stay in sync — no endless Zoom calls.",
      "We aim to reply to all project messages within 24–48 hours on weekdays. If urgent timelines or meetings are needed, we’ll schedule them together.",
    ],
  },
  {
    heading: "7. Cancellations",
    paras: [
      "You can cancel a project at any time. If that happens, you’ll be invoiced for the work completed up to that point.",
      "If you pause a project for more than 21 days without prior notice, we may reschedule your work depending on our current queue. Paused projects may incur a restart fee depending on scope and availability.",
    ],
  },
  {
    heading: "8. Liability",
    paras: [
      "We guarantee the delivery of work as outlined in the agreed scope. We are not liable for indirect damages, technical issues from third-party services (e.g. CMS platforms, plugins, hosting), or how the final work is used beyond our control.",
      "We test and hand over everything in good faith and with professional care.",
    ],
  },
  {
    heading: "9. Confidentiality",
    paras: [
      "Everything you share with us — including strategy, visuals, product details, or internal documentation — stays private. We don’t share it, reuse it, or disclose it without your permission.",
      "If you’d like to sign a mutual NDA before we start, we’re happy to do so.",
    ],
  },
  {
    heading: "10. Updates to Terms",
    paras: [
      "We like to show the work we’re proud of. Unless we’ve agreed otherwise, we may display the final product in our portfolio, blog, case studies, or social channels.",
      "If the work involves sensitive material (e.g. pre-launch products, stealth brands), just let us know upfront and we’ll keep it private.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <PolicyPage
      title="Terms of Service"
      intro="By working with FasterAdmin or using our website, you agree to the terms below."
      blocks={blocks}
    />
  );
}
