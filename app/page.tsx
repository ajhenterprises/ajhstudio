import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Process from "@/components/sections/Process";
import WhyAjh from "@/components/sections/WhyAjh";
import FeaturedWork from "@/components/sections/FeaturedWork";
import TestimonialsPreview from "@/components/sections/TestimonialsPreview";
import BlogPreview from "@/components/sections/BlogPreview";
import FinalCta from "@/components/sections/FinalCta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Website Development, Hosting & Content`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <ServicesOverview />
      <Process />
      <WhyAjh />
      <FeaturedWork />
      <TestimonialsPreview />
      <BlogPreview />
      <FinalCta
        title="Have a project in mind?"
        description="Whether you need a new website, a better website, help with your content, or someone to keep everything running — let's talk."
        primaryLabel="Start a Conversation"
      />
    </>
  );
}
