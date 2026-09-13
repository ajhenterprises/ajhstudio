import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("size-11 shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="13" fill="#FFFDF8" />
      <path d="M12 34L21.1 13H26.8L36 34" stroke="#17322D" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.2 27.5H31.8" stroke="#D9A34A" strokeWidth="3.1" strokeLinecap="round" />
      <path d="M34.7 13V34" stroke="#17322D" strokeWidth="3.1" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={light ? "text-background" : "text-ink"} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display text-xl font-semibold tracking-[-0.025em]", light ? "text-background" : "text-ink")}>
            AJH
          </span>
          <span className={cn("mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em]", light ? "text-background/60" : "text-muted")}>
            Enterprises
          </span>
        </span>
      )}
    </span>
  );
}
