import SeoDisclaimer from "@/components/SeoDisclaimer";
import InstallApp from "@/components/InstallApp";
import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramGlyph, LinkedinGlyph } from "@/components/ui/SocialIcons";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/ui/Logo";

const serviceLinks = [
  { label: "SEO", href: "/services#seo" },
  { label: "Digital Services", href: "/services#digital-services" },
  { label: "Content", href: "/services#communication" },
  { label: "Websites", href: "/services#websites-technology" },
];

const companyLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
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
            <Link href="/" className="inline-flex rounded-xl">
              <Logo light />
            </Link>
            <InstallApp />
            <p className="mt-3 text-sm font-medium text-background/60">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email AJH Digital"
                className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AJH Digital on Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramGlyph className="size-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AJH Digital on LinkedIn"
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
              Tell me what you&apos;re building and I&apos;ll follow up personally.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
            Website project scope
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-background/60">
            AJH Digital focuses on marketing and content-driven websites — the kind most
            businesses, entrepreneurs, nonprofits, churches, and organizations need. Custom
            projects may also be a fit depending on their scale, scope, and complexity. Reach
            out with what you&apos;re building so I can determine whether it&apos;s something I can
            take on. If it falls outside my scope, I&apos;ll gladly point you toward someone who
            specializes in that kind of work.{" "}
            <Link href="/services" className="text-background/70 underline underline-offset-2 hover:text-accent">
              Learn more about services
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 border-t border-background/10 pt-8">
          <SeoDisclaimer className="mb-6 max-w-3xl text-sm leading-relaxed text-background/70"/><h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/60">Services Disclaimer</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-background/70">If AJH Digital permanently ceases business, clients will be given access to their website source files and project assets through a private GitHub repository so they can download and retain a copy. Hosting, domains, and third-party services may require a separate transfer or setup. Please review this handoff policy before starting services.{" "}<Link href="/disclaimer#services-continuity" className="underline underline-offset-2 hover:text-accent">Read the Services Disclaimer</Link>.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-background/10 pt-8 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-background/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-background/80">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="transition-colors hover:text-background/80">
              Disclaimer
            </Link>
            <Link href="/disclaimer#services-continuity" className="transition-colors hover:text-background/80">Services Disclaimer</Link>
            <Link href="/affiliate-disclosure" className="transition-colors hover:text-background/80">
              Affiliate Disclosure
            </Link>
            <a href="https://client.ajhdigital.com" className="transition-colors hover:text-background/80">Client Portal</a>
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

