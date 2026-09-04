export type Service = {
  slug: "communication" | "websites-technology" | "leadership";
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  whoItsFor: string[];
  included: string[];
  // Either a normal internal href, or useQuestionnaire: true to point the
  // CTA at siteConfig.questionnaireUrl (kept out of this file so the URL
  // has one source of truth).
  cta: { label: string; href?: string; useQuestionnaire?: boolean };
};

export const services: Service[] = [
  {
    slug: "communication",
    name: "Communication",
    tagline: "Clear words. Better stories. Stronger messages.",
    shortDescription:
      "Copywriting, content, messaging, storytelling, and communication strategy — the words that make everything else work.",
    longDescription:
      "Most organizations know what they do but struggle to say it clearly. This is the work of finding the clear version of your message and putting it in front of the right people — for a website, an email, a talk, or a brand.",
    whoItsFor: [
      "Businesses and organizations that know what they do but struggle to put it into words",
      "Teams that need a consistent voice across a website, emails, and content",
      "Anyone launching something new who needs the words written, not just the design",
      "Leaders who want a second set of eyes to sharpen an existing message",
    ],
    included: [
      "Copywriting",
      "Website copy",
      "Brand messaging",
      "Content strategy",
      "Content creation",
      "Storytelling",
      "Communication strategy",
      "Speaking",
    ],
    cta: { label: "Start a Conversation", href: "/contact" },
  },
  {
    slug: "websites-technology",
    name: "Websites & Technology",
    tagline: "Websites that actually work.",
    shortDescription:
      "Modern websites for churches, businesses, organizations, and entrepreneurs who need something clear, useful, and easy to manage.",
    longDescription:
      "I build practical websites for real people and organizations — not a giant web agency, just websites that do their job well. That includes new builds, redesigns of sites that have fallen behind, and the ongoing hosting and support that keeps a site running after launch.",
    whoItsFor: [
      "Churches and ministries that need a clear, welcoming site",
      "Small businesses and entrepreneurs who need a professional site without an in-house team",
      "Organizations whose current site is outdated, slow, or hard to manage",
      "Anyone who wants one person to build it, host it, and keep it working",
    ],
    included: [
      "Website design",
      "Website development",
      "Custom websites",
      "Web applications",
      "Landing pages",
      "Website redesigns",
      "Mobile-responsive websites",
      "Website strategy",
      "Content structure",
      "Basic SEO",
      "Integrations",
      "Custom functionality",
      "Technology consulting",
      "Product development",
    ],
    cta: { label: "Start the Website Questionnaire", useQuestionnaire: true },
  },
  {
    slug: "leadership",
    name: "Leadership",
    tagline: "Helping people lead with clarity and purpose.",
    shortDescription:
      "Leadership development, speaking, consulting, and strategic conversations — grounded in real experience, not generic frameworks.",
    longDescription:
      "This grows out of real experience leading people and organizations, including in ministry — not a corporate leadership framework applied from the outside. It's conversations, speaking, and consulting aimed at helping people and teams lead with more clarity.",
    whoItsFor: [
      "Pastors and ministry leaders navigating real leadership challenges",
      "Teams that need help getting clear on direction and roles",
      "Organizations looking for an outside perspective on a specific decision",
      "Anyone who wants a straightforward, honest conversation about leading well",
    ],
    included: [
      "Leadership development",
      "Leadership consulting",
      "Speaking",
      "Strategic conversations",
      "Ministry leadership",
      "Team development",
      "Organizational clarity",
    ],
    cta: { label: "Start a Conversation", href: "/contact" },
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
