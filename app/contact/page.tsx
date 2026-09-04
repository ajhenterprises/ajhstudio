import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aaron Joseph Hall at AJH Enterprises about a website, communication, or leadership project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | AJH Enterprises",
    description:
      "Get in touch with Aaron Joseph Hall at AJH Enterprises about a website, communication, or leadership project.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Thinking about a website? Start the questionnaire below. For communication, leadership, or anything else, send a message and I'll follow up."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8">
              <h2 className="font-display text-xl text-ink">Have a website project?</h2>
              <p className="text-sm leading-relaxed text-muted">
                Before we talk, tell me a little about what you&apos;re building, what you
                need, and what you&apos;re hoping the website will accomplish.
              </p>
              <div>
                <Button href={siteConfig.questionnaireUrl} external>
                  Start the Website Questionnaire
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8">
              <h2 className="font-display text-xl text-ink">Something else in mind?</h2>
              <p className="text-sm leading-relaxed text-muted">
                Communication, speaking, leadership, a product question, or anything else —
                use the form below.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <p className="text-lg leading-relaxed text-muted">
              I&apos;ll review your message personally — no automated sales funnel, no
              runaround. I typically reply within one to two business days.
            </p>

            <div className="flex flex-col gap-6">
              <InfoRow icon={Mail} title="Email">
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                  {siteConfig.email}
                </a>
              </InfoRow>
              <InfoRow icon={Clock} title="Response Time">
                Usually within 1–2 business days
              </InfoRow>
              <InfoRow icon={MessageSquare} title="What Happens Next">
                I&apos;ll read your message and follow up to set up a short conversation about
                your project.
              </InfoRow>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-alt">
        <Icon className="size-4 text-primary" />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-muted">{children}</p>
      </div>
    </div>
  );
}
