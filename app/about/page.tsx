import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "AJH Studio is a small studio built around helping people communicate clearly and build better online experiences.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | AJH Studio",
    description:
      "AJH Studio is a small studio built around helping people communicate clearly and build better online experiences.",
    url: "/about",
  },
};

const values = [
  {
    title: "Clarity over cleverness",
    description: "The goal is always to be understood — in design, in writing, and in how a project is run.",
  },
  {
    title: "Real relationships",
    description: "Projects work better when there's an actual relationship behind them, not just a transaction.",
  },
  {
    title: "Built to last",
    description: "A website should hold up over time, not just look good on launch day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small studio, built around real conversations."
        description="AJH Studio exists to help people communicate clearly and build a better online presence — without needing to become web experts themselves."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/about/founder-placeholder.jpg"
                alt="Placeholder for a personal photo — replace with a real photo"
                fill
                sizes="(min-width: 1024px) 33vw, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-border bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Editable — replace with your own introduction
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Hi, I&apos;m [Your Name].</h2>
            <p className="text-lg leading-relaxed text-text">
              [This is where your personal introduction goes. Share who you are, what led you to
              start AJH Studio, and what you want visitors to know about working with you. Keep
              it warm and direct — this is the most personal page on the site.]
            </p>
            <p className="text-lg leading-relaxed text-text">
              [Add a paragraph about your background — relevant experience, what you focused on
              before AJH Studio, and what shaped the way you approach websites and content today.]
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-alt py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why AJH Studio"
              title="[Add the story behind why you started the studio.]"
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-6 text-lg leading-relaxed text-text">
            <p>
              [Write a few paragraphs about why AJH Studio exists — the gap you saw, the kind of
              clients you wanted to help, or the frustration that started it all. This section
              should feel personal and specific to your own experience.]
            </p>
            <p>
              [Consider closing with your philosophy on how you approach a project — what you
              believe makes a website or a piece of writing actually work for the people using
              it.]
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="How I Work"
            title="A few things that guide every project."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-7">
                  <h3 className="font-display text-xl text-ink">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta
        title="Let's talk about your project."
        description="If AJH Studio sounds like the right fit, the next step is a conversation."
      />
    </>
  );
}
