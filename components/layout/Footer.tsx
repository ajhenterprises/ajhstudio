import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramGlyph, LinkedinGlyph } from "@/components/ui/SocialIcons";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

const serviceLinks = [
  { label: "Communication", href: "/services#communication" },
  { label: "Websites & Technology", href: "/services#websites-technology" },
  { label: "Leadership", href: "/services#leadership" },
];

const companyLinks = [
  { label: "Services", href: "/services" },
  { label: "Websites", href: "/websites" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-ink text-background">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-background font-display text-base font-semibold text-ink">
                A
              </span>
              <span className="font-display text-lg font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm font-medium text-background/60">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email AJH Enterprises"
                className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AJH Enterprises on Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramGlyph className="size-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AJH Enterprises on LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinGlyph className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
              Thinking about a website?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-background/70">
              Start the Website Questionnaire and tell me what you&apos;re building.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.questionnaireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Website Questionnaire
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium text-background transition-colors hover:border-background hover:bg-background/10"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
            The kind of website projects I take on
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-background/60">
            AJH Enterprises focuses on marketing and content-driven websites — the kind most
            churches, businesses, and organizations need. I don&apos;t take on projects that
            require a complex custom database, a full e-commerce store, or a custom web
            application. If that&apos;s what you&apos;re building, let me know — I&apos;m glad
            to point you toward someone who specializes in that kind of work.{" "}
            <Link href="/services" className="text-background/70 underline underline-offset-2 hover:text-accent">
              See what I do instead
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-background/10 pt-8 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-background/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-background/80">
              Terms of Service
            </Link>
            <a
              href={siteConfig.crmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/30 transition-colors hover:text-background/60"
            >
              Internal Login
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
