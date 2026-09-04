import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

export default function FinalCta({
  eyebrow = "Start Here",
  title,
  description,
  primaryLabel = "Start a Conversation",
  primaryHref = "/contact",
  primaryExternal = false,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  primaryExternal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-background sm:py-28">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h2 className="max-w-2xl text-balance font-display text-[2.25rem] leading-[1.15] text-background sm:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="max-w-xl text-lg leading-relaxed text-background/75">{description}</p>
        )}
        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <Button href={primaryHref} size="lg" external={primaryExternal}>
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="outline-light" size="lg">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
