export type Product = {
  slug: string;
  name: string;
  description: string;
  category: string;
  // Omit when there's no public URL yet — don't invent one.
  url?: string;
  ctaLabel?: string;
};

// Add future products here as they launch. Only list products AJH
// Enterprises actually builds or operates today.
export const products: Product[] = [
  {
    slug: "the-ministry-study",
    name: "The Ministry Study",
    description:
      "A simple workspace designed to help pastors and ministry leaders organize their study, sermons, notes, and ministry work.",
    category: "Ministry Technology",
    url: "https://theministrystudy.com",
    ctaLabel: "Visit The Ministry Study",
  },
  {
    slug: "ajh-real-estate-crm",
    name: "AJH Real Estate CRM",
    description:
      "An internal, productized tool built around real estate workflows — helping manage leads, clients, and listings in one place.",
    category: "Real Estate Technology",
    // Internal tool — no public URL yet.
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
