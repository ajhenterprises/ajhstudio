import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  seoDescription?: string;
  featured?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getSlugs();

  const posts = slugs.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(BLOG_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    return {
      ...frontmatter,
      slug,
      readingTime: readingTime(content).text,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getRelatedPosts(current: PostMeta, limit = 3): PostMeta[] {
  const posts = getAllPosts().filter((post) => post.slug !== current.slug);

  const scored = posts.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 2;
    score += post.tags.filter((tag) => current.tags.includes(tag)).length;
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.post);
}

export function getFeaturedPost(): PostMeta | null {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}
