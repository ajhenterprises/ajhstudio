export type PortfolioProject = {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  services: string[];
  featured: boolean;
};

// Add new projects here. Each project needs an image at /public/images/work/.
// Replace the placeholder SVGs with real screenshots or photography when available.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "harbor-and-oak",
    name: "Harbor & Oak Coffee Co.",
    description:
      "A warm, image-forward site for a small coastal coffee roaster, built to make ordering and finding the shop effortless.",
    category: "Local Business",
    image: "/images/work/harbor-and-oak.jpg",
    services: ["Website Design", "Hosting", "Copywriting"],
    featured: true,
  },
  {
    slug: "grace-point-fellowship",
    name: "Grace Point Fellowship",
    description:
      "A clear, welcoming site that makes it easy for newcomers to find service times, ministries, and how to get involved.",
    category: "Ministry",
    image: "/images/work/grace-point-fellowship.jpg",
    services: ["Website Design", "Hosting", "Content"],
    featured: true,
  },
  {
    slug: "bishop-law-group",
    name: "Bishop Law Group",
    description:
      "A redesign that replaced a decade-old site with a fast, professional presence built around client trust.",
    category: "Professional Services",
    image: "/images/work/bishop-law-group.jpg",
    services: ["Website Redesign", "Hosting", "SEO Foundations"],
    featured: true,
  },
  {
    slug: "the-mercantile",
    name: "The Mercantile on Main",
    description:
      "A simple, editorial storefront site for a boutique retailer, built to showcase products and drive foot traffic.",
    category: "Retail",
    image: "/images/work/the-mercantile.jpg",
    services: ["Website Design", "Copywriting"],
    featured: false,
  },
  {
    slug: "riverside-counseling",
    name: "Riverside Counseling",
    description:
      "A calm, reassuring site for a private counseling practice, with clear paths to schedule a first appointment.",
    category: "Healthcare",
    image: "/images/work/riverside-counseling.jpg",
    services: ["Website Design", "Hosting", "Content"],
    featured: false,
  },
  {
    slug: "lowcountry-realty-group",
    name: "Lowcountry Realty Group",
    description:
      "A listings-friendly site built for a small residential real estate team, with an emphasis on speed and clarity.",
    category: "Real Estate",
    image: "/images/work/lowcountry-realty-group.jpg",
    services: ["Website Design", "Hosting", "Maintenance"],
    featured: false,
  },
];

export function getFeaturedProjects() {
  return portfolioProjects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
