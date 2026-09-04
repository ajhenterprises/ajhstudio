import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import FeaturedWork from "@/components/sections/FeaturedWork";
import BlogPreview from "@/components/sections/BlogPreview";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "AJH Enterprises | Communication • Technology • Leadership",
  description:
    "AJH Enterprises builds websites and technology, creates meaningful content, and helps people communicate and lead well.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <FeaturedWork />
      <BlogPreview />
      <FinalCta
        title="Have a project in mind?"
        description="Whether it's a new website, help finding the right words, or a conversation about leading well — tell me about it."
        primaryLabel="Start the Website Questionnaire"
        useQuestionnaire
        secondaryLabel="Send Me a Message"
        secondaryHref="/contact"
      />
    </>
  );
}
