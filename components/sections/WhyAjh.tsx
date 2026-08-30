import { MessageCircle, Compass, ShieldCheck, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const reasons = [
  {
    icon: MessageCircle,
    title: "Clear communication",
    description:
      "No jargon, no runaround. You'll know what's happening, what it costs, and what comes next.",
  },
  {
    icon: Users,
    title: "One point of contact",
    description:
      "Design, hosting, and content come from one studio — not a chain of vendors passing you along.",
  },
  {
    icon: Compass,
    title: "Practical solutions",
    description:
      "We build for what your business actually needs, not the trendiest tool available.",
  },
  {
    icon: ShieldCheck,
    title: "Long-term support",
    description:
      "A website isn't done at launch. We stick around for hosting, updates, and whatever comes next.",
  },
];

export default function WhyAjh() {
  return (
    <section className="border-t border-border bg-ink py-20 text-background sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why AJH Studio"
          light
          title="A studio built around helping, not just billing."
          description="Not a large agency, and not a freelancer disappearing between projects — a small studio that gives your project real attention."
        />
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 90}>
              <div className="flex flex-col gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-background/10">
                  <reason.icon className="size-5 text-accent" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg text-background">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-background/70">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
