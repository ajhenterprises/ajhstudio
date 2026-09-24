import { withBrandMetadata } from "@/lib/social";
import type { Metadata } from "next";
import EntryOffers from "@/components/sections/EntryOffers";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import FeaturedWork from "@/components/sections/FeaturedWork";
import BlogPreview from "@/components/sections/BlogPreview";
import FinalCta from "@/components/sections/FinalCta";
import Process from "@/components/sections/Process";
import WebsiteOffer from "@/components/sections/WebsiteOffer";

export const metadata: Metadata = withBrandMetadata({
  title: "AJH Digital | Websites. Content. Digital Growth.",
  description:
    "Managed small business websites from $49/month + $199 setup or $99/month with no setup fee. Church & Ministry Websites from $25/month. Custom websites and content services.",
  alternates: { canonical: "/" },
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <EntryOffers />
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
