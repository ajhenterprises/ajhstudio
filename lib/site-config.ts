export const siteConfig = {
  name: "AJH Digital",
  legalName: "AJH Digital",
  founder: "Aaron Joseph Hall",
  tagline: "Websites. Content. Digital Growth.",
  description:
    "AJH Digital helps businesses, churches, organizations, entrepreneurs, and professionals grow their online presence with websites, content, SEO, and personal digital support.",
  coreMessage:
    "Clear strategy, thoughtful design, and practical support for the work that matters to you.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ajhdigital.com",
  productionUrl: "https://ajhdigital.com",
  domain: "AJHDigital.com",
  logo: { primary: "/brand/logo.webp", light: "/brand/logo-light.webp", email: "/brand/logo.png", icon: "/brand/monogram.webp" },
  email: "AJHDigitalLLC@gmail.com",
  // The CRM's branded custom domain. Keep this as the single source of truth
  // for the Internal Login link in the footer.
  crmUrl: "https://ajh-business-hq.vercel.app",
  // The public Website Questionnaire — the first step for anyone exploring
  // a website project. This is the ONLY place this URL should be defined;
  // every CTA that starts the questionnaire (the /website-discovery page,
  // the header, footer, homepage, services, and websites pages) reads it
  // from here rather than hard-coding it.
  // Keep the questionnaire on the verified Vercel URL until the CRM custom
  // subdomain's DNS record is active, so public project links never break.
  questionnaireUrl: "https://ajh-business-hq.vercel.app/website-questionnaire",
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
