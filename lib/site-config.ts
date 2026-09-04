export const siteConfig = {
  name: "AJH Enterprises",
  legalName: "AJH Enterprises, LLC",
  founder: "Aaron Joseph Hall",
  tagline: "Communication • Technology • Leadership",
  description:
    "AJH Enterprises builds websites and technology, creates meaningful content, and helps people communicate and lead well.",
  coreMessage:
    "I build useful things, communicate meaningful ideas, and help people lead well.",
  url: "https://www.ajhenterprises.com",
  email: "hello@ajhenterprises.com",
  // TODO: switch both of these back to https://crm.ajhenterprises.com once
  // that custom domain is pointed at the CRM's Vercel deployment -- using
  // the Vercel URL directly in the meantime so these links actually work.
  crmUrl: "https://ajh-business-hq.vercel.app",
  // The public Website Questionnaire — the first step for anyone exploring
  // a website project. This is the ONLY place this URL should be defined;
  // every CTA that starts the questionnaire (the /website-discovery page,
  // the header, footer, homepage, services, and websites pages) reads it
  // from here rather than hard-coding it.
  questionnaireUrl: "https://ajh-business-hq.vercel.app/website-questionnaire",
  social: {
    instagram: "https://instagram.com/ajhenterprises",
    linkedin: "https://linkedin.com/company/ajhenterprises",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Websites", href: "/websites" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
