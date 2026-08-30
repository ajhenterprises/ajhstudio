export type Service = {
  slug: "website" | "content";
  name: string;
  shortDescription: string;
  longDescription: string;
  whoItsFor: string[];
  included: string[];
  ongoing?: string[];
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "website",
    name: "Website Development & Hosting",
    shortDescription:
      "Design and build of a fast, modern website, plus ongoing hosting and upkeep so it stays online, secure, and up to date — from a first launch to a redesign of an existing site.",
    longDescription:
      "Whether you need a brand-new website or a redesign of one that's showing its age, AJH Studio handles the design, the build, and what comes after launch. You get a site built around how people actually use it — clear, fast, and easy to navigate on any device — and a plan for keeping it that way.",
    whoItsFor: [
      "Small businesses that need a professional site without an in-house web team",
      "Organizations and ministries that need something reliable and easy to update",
      "Anyone whose current website is outdated, slow, or hard to manage",
      "Businesses that want one point of contact instead of juggling a designer, a host, and a developer",
    ],
    included: [
      "Custom website design built around your business",
      "Mobile-responsive layouts that work on every device",
      "Performance-focused development",
      "SEO foundations built in from the start",
      "Secure, reliable hosting",
      "Website redesigns for existing sites",
    ],
    ongoing: [
      "Hosting and uptime monitoring",
      "Security updates and backups",
      "Content and copy updates",
      "Small design changes as your business grows",
      "A person to call when something needs to change",
    ],
    cta: { label: "Explore Website Services", href: "/services#website" },
  },
  {
    slug: "content",
    name: "Content & Copywriting",
    shortDescription:
      "Writing for the site itself, emails, and blog posts — copy that sounds like you and says what it needs to say.",
    longDescription:
      "A well-built website still needs the right words. AJH Studio writes and edits the copy that makes your site clear and your message land — for the pages themselves, for the emails you send, and for the blog posts that keep people coming back.",
    whoItsFor: [
      "Businesses that know what they do but struggle to put it into words",
      "Organizations that need a consistent voice across their site and emails",
      "Anyone launching a new site who needs the copy written, not just the design",
      "Teams that want a second set of eyes to edit and sharpen existing content",
    ],
    included: [
      "Website copy for new or existing pages",
      "Landing pages built around a specific offer or goal",
      "Blog posts written in your voice",
      "Email copy and campaigns",
      "Editing and proofreading of existing content",
      "Help defining a clear brand voice and message",
    ],
    cta: { label: "Explore Content Services", href: "/services#content" },
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
