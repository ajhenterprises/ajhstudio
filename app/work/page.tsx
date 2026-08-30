import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import PortfolioCard from "@/components/cards/PortfolioCard";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { portfolioProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The kind of website design, hosting, and content projects AJH Studio takes on.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | AJH Studio",
    description: "The kind of website design, hosting, and content projects AJH Studio takes on.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="A sense of what AJH Studio builds."
        description="Every project starts with a conversation about what a business or organization needs — not a template applied twice. The examples below show the range: local businesses, ministries, and professional services, from a first launch to a full redesign."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <p className="mb-10 max-w-2xl text-sm text-muted">
            These are illustrative examples built to show the kind of work AJH Studio does —
            real client projects will replace them here as they launch.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 90}>
                <PortfolioCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta
        title="Want to see your project here next?"
        description="Tell us what you're working on and let's figure out what it needs."
      />
    </>
  );
}
