import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-border bg-surface-alt">
      <Container className="py-16 sm:py-20 lg:py-24">
        {breadcrumbs && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-balance font-display text-[2.5rem] leading-[1.1] text-ink sm:text-[3.25rem] lg:text-[3.75rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
