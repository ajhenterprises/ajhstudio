import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import FeaturedWork from "@/components/sections/FeaturedWork";
import BlogPreview from "@/components/sections/BlogPreview";
import FinalCta from "@/components/sections/FinalCta";
import Process from "@/components/sections/Process";
import WebsiteOffer from "@/components/sections/WebsiteOffer";

export const metadata: Metadata = {
  title: "AJH Enterprises | Websites • Technology • Communication",
  description:
    "AJH Enterprises builds clear websites and practical technology and helps businesses and organizations communicate with the people they serve.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <WebsiteOffer />
      <FeaturedWork />
      <Process />
      <BlogPreview />
      <FinalCta
        title="Have a project in mind?"
        description="Whether it's a new website, help finding the right words, or a practical digital project—tell me about it."
        primaryLabel="Discuss Your Project"
        primaryHref="/contact"
      />
    </>
  );
}
