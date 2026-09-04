export type PortfolioProject = {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  services: string[];
  featured: boolean;
  // Set true only for fictional/example entries used to show range before
  // enough real client work exists. Leave unset (or false) for real,
  // completed AJH Studio projects.
  isExample?: boolean;
};

// Add new projects here. Each project needs an image at /public/images/work/.
// Replace the placeholder SVGs with real screenshots or photography when available.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "jubilee-city-church",
    name: "Jubilee City Church",
    description:
      "A clear, welcoming site for a non-denominational church in Daphne, Alabama, built to help newcomers find service times and get plugged in quickly.",
    category: "Ministry",
    image: "/images/work/jubilee-city-church.jpg",
    url: "https://jubileecity.church",
    services: ["Website Design", "Hosting", "Maintenance", "Copywriting", "Content"],
    featured: true,
  },
  {
    slug: "harbor-and-oak",
    name: "Harbor & Oak Coffee Co.",
    description:
      "A warm, image-forward site for a small coastal coffee roaster, built to make ordering and finding the shop effortless.",
    category: "Local Business",
    image: "/images/work/harbor-and-oak.jpg",
    services: ["Website Design", "Hosting", "Copywriting"],
    featured: true,
    isExample: true,
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
    isExample: true,
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
    isExample: true,
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
    isExample: true,
  },
  {
    slug: "sold-with-hall",
    name: "Sold With Hall",
    description:
      "A personal-brand site for a REALTOR® serving Baldwin and Mobile counties, Alabama, built to make it easy for buyers and sellers to connect.",
    category: "Real Estate",
    image: "/images/work/sold-with-hall.jpg",
    url: "https://soldwithhall.com",
    services: ["Website Design", "Hosting", "Maintenance", "Copywriting", "Content"],
    featured: true,
  },
];

export function getFeaturedProjects() {
  return portfolioProjects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
