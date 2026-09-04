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
    "Communication, websites & technology, and leadership — the three ways AJH Enterprises helps people build and lead well.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | AJH Enterprises",
    description:
      "Communication, websites & technology, and leadership — the three ways AJH Enterprises helps people build and lead well.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Three pillars. One person to talk to."
        description="AJH Enterprises works across three things that tend to go together: clear communication, websites and technology that work, and leadership that's grounded in real experience."
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
              <SectionHeading eyebrow={service.tagline} title={service.name} description={service.longDescription} />
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
              I don&apos;t publish flat-rate pricing because every project is different. Reach
              out and I&apos;ll talk through your specific goals and timeline.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-balance font-display text-2xl text-ink">
              The kind of website projects I take on
            </h2>
            <p className="text-muted">
              For websites specifically, I focus on marketing and content-driven sites — the
              kind most churches, businesses, and organizations need. I don&apos;t take on
              projects that require a complex custom database, a full e-commerce store, or a
              custom web application. If that&apos;s what you&apos;re building, let me know —
              I&apos;m glad to point you toward someone who specializes in that kind of work.
            </p>
          </div>
        </Container>
      </section>

      <FinalCta
        title="Ready to get started?"
        description="If it's a website, start the questionnaire. For everything else, send a message."
        primaryLabel="Start the Website Questionnaire"
        useQuestionnaire
        secondaryLabel="Send a Message"
        secondaryHref="/contact"
      />
    </>
  );
}
