import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aaron Joseph Hall is the founder of AJH Enterprises, working across communication, technology, and leadership.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | AJH Enterprises",
    description:
      "Aaron Joseph Hall is the founder of AJH Enterprises, working across communication, technology, and leadership.",
    url: "/about",
  },
};

const values = [
  {
    title: "Clarity over cleverness",
    description: "The goal is always to be understood — in a website, in writing, and in how a project is run.",
  },
  {
    title: "Real relationships",
    description: "Projects work better when there's an actual relationship behind them, not just a transaction.",
  },
  {
    title: "Built to last",
    description: "A website — or a piece of writing, or a leadership decision — should hold up over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Aaron Joseph Hall."
        description="I'm the founder of AJH Enterprises. I work across communication, websites and technology, and leadership — and I built this company to bring all of it under one roof."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/about/founder-placeholder.jpg"
                alt="Placeholder for a personal photo of Aaron Joseph Hall — replace with a real photo"
                fill
                sizes="(min-width: 1024px) 33vw, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-border bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Editable — replace with a fuller personal introduction
            </span>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Hi, I&apos;m Aaron.</h2>
            <p className="text-lg leading-relaxed text-text">
              I started {siteConfig.name} to bring together the work I actually do: building
              websites and technology, writing and communicating ideas clearly, and helping
              people and organizations lead well. Rather than treat those as separate careers,
              AJH Enterprises is the umbrella that holds all of it together.
            </p>
            <p className="text-lg leading-relaxed text-text">
              [Add a paragraph about your background — your experience in ministry, real
              estate, and leadership, and what shaped the way you approach this work today.]
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-alt py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Person, Company, Products"
              title="Aaron Joseph Hall, AJH Enterprises, and what I build."
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-6 text-lg leading-relaxed text-text">
            <p>
              <strong className="text-ink">Aaron Joseph Hall</strong> is me — the person behind
              the work, writing the blog, and doing the actual communication, technology, and
              leadership work described on this site.
            </p>
            <p>
              <strong className="text-ink">{siteConfig.name}</strong> is the company: the
              umbrella under which client projects, writing, and products are built and
              operated.
            </p>
            <p>
              <strong className="text-ink">Products</strong> like{" "}
              <a href="/products" className="text-primary underline underline-offset-4">
                The Ministry Study and the AJH Real Estate CRM
              </a>{" "}
              are individual tools built under that umbrella — each with its own name and its
              own purpose.
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
        description="If this sounds like the right fit, the next step is a conversation."
      />
    </>
  );
}
