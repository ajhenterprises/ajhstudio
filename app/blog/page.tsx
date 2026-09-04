import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/cards/BlogCard";
import FinalCta from "@/components/sections/FinalCta";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on websites, communication, and leadership — practical, straightforward writing from Aaron Joseph Hall.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | AJH Enterprises",
    description:
      "Notes on websites, communication, and leadership — practical, straightforward writing from Aaron Joseph Hall.",
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = featured ? posts.filter((post) => post.slug !== featured.slug) : posts;

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Notes on websites, communication, and leadership."
        description="Practical, straightforward writing from Aaron Joseph Hall about building websites, communicating clearly, and leading well."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-14">
          {featured && (
            <div>
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Featured
              </h2>
              <BlogCard post={featured} large />
            </div>
          )}

          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Recent Posts
            </h2>
            {rest.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-muted">More posts are on the way.</p>
            )}
          </div>
        </Container>
      </section>

      <FinalCta
        title="Need more than reading material?"
        description="If it's time to fix your website, sharpen your message, or talk through a leadership question, let's talk."
      />
    </>
  );
}
