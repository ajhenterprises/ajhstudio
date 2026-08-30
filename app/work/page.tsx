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
    "A look at recent website design, hosting, and content projects from AJH Studio.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | AJH Studio",
    description: "A look at recent website design, hosting, and content projects from AJH Studio.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="A studio's worth of projects, one client at a time."
        description="Every project here started with a conversation about what a business or organization actually needed — not a template applied twice. Here's a look at some of that work."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
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
