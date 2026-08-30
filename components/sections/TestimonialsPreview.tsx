import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import TestimonialCard from "@/components/cards/TestimonialCard";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data/testimonials";

export default function TestimonialsPreview() {
  const preview = testimonials.slice(0, 3);

  return (
    <section className="border-t border-border bg-surface-alt py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Client Experience" title="Good work should speak for itself." />
          <Button href="/testimonials" variant="outline" className="shrink-0">
            Read What Clients Say
          </Button>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {preview.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={i * 100}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
