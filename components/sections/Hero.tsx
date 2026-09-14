import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <Container className="relative grid grid-cols-1 items-center gap-16 py-20 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-28">
        <div>
          <Eyebrow>{siteConfig.tagline}</Eyebrow>
          <h1 className="mt-5 text-balance font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem] lg:text-[4.5rem]">
            Build what you&apos;ve been called to build.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            AJH Enterprises helps businesses, entrepreneurs, nonprofits, community groups,
            churches, and growing organizations turn good ideas into clear websites and
            meaningful communication.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/services" size="lg">
              Explore Services
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Discuss Your Project
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {["Personal guidance", "Mobile-first websites", "Ongoing support"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="size-4 text-primary" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative ml-auto w-full max-w-md pb-5 pr-5">
            <div className="absolute bottom-0 right-0 size-[calc(100%-1.25rem)] rounded-[1.75rem] border-2 border-accent" aria-hidden="true" />
            <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink p-8 shadow-[0_32px_70px_-42px_rgba(23,50,45,0.8)] sm:p-10">
              <div className="absolute -right-16 -top-16 size-48 rounded-full border border-background/15" aria-hidden="true" />
              <div className="absolute -right-7 -top-7 size-28 rounded-full border border-background/15" aria-hidden="true" />
              <span className="w-fit border-b border-accent pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-background/70">
                Thoughtful work, personally built
              </span>
              <div className="space-y-4">
                {["Websites that work", "Words that connect"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-background/15 py-4"
                  >
                    <span className="text-sm font-medium text-background">{item}</span>
                    <ArrowRight className="size-4 text-accent" aria-hidden="true" />
                  </div>
                ))}
                <p className="pt-2 text-sm leading-relaxed text-background/60">
                  Direct collaboration from the first conversation through launch and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
