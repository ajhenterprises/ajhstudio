import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
        description="AJH Studio focuses on the two things that make the biggest difference for your online presence: a website that works well, and content that says what it needs to say."
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
                  What&apos;s included
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
        <Container className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-balance font-display text-2xl text-ink">On pricing</h2>
            <p className="text-muted">
              We don&apos;t publish flat-rate pricing because every website and every project is
              different. Reach out and we&apos;ll talk through your specific goals and timeline.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-balance font-display text-2xl text-ink">
              The kind of projects we take on
            </h2>
            <p className="text-muted">
              AJH Studio focuses on marketing and content-driven websites — the kind most
              businesses, organizations, and ministries need. We don&apos;t take on projects
              that require a complex custom database, a full e-commerce store, or a custom web
              application. If that&apos;s what you&apos;re building, let us know — we&apos;re
              glad to point you toward someone who specializes in that kind of work.
            </p>
          </div>
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
