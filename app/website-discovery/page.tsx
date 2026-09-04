import type { Metadata } from "next";
import { Building2, Target, Palette, ListChecks, Route, Clock, HelpCircle } from "lucide-react";
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
    "Start your AJH Studio website project with a short discovery questionnaire — tell us about your business, your goals, and your vision so we can build a plan around you.",
  alternates: { canonical: "/website-discovery" },
  openGraph: {
    title: "Website Project Discovery | AJH Studio",
    description:
      "Start your AJH Studio website project with a short discovery questionnaire — tell us about your business, your goals, and your vision so we can build a plan around you.",
    url: "/website-discovery",
  },
};

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Tell Us About Your Business",
    description:
      "Help us understand who you are, what you do, who you serve, and what makes you different.",
  },
  {
    number: "02",
    icon: Target,
    title: "Define Your Goals",
    description: "Tell us what you want your website to accomplish and what success looks like.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Share Your Vision",
    description:
      "Tell us about your brand, visual preferences, websites you love, and the experience you want visitors to have.",
  },
  {
    number: "04",
    icon: ListChecks,
    title: "Tell Us What You Need",
    description:
      "Let us know about pages, functionality, integrations, content, SEO, and other requirements.",
  },
  {
    number: "05",
    icon: Route,
    title: "We'll Turn It Into a Plan",
    description:
      "AJH Studio will review your responses and use them to develop the creative direction and project plan for your website.",
  },
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
              Before we design anything, we want to understand your business, your audience,
              your goals, and what you want your website to accomplish.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Every website project starts with discovery. Our Website Branding &amp; Discovery
              Questionnaire gives us the information we need to understand your vision, identify
              what matters most, and build a website intentionally around your goals.
            </p>

            <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
              A quick note on scope: AJH Studio focuses on marketing and content-driven
              websites. We don&apos;t take on projects that require a complex custom database,
              a full e-commerce store, or a custom web application. If that&apos;s what
              you&apos;re building, reach out and we&apos;ll point you in the right direction.
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
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="What to Expect"
            title="Five short sections. One clear plan."
            description="The questionnaire walks you through everything AJH Studio needs to know before design begins."
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
            that&apos;s okay — we&apos;ll help guide you.
          </p>
        </Container>
      </section>

      <FinalCta
        eyebrow="Ready When You Are"
        title="Start your website discovery."
        description="It takes about 15–25 minutes, and it's the fastest way to get a project moving."
        primaryLabel="Start Website Discovery"
        primaryHref={siteConfig.questionnaireUrl}
        primaryExternal
        secondaryLabel="Have Questions? Let's Talk"
        secondaryHref="/contact"
      />
    </>
  );
}
