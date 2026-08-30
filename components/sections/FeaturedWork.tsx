import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PortfolioCard from "@/components/cards/PortfolioCard";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/lib/data/portfolio";

export default function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Selected Work" title="A few projects we've enjoyed building." />
          <Button href="/work" variant="outline" className="shrink-0">
            View All Work
          </Button>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100}>
              <PortfolioCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
