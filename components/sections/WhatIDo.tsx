import Link from "next/link";
import { MessageSquare, Code2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/services";

const icons = {
  communication: MessageSquare,
  "websites-technology": Code2,
} as const;

export default function WhatIDo() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What I Do"
          title="Two practical ways to move your work forward."
          description="AJH Enterprises brings clear communication together with websites and technology that help people understand, trust, and act."
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => {
            const Icon = icons[service.slug];
            return (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8 shadow-[0_12px_35px_-30px_rgba(23,50,45,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-32px_rgba(23,50,45,0.55)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl text-ink">{service.name}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">
                  {service.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
