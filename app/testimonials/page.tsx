import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import TestimonialCard from "@/components/cards/TestimonialCard";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { testimonials, getFeaturedTestimonial } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients have to say about working with AJH Studio.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Testimonials | AJH Studio",
    description: "What clients have to say about working with AJH Studio.",
    url: "/testimonials",
  },
};

export default function TestimonialsPage() {
  const featured = getFeaturedTestimonial();
  const rest = testimonials.filter((t) => t.id !== featured.id);

  return (
    <>
      <PageHero
        eyebrow="Client Experience"
        title="Good work should speak for itself."
        description="AJH Studio cares about the relationship as much as the result. Here's what it's been like for people to work with the studio — from the first conversation through launch and beyond."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Featured
          </h2>
          <Reveal>
            <TestimonialCard testimonial={featured} large />
          </Reveal>
        </Container>
      </section>

      {rest.length > 0 && (
        <section className="border-t border-border bg-surface-alt py-16 sm:py-20 lg:py-24">
          <Container>
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              More From Clients
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((testimonial, i) => (
                <Reveal key={testimonial.id} delay={i * 90}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCta
        eyebrow="Get Started"
        title="Have a project of your own?"
        description="We'd love to hear what you're working on."
        primaryLabel="Let's Talk"
      />
    </>
  );
}
