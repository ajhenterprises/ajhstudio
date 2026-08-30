import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialCard({
  testimonial,
  large = false,
}: {
  testimonial: Testimonial;
  large?: boolean;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-8",
        large && "p-10 sm:p-12"
      )}
    >
      <div>
        <Quote className="size-7 text-accent" aria-hidden="true" />
        <blockquote className={cn("mt-5 leading-relaxed text-ink", large ? "text-xl sm:text-2xl font-display" : "text-base")}>
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-ink">{testimonial.name}</p>
          <p className="text-sm text-muted">
            {testimonial.role ? `${testimonial.role}, ` : ""}
            {testimonial.organization}
          </p>
        </div>
        {testimonial.isPlaceholder && (
          <span className="shrink-0 rounded-full border border-border bg-surface-alt px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
            Placeholder
          </span>
        )}
      </figcaption>
    </figure>
  );
}
