import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/cards/BlogCard";
import FinalCta from "@/components/sections/FinalCta";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const description = post.seoDescription ?? post.excerpt;
  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    image: `${siteConfig.url}${post.image}`,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[720px] px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <header className="mt-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-secondary">
              <span>{post.category}</span>
              <span className="text-border" aria-hidden="true">
                &middot;
              </span>
              <time dateTime={post.date} className="normal-case tracking-normal text-muted">
                {formatDate(post.date)}
              </time>
              <span className="text-border" aria-hidden="true">
                &middot;
              </span>
              <span className="normal-case tracking-normal text-muted">{post.readingTime}</span>
            </div>
            <h1 className="mt-4 text-balance font-display text-[2.25rem] leading-[1.15] text-ink sm:text-[2.9rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-muted">By {post.author}</p>
          </header>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose-ajh mt-10">
            <MDXRemote source={post.content} />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <nav
            aria-label="Post navigation"
            className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-border p-5 transition-colors hover:border-ink"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
                </span>
                <span className="font-display text-lg text-ink group-hover:text-primary">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col items-end gap-1.5 rounded-xl border border-border p-5 text-right transition-colors hover:border-ink"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  Next <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
                <span className="font-display text-lg text-ink group-hover:text-primary">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface-alt py-16 sm:py-20">
          <Container>
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Related Reading
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCta
        title="Have a project in mind?"
        description="Whether it's a new website, better content, or both — let's talk about what you need."
      />
    </>
  );
}
