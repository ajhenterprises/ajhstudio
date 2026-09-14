"use client";

import {
  BarChart3,
  Blocks,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  Church,
  Compass,
  FileText,
  Globe2,
  HeartHandshake,
  Home,
  LayoutPanelTop,
  Mail,
  MessageSquare,
  Network,
  PenLine,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ProjectService } from "@/lib/data/pricing-services";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  globe: Globe2,
  shield: ShieldCheck,
  refresh: RefreshCw,
  layout: LayoutPanelTop,
  building: Building2,
  church: Church,
  heart: HeartHandshake,
  home: Home,
  pen: PenLine,
  file: FileText,
  book: BookOpen,
  search: Search,
  calendar: CalendarDays,
  message: MessageSquare,
  wrench: Wrench,
  network: Network,
  chart: BarChart3,
  mail: Mail,
  blocks: Blocks,
  compass: Compass,
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
export default function ServiceOptionCard({
  service,
  selected,
  onToggle,
}: {
  service: ProjectService;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = icons[service.icon] ?? Globe2;
  const prices = [
    service.oneTimePrice != null ? `${formatPrice(service.oneTimePrice)} one-time` : null,
    service.monthlyPrice != null ? `${formatPrice(service.monthlyPrice)}/month` : null,
  ].filter(Boolean);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-surface p-6 transition duration-200 sm:p-7",
        selected
          ? "border-primary shadow-[0_18px_45px_-28px_rgba(40,102,91,0.55)] ring-1 ring-primary"
          : "border-border hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_45px_-32px_rgba(23,50,45,0.4)]"
      )}
    >
      {service.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-sand px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink">
          Standard package
        </span>
      )}
      <span className="flex size-11 items-center justify-center rounded-xl bg-surface-alt text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 pr-20 font-display text-xl leading-tight text-ink">{service.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
      {service.longDescription && (
        <p className="mt-3 text-sm leading-relaxed text-text/80">{service.longDescription}</p>
      )}
      <div className="mt-auto pt-6">
        <div className="mb-4 min-h-11">
          {prices.length > 0 ? (
            prices.map((price) => (
              <p key={price} className="font-semibold text-ink">{price}</p>
            ))
          ) : (
            <p className="font-semibold text-ink">{service.priceNote ?? "Custom pricing"}</p>
          )}
          {service.priceNote && prices.length > 0 && (
            <p className="mt-1 text-xs leading-relaxed text-muted">{service.priceNote}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
            selected
              ? "bg-primary text-white hover:bg-primary-hover"
              : "bg-ink text-background hover:bg-ink-soft"
          )}
        >
          {selected ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
          {selected ? "Added to Your Project" : "Add to Your Project"}
        </button>
      </div>
    </article>
  );
}
