export const siteConfig = {
  name: "AJH Studio",
  legalName: "AJH Studio, LLC",
  tagline: "Websites, hosting, and content for people who'd rather not manage all three separately.",
  description:
    "AJH Studio designs and builds websites, hosts and maintains them, and writes the words that go on them — one point of contact for businesses, organizations, ministries, and individuals.",
  url: "https://www.ajhstudio.com",
  email: "hello@ajhstudio.com",
  crmUrl: "https://crm.ajhstudio.com",
  // TODO: Replace with the live public URL for the AJH Studio CRM's Website
  // Branding & Discovery Questionnaire once that route is deployed. This is
  // the ONLY place this URL should be defined — the /website-discovery page
  // reads it from here rather than hard-coding it.
  websiteDiscoveryUrl: "https://crm.ajhstudio.com/discovery",
  social: {
    instagram: "https://instagram.com/ajhstudio",
    linkedin: "https://linkedin.com/company/ajhstudio",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
  ],
  navCta: { label: "Let's Talk", href: "/contact" },
} as const;

export type SiteConfig = typeof siteConfig;
