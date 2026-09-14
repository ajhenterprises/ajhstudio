export const siteConfig = {
  name: "AJH Enterprises",
  legalName: "AJH Enterprises, LLC",
  founder: "Aaron Joseph Hall",
  tagline: "Build What You’ve Been Called to Build.",
  description:
    "AJH Enterprises builds clear websites and practical technology and helps businesses and organizations communicate with the people they serve.",
  coreMessage:
    "Clear strategy, thoughtful design, and practical support for the work that matters to you.",
  url: "https://www.ajhenterprises.com",
  email: "aaron@ajhenterprises.com",
  // The CRM's branded custom domain. Keep this as the single source of truth
  // for the Internal Login link in the footer.
  crmUrl: "https://crm.ajhenterprises.com",
  // The public Website Questionnaire — the first step for anyone exploring
  // a website project. This is the ONLY place this URL should be defined;
  // every CTA that starts the questionnaire (the /website-discovery page,
  // the header, footer, homepage, services, and websites pages) reads it
  // from here rather than hard-coding it.
  questionnaireUrl: "https://crm.ajhenterprises.com/website-questionnaire",
  social: {
    instagram: "https://instagram.com/ajhenterprises",
    linkedin: "https://linkedin.com/company/ajhenterprises",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Websites", href: "/websites" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
