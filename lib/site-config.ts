export const siteConfig = {
  name: "AJH Studio",
  legalName: "AJH Studio, LLC",
  tagline: "Websites, hosting, and content for people who'd rather not manage all three separately.",
  description:
    "AJH Studio designs and builds websites, hosts and maintains them, and writes the words that go on them — one point of contact for businesses, organizations, ministries, and individuals.",
  url: "https://www.ajhstudio.com",
  email: "hello@ajhstudio.com",
  // TODO: switch both of these back to https://crm.ajhstudio.com once that
  // custom domain is pointed at the CRM's Vercel deployment -- using the
  // Vercel URL directly in the meantime so these links actually work today.
  crmUrl: "https://ajh-business-hq.vercel.app",
  questionnaireUrl: "https://ajh-business-hq.vercel.app/website-questionnaire",
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
