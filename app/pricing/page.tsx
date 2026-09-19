import WebsiteLevels from "@/components/pricing/WebsiteLevels";
import { withBrandMetadata } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Check, CircleDollarSign, MessageCircle, SearchCheck, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import ProjectBuilder from "@/components/pricing/ProjectBuilder";
import { getPublicServices } from "@/lib/service-catalog";
import ContentRefreshOffer from "@/components/pricing/ContentRefreshOffer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = withBrandMetadata({
  title: "Website Pricing & Services",
  description: "Website pricing from $999 setup and $149/month, adjusted to your scope. Prepay yearly to save 15% on monthly plans only; setup fees are excluded.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Website Pricing & Services | AJH Digital",
    description: "Clear starting pricing and a flexible project builder for websites, content, and practical technology services.",
    url: "/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Pricing & Services | AJH Digital",
    description: "Start with a $999 website setup and $149/month website care plan, then build your project.",
  },
});

const included = [
  "Custom website design and development",
  "Responsive mobile and tablet optimization",
  "Content structure and clear calls to action",
  "Managed hosting and SSL security",
  "Routine maintenance and ongoing support",
  "Reasonable routine content updates for websites managed by AJH Digital, subject to reasonable use",
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
  ["What is included in the $999 setup fee?", "The standard setup covers strategy, content structure, custom design, responsive development, forms, foundational SEO setup, and launch support for a typical marketing or content-driven website. The final proposal confirms the exact page count and scope."],
  ["What does the $149/month cover?", "For websites hosted and managed by AJH Digital, it covers managed hosting, SSL, routine maintenance, website care, ongoing support, and reasonable routine content updates under the applicable management plan. This does not apply to websites that are built and handed off to a client or managed elsewhere. Update requests are evaluated case by case based on frequency, complexity, turnaround, and scope. Substantial redesigns, new functionality, large content additions, or unusually heavy request volume may require an additional charge, which will be discussed before the work begins."],
  ["Can my price be higher or lower?", "Yes. $999 setup and $149/month are base starting prices, not guaranteed quotes. New-project pricing may increase or decrease depending on what the project requires. Simpler projects may cost less; more extensive content, integrations, functionality, or ongoing support may cost more. Your final scope and pricing will be confirmed in writing before work begins."],
  ["Are there contracts?", "Every accepted project uses a written proposal and service agreement so scope, responsibilities, pricing, and ongoing service terms are clear before work begins."],
  ["Can you redesign an existing website?", "Yes. Select Website Redesign and share your current URL. I’ll review what should be kept, improved, rebuilt, or migrated."],
  ["Can you build custom functionality?", "Possibly. Database, e-commerce, CRM, API, and app-like projects are considered according to their scale, scope, and complexity. Share what you need so I can determine whether it is a good fit."],
  ["Do you only work with churches?", "No. AJH Digital builds for businesses, entrepreneurs, nonprofits, professional services, real estate professionals, churches, ministries, community organizations, and others who need a clear, effective website."],
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
      { "@type": "UnitPriceSpecification", price: "999", priceCurrency: "USD", name: "Website setup starting price" },
      { "@type": "UnitPriceSpecification", price: "149", priceCurrency: "USD", unitText: "MONTH", name: "Website care and hosting starting price" },
    ],
  },
};

export default async function PricingPage({searchParams}:{searchParams:Promise<{service?:string}>}) {
  const activeProjectServices=await getPublicServices();
  const selected=(await searchParams).service;
  const initialService=activeProjectServices.some(s=>s.id===selected)?selected:undefined;
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
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/75 sm:text-xl">Professional websites designed, built, hosted, and supported by AJH Digital—with a clear starting point and room to shape the project around what you actually need.</p>
            <a href="#build-your-project" className="mt-9 inline-flex items-center gap-2 rounded-full bg-cta px-7 py-4 font-semibold text-cta-foreground transition-colors hover:bg-cta-hover">Request a Project <ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
          <div className="rounded-3xl border border-background/15 bg-background/[0.06] p-7 backdrop-blur-sm sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-background/60">Website projects start here</p>
            <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
              <div><span className="font-display text-5xl text-background sm:text-6xl">$999+</span><span className="ml-2 text-background/65">setup</span></div>
              <span className="pb-2 font-display text-3xl text-accent">+</span>
              <div><span className="font-display text-5xl text-background sm:text-6xl">$149+</span><span className="ml-2 text-background/65">/month</span></div>
            </div>
            <p className="mt-6 border-t border-background/15 pt-6 text-sm leading-relaxed text-background/70">$999 setup and $149/month are starting points, not guaranteed quotes. Final pricing may increase or decrease depending on scope, size, complexity, integrations, custom functionality, content requirements, ongoing management, or other project needs. Simpler projects may cost less; more involved projects may cost more. Your final scope and pricing will be confirmed before work begins.</p>
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
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-text"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
            </ul>
            <p className="mt-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed text-text">
              Routine updates apply only to websites hosted and managed by AJH Digital—not
              websites built and handed off to a client or managed elsewhere. Updates are subject
              to reasonable use and evaluated case by case. Substantial redesigns, new features,
              large content additions, or unusually heavy request volume may require an additional
              charge, which will be discussed before the work begins.
            </p>
          </div>
        </Container>
      </section>

      <WebsiteLevels seoPrice={activeProjectServices.find(s=>s.id==="content-seo")?.monthlyPrice}/>
      <ContentRefreshOffer service={activeProjectServices.find(s=>s.id==="website-content-refresh")}/>
      <div className="mx-auto max-w-6xl px-6 py-5 text-sm">Full setup payment is required before work begins. <Link href="/refund-policy" className="underline">Review setup, monthly and annual refund rules</Link>.</div>
      <ProjectBuilder key={initialService??"default"} initialService={initialService} services={activeProjectServices} />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">How It Works</p><h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">From selections to a clear project plan.</h2></div>
          <ol className="mt-12 grid gap-5 md:grid-cols-5">{steps.map(([number, title, description]) => <li key={number} className="border-t border-border pt-5"><span className="font-display text-3xl text-primary/35">{number}</span><h3 className="mt-4 font-display text-xl text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{description}</p></li>)}</ol>
        </Container>
      </section>

      <section className="border-y border-border bg-sand/50 py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-surface p-6"><CircleDollarSign className="size-6 text-primary" /><h2 className="mt-5 font-display text-xl text-ink">Starting prices stay clear.</h2><p className="mt-2 text-sm leading-relaxed text-muted">$999 setup and $149/month are the base starting point. Final pricing may be higher or lower based on your project’s requirements and is confirmed before work begins. Existing clients retain their agreed pricing unless changed by agreement.</p></div>
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
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Ready to Start?</p><h2 className="mt-3 max-w-2xl text-balance font-display text-3xl text-background sm:text-4xl">Build your project and send everything in one clear request.</h2></div><a href="#build-your-project" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cta px-7 py-4 font-semibold text-cta-foreground hover:bg-cta-hover">Request a Project <MessageCircle className="size-4" /></a></Container>
      </section>
    </>
  );
}
