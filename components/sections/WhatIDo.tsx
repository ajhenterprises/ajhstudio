import Link from "next/link";
import { MessageSquare, Code2, Compass } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/services";

const icons = {
  communication: MessageSquare,
  "websites-technology": Code2,
  leadership: Compass,
} as const;

export default function WhatIDo() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What I Do"
          title="Three ways I help people build and lead well."
          description="AJH Enterprises brings together communication, technology, and leadership — three things that, done well, tend to go together."
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.slug];
            return (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(23,34,31,0.35)]"
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
