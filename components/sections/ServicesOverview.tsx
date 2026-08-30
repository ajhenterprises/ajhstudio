import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceOverviewCard from "@/components/cards/ServiceOverviewCard";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

export default function ServicesOverview() {
  return (
    <section className="border-t border-border bg-surface-alt py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Two things, done well."
          description="AJH Studio focuses on the two pieces that make the biggest difference: a website that works, and content that says what it needs to say."
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 100}>
              <ServiceOverviewCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
