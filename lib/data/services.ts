export type Service = {
  slug: "communication" | "websites-technology" | "seo" | "digital-services";
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  whoItsFor: string[];
  included: string[];
  cta: { label: string; href?: string };
};

export const services: Service[] = [
  {
    slug: "communication",
    name: "Content",
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
      "Blog & article content",
      "Website content management",
    ],
    cta: { label: "Start a Conversation", href: "/contact" },
  },
  {
    slug: "websites-technology",
    name: "Websites",
    tagline: "Websites that actually work.",
    shortDescription:
      "Modern websites for businesses, entrepreneurs, nonprofits, community organizations, churches, and anyone who needs something clear, useful, and easy to manage.",
    longDescription:
      "I build practical websites for real people and organizations — not a giant web agency, just websites that do their job well. That includes new builds, redesigns of sites that have fallen behind, and the ongoing hosting and support that keeps a site running after launch.",
    whoItsFor: [
      "Small businesses and entrepreneurs who need a professional site without an in-house team",
      "Nonprofits, community groups, and professional organizations that need a clear, welcoming site",
      "Churches, ministries, and mission-driven teams that want to serve people well online",
      "Organizations whose current site is outdated, slow, or hard to manage",
      "Anyone who wants one person to build it, host it, and keep it working",
    ],
    included: [
      "Website design",
      "Website development",
      "Custom marketing websites",
      "Landing pages",
      "Website redesigns",
      "Mobile-responsive websites",
      "Website strategy",
      "Content structure",
      "Basic SEO",
      "Integrations",
      "Forms and clear calls to action",
      "Technology consulting",
      "Hosting and website care",
    ],
    cta: { label: "Discuss Your Project", href: "/contact" },
  },
  {
    slug: "seo", name: "SEO", tagline: "Make your website easier to find and understand.",
    shortDescription: "On-page SEO, content SEO, and search-friendly website structure built around your audience.",
    longDescription: "Improve the foundations that help search engines understand your website and visitors find useful answers. Search performance depends on many factors; rankings are never guaranteed.",
    whoItsFor: ["Businesses improving an existing website", "Teams publishing useful articles and service pages"],
    included: ["On-page SEO", "Content SEO", "Search-friendly structure", "Page titles and descriptions", "Internal linking", "Content planning"],
    cta: {label: "Discuss SEO", href: "/contact"},
  },
  {
    slug: "digital-services", name: "Digital Services", tagline: "A practical plan for your online presence.",
    shortDescription: "Social media content, digital strategy, and online presence consulting with personal guidance.",
    longDescription: "Bring clarity to your next digital step. Get focused support for the content, channels, and priorities that make sense for your organization.",
    whoItsFor: ["Entrepreneurs building their online presence", "Organizations looking for clear digital priorities"],
    included: ["Social media content", "Digital strategy", "Online presence consulting", "Content planning"],
    cta: {label: "Start a Conversation", href: "/contact"},
  },

];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
