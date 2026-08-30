import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-cta text-cta-foreground hover:bg-cta-hover shadow-[0_1px_0_rgba(0,0,0,0.05)]",
  secondary: "bg-ink text-background hover:bg-ink-soft",
  outline: "border border-border bg-transparent text-ink hover:border-ink hover:bg-surface-alt",
  "outline-light":
    "border border-background/25 bg-transparent text-background hover:border-background hover:bg-background/10",
  ghost: "bg-transparent text-ink hover:bg-surface-alt",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  showArrow?: boolean;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = true,
  external = false,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
