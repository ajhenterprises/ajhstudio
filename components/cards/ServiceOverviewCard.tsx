import { Check } from "lucide-react";
import type { Service } from "@/lib/data/services";
import Button from "@/components/ui/Button";

export default function ServiceOverviewCard({ service }: { service: Service }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <div>
        <h3 className="font-display text-2xl text-ink sm:text-[1.65rem]">{service.name}</h3>
        <p className="mt-4 leading-relaxed text-muted">{service.shortDescription}</p>
        <ul className="mt-6 space-y-2.5">
          {service.included.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-text">
              <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button href={service.cta.href} variant="outline" className="self-start">
        {service.cta.label}
      </Button>
    </div>
  );
}
