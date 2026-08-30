# AJH Studio

The production website for **AJH Studio, LLC** — website development, hosting, and content & copywriting. Built as a static-first Next.js site: no database, no CMS, all content lives in code and Markdown/MDX files in this repo.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) with a custom design-token system
- MDX blog posts via `next-mdx-remote` + `gray-matter` (no CMS, no database)
- [Resend](https://resend.com/) for contact form email delivery (serverless API route)
- Deploys to [Vercel](https://vercel.com/)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your own values:

```bash
cp .env.example .env.local
```

See [Contact Form Setup](#contact-form-setup) below for what each variable does.

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm run start
```

### Other useful commands

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

## Project Structure

```
app/                     Routes (App Router)
  page.tsx                 Home
  services/page.tsx        Services
  work/page.tsx             Work / portfolio
  about/page.tsx             About
  testimonials/page.tsx      Testimonials
  blog/page.tsx               Blog index
  blog/[slug]/page.tsx         Individual blog post
  blog/rss.xml/route.ts         RSS feed
  contact/page.tsx              Contact
  api/contact/route.ts          Contact form submit handler (Resend)
  sitemap.ts / robots.ts        SEO metadata routes

components/
  layout/                 Header, Footer, MobileNav
  ui/                     Buttons, Container, SectionHeading, Reveal, etc.
  cards/                  ServiceCard, PortfolioCard, TestimonialCard, BlogCard
  sections/               Homepage sections (Hero, Process, FeaturedWork, etc.)
  ContactForm.tsx         The contact form itself

content/
  blog/*.mdx              Blog post content (Markdown + JSX)

lib/
  data/                   Static content: services.ts, portfolio.ts, testimonials.ts
  blog.ts                 MDX loading, related posts, prev/next, reading time
  contact.ts              Contact form types + validation
  site-config.ts          Site-wide config: nav, URLs, social links
```

## Adding Content

Everything on this site is static and lives in code. No admin panel, no database — just edit files and redeploy.

### Add a blog post

1. Create a new file in `content/blog/`, e.g. `content/blog/my-new-post.mdx`.
2. Add frontmatter at the top, matching the existing posts:

```mdx
---
title: "Your Post Title"
date: "2026-09-01"
excerpt: "A one-sentence summary shown on cards and in search results."
seoDescription: "Optional — a more SEO-specific description. Falls back to excerpt."
author: "AJH Studio Team"
category: "Websites"
tags: ["Website Development", "Planning"]
image: "/images/blog/my-new-post.svg"
imageAlt: "Description of the featured image for screen readers"
featured: false
---

Your post content here, written in Markdown. You can use **bold**, _italics_,
lists, blockquotes, and headings (`##`, `###`).
```

3. Add a featured image to `public/images/blog/` (see [Images](#images) below).
4. That's it — the post automatically appears on `/blog`, gets its own page at
   `/blog/your-slug`, is included in the sitemap and RSS feed, and gets
   related-posts/prev-next navigation for free.

Only one post should have `featured: true` at a time — it's the one shown large at the top of `/blog` and in the homepage journal preview.

### Add a portfolio project

Edit `lib/data/portfolio.ts` and add an entry to the `portfolioProjects` array:

```ts
{
  slug: "project-slug",
  name: "Project Name",
  description: "A short description of the project.",
  category: "Local Business",
  image: "/images/work/project-slug.svg",
  url: "https://clientsite.com", // optional — omit if there's no live link
  services: ["Website Design", "Hosting"],
  featured: true, // shows on the homepage; false = only on /work
},
```

### Add a testimonial

Edit `lib/data/testimonials.ts` and add an entry to the `testimonials` array. **Only add real, client-approved testimonials.** The starter data ships with obvious placeholder entries (`isPlaceholder: true`) — replace or remove them as real testimonials come in. Set `featured: true` on the one testimonial that should appear large on `/testimonials`.

### Update services

Edit `lib/data/services.ts`. Each service supports a short description (used in homepage cards), a longer description, "who it's for," "what's included," and (for hosting) "ongoing support" bullet points.

### Images

Placeholder SVG graphics ship in `public/images/work/`, `public/images/blog/`, and `public/images/about/` so the design can be evaluated before real photography exists. Replace them with real photos or screenshots — keep the same file paths, or update the `image` field in the relevant data file / MDX frontmatter to point at your new file. Recommended: JPG/PNG/WebP, roughly 1200×900 for portfolio and blog images, 900×1100 for the About page photo.

## Contact Form Setup

The contact form is a real, working form — not a static mockup. Submissions are sent by email using [Resend](https://resend.com/), through a serverless API route at `app/api/contact/route.ts`. There is no database; nothing is stored, submissions are only emailed.

### Required environment variables

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key. Create one at [resend.com/api-keys](https://resend.com/api-keys). |
| `CONTACT_TO_EMAIL` | The inbox that should receive form submissions. |
| `CONTACT_FROM_EMAIL` | The "from" address submissions are sent from. Must be on a domain you've verified in Resend. |

### Configuring in Vercel

1. In your Vercel project, go to **Settings → Environment Variables**.
2. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (for Production, and Preview if you want previews to send real email).
3. In [Resend](https://resend.com/), verify the domain you intend to send from (e.g. `ajhstudio.com`) and generate an API key.
4. Redeploy so the new environment variables take effect.

Until these variables are set, the form still validates and submits, but the API route returns a clear error asking the visitor to email you directly — it never throws an unhandled error.

### Anti-spam

The form includes a honeypot field (visually hidden, `tabindex="-1"`) — real visitors never fill it in, but most bots do. Submissions with the honeypot filled in are silently accepted (so bots don't learn anything) but never emailed.

## SEO

- Per-page metadata (title, description, Open Graph, Twitter cards) is set via Next.js's Metadata API in each route.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` automatically, including every blog post.
- `app/blog/rss.xml/route.ts` generates an RSS feed for the blog.
- JSON-LD structured data: `Organization` + `WebSite` sitewide (in `app/layout.tsx`), `BlogPosting` on each post.
- Update `lib/site-config.ts` with your real production URL before launch (`siteConfig.url`) — canonical URLs and Open Graph URLs are derived from it.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository. Vercel will detect Next.js automatically — no configuration needed.
3. Add the environment variables listed above under [Contact Form Setup](#contact-form-setup).
4. Deploy. Every push to your main branch redeploys automatically; PRs get preview deployments.
5. Add your custom domain in **Settings → Domains**, and update `siteConfig.url` in `lib/site-config.ts` to match.

## Design System

Colors, typography, spacing, and radii are defined as design tokens in `app/globals.css` under `@theme`, and used via Tailwind utility classes (`bg-primary`, `text-ink`, `font-display`, etc.) rather than hard-coded hex values throughout components. To adjust the brand palette or type scale, edit the tokens in one place.

- **Display font:** Fraunces (serif, editorial)
- **Body/UI font:** Inter (sans-serif)
- **Core colors:** `ink` (dominant dark), `primary` (teal), `secondary` (clay), `accent` (brass/gold), plus warm neutrals (`sand`, `background`, `surface`, `border`, `muted`)

## License

Private, unlicensed — all rights reserved by AJH Studio, LLC.
