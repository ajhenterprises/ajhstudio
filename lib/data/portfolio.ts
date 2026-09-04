export type PortfolioProject = {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  services: string[];
  featured: boolean;
  // Set true only for a fictional/example entry used to show range before
  // enough real client work exists. Leave unset (or false) for real,
  // completed website projects — every entry here should be a real one.
  isExample?: boolean;
};

// Add new projects here. Each project needs an image at /public/images/work/.
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
