export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  organization: string;
  role?: string;
  featured?: boolean;
  isPlaceholder?: boolean;
};

// IMPORTANT: The testimonials below are clearly marked placeholders.
// Replace `isPlaceholder: true` entries with real client testimonials as they
// come in, and remove the isPlaceholder flag (or delete the entry) once real
// quotes are added. Never present placeholder content as a real testimonial.
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "This is a placeholder testimonial. Replace this with a real quote from a client describing their experience working with AJH Enterprises.",
    name: "Client Name",
    organization: "Business or Organization",
    role: "Title / Role",
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "This is a placeholder testimonial. Swap in a genuine quote once a client has agreed to share their feedback publicly.",
    name: "Client Name",
    organization: "Business or Organization",
    role: "Title / Role",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "This is a placeholder testimonial. Use short, specific quotes that describe what it was like to work with the studio.",
    name: "Client Name",
    organization: "Business or Organization",
    role: "Title / Role",
    isPlaceholder: true,
  },
];

export function getFeaturedTestimonial() {
  return testimonials.find((t) => t.featured) ?? testimonials[0];
}
