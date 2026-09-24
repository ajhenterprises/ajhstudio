import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Check, Globe, PenLine, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
const pillars = [{icon:Globe,title:"Websites",copy:"A home for your business online"},{icon:PenLine,title:"Content",copy:"The right words for your audience"},{icon:TrendingUp,title:"Digital growth",copy:"Practical steps forward"}];
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-alt">
      <div className="pointer-events-none absolute -right-40 -top-48 size-[700px] rounded-full bg-[radial-gradient(circle,var(--brand-accent),transparent_68%)] opacity-15" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Your next chapter starts online.</p>
          <h1 className="mt-5 text-balance text-[3.25rem] leading-[1.04] sm:text-7xl lg:text-[5.25rem]">{siteConfig.name}</h1>
          <p className="mt-5 max-w-xl text-balance text-2xl font-semibold leading-snug text-ink sm:text-3xl">{siteConfig.tagline}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">Simple websites. Professional results. Affordable monthly pricing. Managed websites for small businesses and churches, plus custom development, content, and personal digital support as your needs grow.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/small-business-websites" size="lg">Small Business Websites</Button>
            <Button href="/church-websites" variant="outline" size="lg">Church & Ministry Websites</Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">
            {["Personal guidance", "Mobile-first design", "Ongoing support"].map(item => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" aria-hidden="true" />{item}</span>)}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-ink p-7 shadow-premium sm:p-9">
          <div className="absolute -right-28 -top-24 size-80 rounded-full border-[40px] border-accent/10" aria-hidden="true" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-accent">Made for your next step</p>
          <p className="relative mt-6 text-3xl font-semibold leading-tight tracking-tight text-white">Look professional.<br />Connect clearly.<br />Grow with confidence.</p>
          <div className="relative mt-8 space-y-1">
            {pillars.map(({icon:Icon,title,copy}) => <div key={title} className="flex items-center gap-4 border-t border-white/15 py-5"><Icon className="size-5 shrink-0 text-accent" aria-hidden="true"/><div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm text-white/70">{copy}</p></div><ArrowUpRight className="ml-auto size-4 text-accent" aria-hidden="true" /></div>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
