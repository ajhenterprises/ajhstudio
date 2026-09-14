import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import brand from "@/lib/brand.json";
export default function manifest(): MetadataRoute.Manifest {
  return {name:siteConfig.name,short_name:siteConfig.name,description:siteConfig.description,id:"/",start_url:"/",scope:"/",display:"standalone",background_color:brand.background,theme_color:brand.navy,icons:[{src:"/brand/icon-192.png",sizes:"192x192",type:"image/png",purpose:"any"},{src:"/brand/icon-512.png",sizes:"512x512",type:"image/png",purpose:"any"},{src:"/brand/icon-512.png",sizes:"512x512",type:"image/png",purpose:"maskable"}]};
}
