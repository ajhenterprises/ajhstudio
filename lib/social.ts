import { createHash } from "node:crypto";
import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import brand from "./brand.json";
export function socialImage(title: string, description: string, category = "Websites. Content. Digital Growth.", slug = "") {
  return `/social-image?${new URLSearchParams({title, description, category, slug, v: createHash("sha256").update(JSON.stringify(["2026-09-share-v2",brand, siteConfig.logo, siteConfig.productionUrl])).digest("hex").slice(0,16)})}`;
}
export function withBrandMetadata(metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string" ? metadata.title : siteConfig.name;
  const description = metadata.description || siteConfig.description;
  const url = String(metadata.alternates?.canonical || "/");
  const image = socialImage(title, description, siteConfig.tagline, url);
  return {...metadata, openGraph: {...metadata.openGraph, title, description, url, siteName: siteConfig.name, images: [{url:image,width:1200,height:630,alt:title}]}, twitter: {...metadata.twitter,card:"summary_large_image",title,description,images:[image]}};
}
