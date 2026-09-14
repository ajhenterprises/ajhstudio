import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Check, CircleDollarSign, MessageCircle, SearchCheck, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import ProjectBuilder from "@/components/pricing/ProjectBuilder";
import { activeProjectServices } from "@/lib/data/pricing-services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Website Pricing & Services",
  description: "Start with a $599 website setup and $159/month website care plan, then build a project around the services your business or organization needs.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Website Pricing & Services | AJH Enterprises",
    description: "Clear starting pricing and a flexible project builder for websites, content, and practical technology services.",
    url: "/pricing",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "AJH Enterprises website pricing and services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Pricing & Services | AJH Enterprises",
    description: "Start with a $599 website setup and $159/month website care plan, then build your project.",
    images: ["/images/og-default.jpg"],
  },
};

const included = [
  "Custom website design and development",
  "Responsive mobile and tablet optimization",
  "Content structure and clear calls to action",
  "Managed hosting and SSL security",
  "Routine maintenance and ongoing support",
  "Content updates within the agreed allowance",
  "Analytics and basic technical SEO foundations",
  "Launch support and practical guidance",
];

const steps = [
  ["01", "Select your services", "Build a project around the help you actually need."],
  ["02", "Tell me about the project", "Share your goals, audience, timeline, and any existing website."],
  ["03", "I review the scope", "I’ll look at the details, complexity, integrations, and content requirements."],
  ["04", "We confirm pricing", "You’ll receive final scope and pricing before any work begins."],
  ["05", "Your project begins", "Once the agreement is in place, we move into planning and production."],
];

