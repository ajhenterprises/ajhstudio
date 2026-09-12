import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "You share your goals, audience, content, and vision through a guided questionnaire.",
  },
  {
    number: "02",
    title: "Plan",
    description: "I turn your answers into a clear scope, page plan, creative direction, and proposal.",
  },
  {
    number: "03",
    title: "Build",
    description: "Your project takes shape with clear review points and no mystery about what comes next.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Everything is tested and launched, with ongoing help available as your work grows.",
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
