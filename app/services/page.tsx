import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/cards/ServiceCard";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, hosting, and content & copywriting from AJH Studio — one studio, one point of contact.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | AJH Studio",
    description:
      "Website development, hosting, and content & copywriting from AJH Studio — one studio, one point of contact.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Two services. One studio. No runaround."
        description="AJH Studio focuses on the two things that make the biggest difference for your online presence: a website that actually works, and content that says what it needs to say."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-8">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Container>
      </section>

      {services.map((service) => (
        <section key={`${service.slug}-detail`} className="border-t border-border py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={service.slug === "website" ? "Website Service" : "Content Service"}
                title={service.name}
                description={service.longDescription}
              />
            </Reveal>
            <Reveal delay={100} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  Who it&apos;s for
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.whoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                      <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  {service.ongoing ? "What's included" : "What's included"}
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                      <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {service.ongoing && (
                  <>
                    <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      Ongoing support can include
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.ongoing.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                          <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="border-t border-border bg-surface-alt py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-xl text-balance font-display text-2xl text-ink sm:text-3xl">
            Every project is different. Let&apos;s talk about what you need.
          </h2>
          <p className="max-w-lg text-muted">
            We don&apos;t publish flat-rate pricing because every website and every project is
            different. Reach out and we&apos;ll talk through your specific goals and timeline.
          </p>
          <Button href="/contact" size="lg">
            Start a Conversation
          </Button>
        </Container>
      </section>

      <FinalCta
        title="Ready to get started?"
        description="Tell us a bit about your project and we'll follow up with next steps."
        secondaryLabel="See Our Work"
        secondaryHref="/work"
      />
    </>
  );
}
