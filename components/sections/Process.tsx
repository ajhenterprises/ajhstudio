import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Talk",
    description: "We start with a conversation about what you need and what your site should do.",
  },
  {
    number: "02",
    title: "Build",
    description: "The website, content, or project comes together — with you in the loop along the way.",
  },
  {
    number: "03",
    title: "Launch",
    description: "Everything gets tested and readied, then goes live.",
  },
  {
    number: "04",
    title: "Support",
    description: "Ongoing hosting, updates, and a person to call when something needs to change.",
  },
];

export default function Process() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="A simple, four-step process."
          align="center"
        />
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 90}>
              <div className="relative flex flex-col gap-3 border-t-2 border-primary pt-6">
                <span className="font-display text-4xl text-primary/30">{step.number}</span>
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
