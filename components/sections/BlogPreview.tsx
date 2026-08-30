import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/cards/BlogCard";
import Reveal from "@/components/ui/Reveal";
import { getAllPosts } from "@/lib/blog";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="From the Journal" title="Recent thinking on websites and content." />
          <Button href="/blog" variant="outline" className="shrink-0">
            View All Insights
          </Button>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