const faqs = [
  ["What is included in the $599 setup fee?", "The standard setup covers strategy, content structure, custom design, responsive development, forms, foundational SEO setup, and launch support for a typical marketing or content-driven website. The final proposal confirms the exact page count and scope."],
  ["What does the $159/month cover?", "It covers managed hosting, SSL, routine maintenance, website care, ongoing support, and content updates within the allowance confirmed in your proposal."],
  ["Can my price increase?", "Yes, when a project requires more pages, content, integrations, specialized functionality, or complexity than the standard package. The $599 setup and $159/month remain the clear starting price, and any adjustment is discussed before work begins."],
  ["Are there contracts?", "Every accepted project uses a written proposal and service agreement so scope, responsibilities, pricing, and ongoing service terms are clear before work begins."],
  ["Can you redesign an existing website?", "Yes. Select Website Redesign and share your current URL. I’ll review what should be kept, improved, rebuilt, or migrated."],
  ["Can you build custom functionality?", "Possibly. Database, e-commerce, CRM, API, and app-like projects are considered according to their scale, scope, and complexity. Share what you need so I can determine whether it is a good fit."],
  ["Do you only work with churches?", "No. AJH Enterprises builds for businesses, entrepreneurs, nonprofits, professional services, real estate professionals, churches, ministries, community organizations, and others who need a clear, effective website."],
  ["Do you work with real estate businesses?", "Yes. Agent, team, and brokerage websites can include lead forms, team pages, and vendor-supported property search. IDX, MLS, and vendor fees are separate third-party costs unless specifically included in a proposal."],
  ["Can I add services later?", "Yes. You can request additional services as your needs change. Availability, timing, and pricing are confirmed when the new work is scoped."],
  ["Are third-party services included?", "Not automatically. Domains, premium software, paid plugins, IDX or MLS feeds, APIs, email platforms, premium media, advertising, and other outside services may be billed separately or passed through when applicable."],
  ["How quickly can a website launch?", "Timing depends on project size, content readiness, integrations, feedback, and current availability. Share your preferred timeframe in the project request and I’ll confirm a realistic schedule in the proposal."],
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Design, Development, Hosting and Care",
  provider: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
  areaServed: "US",
  offers: {
    "@type": "Offer",
    priceSpecification: [
      { "@type": "UnitPriceSpecification", price: "599", priceCurrency: "USD", name: "Website setup" },
      { "@type": "UnitPriceSpecification", price: "159", priceCurrency: "USD", unitText: "MONTH", name: "Website care and hosting" },
    ],
  },
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <section className="relative overflow-hidden border-b border-border bg-ink py-20 text-background sm:py-24 lg:py-28">
        <div className="absolute -right-20 -top-32 size-96 rounded-full border border-background/10" />
        <div className="absolute -right-4 -top-16 size-64 rounded-full border border-accent/20" />
        <Container className="relative grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Clear Starting Pricing</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl leading-[1.02] text-background sm:text-6xl lg:text-7xl">A better website. Built for your business.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/75 sm:text-xl">Professional websites designed, built, hosted, and supported by AJH Enterprises—with a clear starting point and room to shape the project around what you actually need.</p>
            <a href="#build-your-project" className="mt-9 inline-flex items-center gap-2 rounded-full bg-cta px-7 py-4 font-semibold text-cta-foreground transition-colors hover:bg-cta-hover">Build Your Project <ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
          <div className="rounded-3xl border border-background/15 bg-background/[0.06] p-7 backdrop-blur-sm sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-background/60">Standard Website Package</p>
            <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
              <div><span className="font-display text-5xl text-background sm:text-6xl">$599</span><span className="ml-2 text-background/65">setup</span></div>
              <span className="pb-2 font-display text-3xl text-accent">+</span>
              <div><span className="font-display text-5xl text-background sm:text-6xl">$159</span><span className="ml-2 text-background/65">/month</span></div>
            </div>
            <p className="mt-6 border-t border-background/15 pt-6 text-sm leading-relaxed text-background/70">Pricing shown represents standard project pricing. Final pricing may increase depending on scope, size, complexity, integrations, custom functionality, content requirements, or other specific project needs.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">What’s Included</p>
            <h2 className="mt-3 text-balance font-display text-3xl text-ink sm:text-4xl">The essentials for a website that works.</h2>
            <p className="mt-5 leading-relaxed text-muted">The standard package is designed for the marketing and content-driven websites most businesses, entrepreneurs, nonprofits, churches, and organizations need.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {included.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-text"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
          </ul>
        </Container>
      </section>

      <ProjectBuilder services={activeProjectServices} />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">How It Works</p><h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">From selections to a clear project plan.</h2></div>
          <ol className="mt-12 grid gap-5 md:grid-cols-5">{steps.map(([number, title, description]) => <li key={number} className="border-t border-border pt-5"><span className="font-display text-3xl text-primary/35">{number}</span><h3 className="mt-4 font-display text-xl text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{description}</p></li>)}</ol>
        </Container>
      </section>

      <section className="border-y border-border bg-sand/50 py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-surface p-6"><CircleDollarSign className="size-6 text-primary" /><h2 className="mt-5 font-display text-xl text-ink">Starting prices stay clear.</h2><p className="mt-2 text-sm leading-relaxed text-muted">$599 setup and $159/month are the standard starting point. Any scope adjustment is discussed before work begins.</p></div>
          <div className="rounded-2xl bg-surface p-6"><SearchCheck className="size-6 text-primary" /><h2 className="mt-5 font-display text-xl text-ink">Custom work is reviewed honestly.</h2><p className="mt-2 text-sm leading-relaxed text-muted">Larger databases, e-commerce, APIs, and app-like features may be possible depending on scale and complexity.</p></div>
          <div className="rounded-2xl bg-surface p-6"><ShieldCheck className="size-6 text-primary" /><h2 className="mt-5 font-display text-xl text-ink">Third-party costs are separate.</h2><p className="mt-2 text-sm leading-relaxed text-muted">Domains, IDX/MLS, premium software, APIs, paid media, and outside platforms are included only when a proposal says so.</p></div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Frequently Asked Questions</p><h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Questions before you build.</h2><p className="mt-5 text-muted">Still unsure? <Link href="/contact" className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4">Send me a message</Link> and tell me what you’re considering.</p></div>
          <div className="divide-y divide-border border-y border-border">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink"><span>{question}</span><span className="text-2xl font-light text-primary transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-2 pt-3 text-sm leading-relaxed text-muted">{answer}</p></details>)}</div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-background sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Ready to Start?</p><h2 className="mt-3 max-w-2xl text-balance font-display text-3xl text-background sm:text-4xl">Build your project and send everything in one clear request.</h2></div><a href="#build-your-project" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cta px-7 py-4 font-semibold text-cta-foreground hover:bg-cta-hover">Build Your Project <MessageCircle className="size-4" /></a></Container>
      </section>
    </>
  );
}
