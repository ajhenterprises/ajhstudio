import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

export default function PortfolioCard({
  project,
  large = false,
}: {
  project: PortfolioProject;
  large?: boolean;
}) {
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(23,34,31,0.4)]",
        project.url && "cursor-pointer"
      )}
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[4/3]" : "aspect-[4/3]")}>
        <Image
          src={project.image}
          alt={`${project.name} website preview`}
          fill
          sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink backdrop-blur-sm">
          {project.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-ink">{project.name}</h3>
          {project.url && (
            <ArrowUpRight
              className="mt-1 size-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"
              aria-hidden="true"
            />
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-ink/70"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
