import { cn } from "@/lib/utils";

export default function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        light ? "text-accent" : "text-secondary",
        className
      )}
    >
      <span className={cn("h-px w-6", light ? "bg-accent" : "bg-secondary")} aria-hidden="true" />
      {children}
    </span>
  );
}
