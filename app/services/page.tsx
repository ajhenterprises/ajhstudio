import EntryOffers from "@/components/sections/EntryOffers";
import {getPublicServices} from "@/lib/service-catalog";
import ContentRefreshOffer from "@/components/pricing/ContentRefreshOffer";
import SeoDisclaimer from "@/components/SeoDisclaimer";
import { withBrandMetadata } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Globe2, PenLine, Search, Compass } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import FinalCta from "@/components/sections/FinalCta";
import { services } from "@/lib/data/services";

export const metadata: Metadata = withBrandMetadata({
  title: "Services",
  description: "Websites, content, SEO, and digital guidance for a clearer, more useful online presence.",
  alternates: { canonical: "/services" },
  openGraph: {title:"Services | AJH Digital",description:"Websites, content, SEO, and personal digital guidance.",url:"/services"},
});
const order=["websites-technology","communication","seo","digital-services"];
const icons={"websites-technology":Globe2,communication:PenLine,seo:Search,"digital-services":Compass};
export default async function ServicesPage(){
 const catalog=await getPublicServices();
 return <>
  <PageHero eyebrow="Built around your next step" title={<>A stronger website.<br/>A clearer message.</>} description="From your first website to the content and care that keep it growing, get practical support from one person who understands your project." breadcrumbs={[{label:"Home",href:"/"},{label:"Services"}]}/>
  <EntryOffers title="Popular Ways to Get Started"/>
  <section className="py-12 sm:py-16">
   <Container>
    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary">How I can help</p><h2 className="mt-3 font-display text-3xl text-ink">Start where you need support.</h2></div><Link href="/pricing#build-your-project" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Explore pricing &amp; build your project <ArrowRight className="size-4"/></Link></div>
    <div className="space-y-6">{order.map((slug,index)=>{const service=services.find(s=>s.slug===slug)!;const Icon=icons[service.slug];return <article id={service.slug} key={service.slug} className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-surface shadow-sm"><div className="grid lg:grid-cols-[0.9fr_1.1fr]"><div className="bg-surface-alt p-7 sm:p-10"><div className="flex items-center justify-between"><span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-6" aria-hidden="true"/></span><span className="font-display text-3xl text-ink/20">0{index+1}</span></div><h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">{service.name}</h2><p className="mt-3 font-medium text-ink">{service.tagline}</p><p className="mt-4 text-sm leading-7 text-muted">{service.longDescription}</p><Link href={service.cta.href??'/contact'} className="mt-6 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover">{service.cta.label}<ArrowRight className="size-4" aria-hidden="true"/></Link></div><div className="p-7 sm:p-10"><h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">Ways I can help</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{service.included.map(item=><li key={item} className="flex items-start gap-2 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-secondary" aria-hidden="true"/>{item}</li>)}</ul>{service.slug==='seo'&&<SeoDisclaimer/>}<details className="mt-7 border-t border-border pt-5"><summary className="cursor-pointer text-sm font-semibold text-ink">Is this a fit for you?</summary><ul className="mt-4 space-y-3 text-sm leading-6 text-muted">{service.whoItsFor.map(item=><li key={item}>{item}</li>)}</ul></details></div></div></article>;})}</div>
   </Container>
  </section>
  <section className="border-y border-border bg-surface-alt py-14 sm:py-20"><Container><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary">Simple from the start</p><h2 className="mt-3 font-display text-3xl text-ink">Clear scope. Personal support.</h2><p className="mt-4 leading-relaxed text-muted">Choose one service or combine what you need. Every project starts with a conversation and a written proposal, so you know what is included before work begins.</p></div><ol className="mt-9 grid gap-6 sm:grid-cols-3">{[['01','Tell me your goals','Share what you’re building, who it serves, and what needs to improve.'],['02','Choose a clear plan','Review the scope, price, and next steps in your proposal.'],['03','Build with confidence','Follow your project, share feedback, and get support along the way.']].map(([number,title,copy])=><li key={number} className="border-t border-border pt-5"><span className="text-sm font-semibold text-secondary">{number}</span><h3 className="mt-3 font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></li>)}</ol><p className="mt-8 max-w-3xl text-sm leading-6 text-muted">My focus is marketing and content-driven websites. Databases, e-commerce, and custom integrations are considered based on scope and complexity. If your project needs a different specialist, I’ll help point you in the right direction.</p></Container></section>
  <ContentRefreshOffer service={catalog.find(s=>s.id==="website-content-refresh")}/>
  <FinalCta title="Let’s find your next step." description="Tell me what you have in mind. I’ll follow up personally with a practical path forward." primaryLabel="Discuss Your Project" primaryHref="/contact"/>
 </>;
}
