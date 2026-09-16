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
  crmUrl: "https://crm.ajhdigital.com",
  projectRequestUrl: "/pricing#build-your-project",
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
