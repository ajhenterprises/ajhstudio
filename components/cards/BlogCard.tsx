import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function BlogCard({
  post,
  large = false,
}: {
  post: PostMeta;
  large?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(23,34,31,0.4)]",
        large && "sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          large ? "aspect-[16/10] sm:w-1/2" : "aspect-[16/10]"
        )}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={large ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col gap-3 p-6 sm:p-7", large && "sm:justify-center")}>
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-secondary">
          <span>{post.category}</span>
          <span className="text-border" aria-hidden="true">
            &middot;
          </span>
          <time dateTime={post.date} className="text-muted normal-case tracking-normal">
            {formatDate(post.date)}
          </time>
        </div>
        <h3
          className={cn(
            "font-display text-ink transition-colors group-hover:text-primary",
            large ? "text-2xl sm:text-[1.7rem]" : "text-xl"
          )}
        >
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-xs text-muted">{post.readingTime}</span>
      </div>
    </Link>
  );
}
