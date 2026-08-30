import { Check } from "lucide-react";
import type { Service } from "@/lib/data/services";
import Button from "@/components/ui/Button";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="flex scroll-mt-28 flex-col justify-between gap-8 rounded-2xl border border-border bg-surface p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(23,34,31,0.35)] sm:p-10"
    >
      <div>
        <h3 className="font-display text-2xl text-ink sm:text-[1.75rem]">{service.name}</h3>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
          {service.shortDescription}
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {service.included.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-text">
              <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button href="/contact" variant="outline">
          Start a Conversation
        </Button>
      </div>
    </div>
  );
}
