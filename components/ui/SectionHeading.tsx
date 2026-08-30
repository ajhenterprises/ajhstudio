import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-balance text-[2rem] leading-[1.15] sm:text-[2.5rem] lg:text-[2.85rem]",
          light ? "text-background" : "text-ink",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            light ? "text-background/80" : "text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
