import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AJH Studio about a new website, a redesign, hosting, or content and copywriting.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | AJH Studio",
    description:
      "Get in touch with AJH Studio about a new website, a redesign, hosting, or content and copywriting.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's Talk"
        title="Tell us what you're working on."
        description="Whether it's a new website, a redesign, hosting and maintenance, or help with your content — this is the best place to start."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <p className="text-lg leading-relaxed text-muted">
              Fill out the form and we&apos;ll review your message personally — no automated
              sales funnel, no runaround. We typically reply within one to two business days.
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
                We&apos;ll read your message and follow up to set up a short conversation about
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
