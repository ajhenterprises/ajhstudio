import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [{ pathname: "/images/**", search: "" }, { pathname: "/brand/**", search: "" }, { pathname: "/social-image" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/websites",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
