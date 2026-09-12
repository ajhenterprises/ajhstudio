import type { Metadata } from "next";
import { Building2, Target, Palette, ListChecks, Route, Clock, HelpCircle, Check, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Website Project Discovery",
  description:
    "Start your website project with a short discovery questionnaire — tell me about your business, your goals, and your vision so I can build a plan around you.",
  alternates: { canonical: "/website-discovery" },
  openGraph: {
    title: "Website Project Discovery | AJH Enterprises",
    description:
      "Start your website project with a short discovery questionnaire — tell me about your business, your goals, and your vision so I can build a plan around you.",
    url: "/website-discovery",
  },
};

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Tell Me About Your Business",
    description:
      "Help me understand who you are, what you do, who you serve, and what makes you different.",
  },
  {
    number: "02",
    icon: Target,
    title: "Define Your Goals",
    description: "Tell me what you want your website to accomplish and what success looks like.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Share Your Vision",
    description:
      "Tell me about your brand, visual preferences, websites you love, and the experience you want visitors to have.",
  },
  {
    number: "04",
    icon: ListChecks,
    title: "Tell Me What You Need",
    description:
      "Let me know about pages, functionality, integrations, content, SEO, and other requirements.",
  },
  {
    number: "05",
    icon: Route,
    title: "I'll Turn It Into a Plan",
    description:
      "I'll review your responses and use them to develop the creative direction and project plan for your website.",
  },
];

const prepare = [
  "A short description of your organization and who you serve",
  "The main action you want website visitors to take",
  "Any current logo, colors, photos, or brand files you have",
  "Examples of websites you like—and what you like about them",
  "A rough list of pages, features, or forms you may need",
  "Your preferred timeline and any important launch date",
];

export default function WebsiteDiscoveryPage() {
  return (
    <>
      <section className="border-b border-border bg-surface-alt">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="mb-8">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Website Discovery" }]}
            />
          </div>
          <div className="max-w-2xl">
            <Eyebrow>Start Your Project</Eyebrow>
            <h1 className="mt-4 text-balance font-display text-[2.5rem] leading-[1.1] text-ink sm:text-[3.25rem] lg:text-[3.75rem]">
              Let&apos;s build a website that works.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Before I design anything, I want to understand your business, your audience,
              your goals, and what you want your website to accomplish.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Every website project starts with discovery. The Website Branding &amp; Discovery
              Questionnaire gives me the information I need to understand your vision, identify
              what matters most, and build a website intentionally around your goals.
            </p>

            <div className="mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {["Save your progress", "Upload brand files", "Review before submitting"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-ink">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
              A quick note on scope: I focus on marketing and content-driven websites. I
              don&apos;t take on projects that require a complex custom database, a full
              e-commerce store, or a custom web application. If that&apos;s what you&apos;re
              building, reach out and I&apos;ll point you in the right direction.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href={siteConfig.questionnaireUrl} size="lg" external>
                Start Website Discovery
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Have Questions? Let&apos;s Talk
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Clock className="size-4 text-secondary" aria-hidden="true" />
              <span>Estimated completion time: 15–25 minutes</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Starter website projects begin at $500. Optional hosting and ongoing website
              care begins at $50 per month.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-ink py-16 text-background sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow light>Before You Begin</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl text-background sm:text-4xl">
              A little preparation makes this easier.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-background/70">
              You do not need polished answers. Bring what you have, skip what you do not know,
              and I&apos;ll help clarify the rest during project planning.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prepare.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-background/15 bg-background/[0.05] p-4 text-sm leading-relaxed text-background/85">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="What to Expect"
            title="Five short sections. One clear plan."
            description="The questionnaire walks you through everything I need to know before design begins."
          />
          <div className="mt-14 flex flex-col gap-10">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-[3rem_2.75rem_1fr] sm:items-start sm:gap-6">
                  <span className="font-display text-3xl text-primary/30">{step.number}</span>
                  <span className="flex size-11 items-center justify-center rounded-full bg-surface-alt">
                    <step.icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-muted">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-alt py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-4 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-surface">
            <HelpCircle className="size-6 text-secondary" aria-hidden="true" />
          </span>
          <h2 className="max-w-lg text-balance font-display text-2xl text-ink sm:text-3xl">
            You don&apos;t need to know anything about web design or technology.
          </h2>
          <p className="max-w-lg text-muted">
            Just answer the questions as best you can. If you&apos;re unsure about something,
            that&apos;s okay — I&apos;ll help guide you.
          </p>
          <div className="mt-3 flex max-w-xl items-start gap-3 rounded-xl border border-border bg-surface p-4 text-left text-sm leading-relaxed text-muted">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <span>Your answers are used to evaluate and plan your project. Submitting the questionnaire does not obligate you to hire AJH Enterprises.</span>
          </div>
        </Container>
      </section>

      <FinalCta
        eyebrow="Ready When You Are"
        title="Start your website discovery."
        description="It takes about 15–25 minutes, and it's the fastest way to get a project moving."
        primaryLabel="Start Website Discovery"
        useQuestionnaire
        secondaryLabel="Have Questions? Let's Talk"
        secondaryHref="/contact"
      />
    </>
  );
}
