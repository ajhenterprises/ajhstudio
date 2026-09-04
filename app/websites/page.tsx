import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioCard from "@/components/cards/PortfolioCard";
import Process from "@/components/sections/Process";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { portfolioProjects } from "@/lib/data/portfolio";
import { getServiceBySlug } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "Modern, practical websites for churches, businesses, organizations, and entrepreneurs — built by AJH Enterprises.",
  alternates: { canonical: "/websites" },
  openGraph: {
    title: "Websites | AJH Enterprises",
    description:
      "Modern, practical websites for churches, businesses, organizations, and entrepreneurs — built by AJH Enterprises.",
    url: "/websites",
  },
};

export default function WebsitesPage() {
  const service = getServiceBySlug("websites-technology");

  return (
    <>
      <PageHero
        eyebrow="Websites & Technology"
        title="Websites that actually work."
        description="I build modern websites for churches, businesses, organizations, entrepreneurs, and other people who need a website that's clear, useful, and easy to manage — not a giant web agency, just practical websites for real people and organizations."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Websites" }]}
      />

      {service && (
        <section className="py-16 sm:py-20 lg:py-24">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="What's Included" title="What this looks like in practice" />
              <p className="mt-6 text-muted">
                Not sure if your project&apos;s a fit?{" "}
                <Link href="/services#websites-technology" className="text-primary underline underline-offset-4">
                  See the kind of work I take on
                </Link>
                .
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text">
                    <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      )}

      <div className="border-t border-border">
        <Process />
      </div>

      <section className="border-t border-border bg-surface-alt py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Websites I've Built" title="Real websites, real clients." />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {portfolioProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 100}>
                <PortfolioCard project={project} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">
            Want to hear it from a client instead?{" "}
            <Link href="/testimonials" className="text-primary underline underline-offset-4">
              Read what clients say
            </Link>
            .
          </p>
        </Container>
      </section>

      <FinalCta
        eyebrow="Start Here"
        title="Want to talk about your website?"
        description="Tell me a little about what you're building, what you need, and what you're hoping it accomplishes."
        primaryLabel="Start the Website Questionnaire"
        useQuestionnaire
        secondaryLabel="Send Me a Message"
        secondaryHref="/contact"
      />
    </>
  );
}
