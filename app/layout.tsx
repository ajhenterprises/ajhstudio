import { socialImage } from "@/lib/social";
import brand from "@/lib/brand.json";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieNotice from "@/components/CookieNotice";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = { themeColor: brand.navy };

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "website development",
    "website design",
    "communication",
    "copywriting",
    "content strategy",
    "small business websites",
    "nonprofit websites",
    "organization websites",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: socialImage(siteConfig.name, siteConfig.description), width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [socialImage(siteConfig.name, siteConfig.description)],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/blog/rss.xml", title: `${siteConfig.name} Blog RSS` }],
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/brand/icon-180.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  logo: `${siteConfig.url}${siteConfig.logo.email}`,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.email,
  founder: { "@type": "Person", name: siteConfig.founder },
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content & SEO" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Websites & Digital Services" } },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-background text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-background"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
