import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        className="pointer-events-none absolute right-[-10%] top-[-15%] size-[32rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[26rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid grid-cols-1 items-center gap-16 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-32">
        <div>
          <Eyebrow>{siteConfig.tagline}</Eyebrow>
          <h1 className="mt-5 text-balance font-display text-[2.75rem] leading-[1.08] text-ink sm:text-[3.5rem] lg:text-[4rem]">
            I build useful things, communicate meaningful ideas, and help people lead well.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            I&apos;m Aaron Joseph Hall, founder of {siteConfig.name}. I work across
            communication, websites and technology, and leadership — building websites that
            actually work, writing words that connect, and helping churches, businesses, and
            leaders move forward with clarity.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/services" size="lg">
              Explore What I Do
            </Button>
            <Button href={siteConfig.questionnaireUrl} variant="outline" size="lg" external>
              Start a Website Project
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-border bg-ink shadow-[0_40px_80px_-40px_rgba(23,34,31,0.5)] sm:max-w-md lg:ml-auto">
            <div className="absolute inset-0 bg-[linear-gradient(155deg,var(--color-ink)_0%,var(--color-primary-hover)_55%,var(--color-primary)_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between p-8">
              <span className="w-fit rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-background/80 backdrop-blur-sm">
                What I Do
              </span>
              <div className="space-y-4">
                {["Communication", "Websites & Technology", "Leadership"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-background/15 bg-background/5 px-4 py-3.5 backdrop-blur-sm"
                  >
                    <span className="text-sm font-medium text-background">{item}</span>
                    <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
