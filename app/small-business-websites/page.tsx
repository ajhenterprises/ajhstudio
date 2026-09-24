import Link from "next/link";
import Container from "@/components/ui/Container";
import { withBrandMetadata } from "@/lib/social";
import { smallBusinessPlans } from "@/lib/entry-offers";
export const metadata = withBrandMetadata({
  title: "Small Business Websites",
  description: "Professionally managed small business websites: $49/month + $199 setup or $99/month with no setup fee. Hosting included. No long-term contract. Custom work quoted separately.",
  alternates: { canonical: "/small-business-websites" },
});
const button = "inline-flex justify-center rounded-full bg-cta px-6 py-3 font-semibold text-cta-foreground transition-colors hover:bg-cta-hover";
const included = ["Professionally designed standard small business website", "Mobile-friendly responsive design", "Hosting included", "Ongoing website management included", "No long-term contract", "Cancel anytime"];
export default function SmallBusinessWebsites() {
  return <>
    <section className="bg-ink py-16 text-background sm:py-24"><Container>
      <p className="text-sm font-bold uppercase tracking-[.18em] text-accent">Small Business Websites</p>
      <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-background sm:text-6xl">Simple websites. Professional results. Affordable monthly pricing.</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-background/80">Give your small business a professional home online, with hosting and ongoing website management handled by AJH Digital.</p>
      <p className="mt-7 text-3xl font-semibold">Starting at $49/month + $199 setup</p>
      <p className="mt-3 text-lg">Or $99/month with no setup fee. No long-term contract. Cancel anytime.</p>
      <a href="#plans" className={button + " mt-7"}>Find My Small Business Plan</a>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-background/80">These plans are for standard small business websites. Custom functionality and work outside the standard package are quoted separately.</p>
    </Container></section>
    <section id="plans" className="scroll-mt-28 py-16 sm:py-20"><Container>
      <h2 className="font-display text-3xl text-ink sm:text-4xl">One standard website service. Two payment options.</h2>
      <div className="mt-9 grid gap-6 md:grid-cols-2">{smallBusinessPlans.map((plan, index) => <article key={plan.id} className="flex flex-col rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-9">
        <p className="text-sm font-semibold text-secondary">Plan {index + 1} · {plan.badge}</p><h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
        <p className="mt-5 text-5xl font-semibold text-ink">${plan.monthly}<span className="text-lg font-normal">/month</span></p>
        <p className="mt-3 text-xl font-semibold">{plan.setup ? `$${plan.setup} one-time setup fee` : "$0 setup fee"}</p>
        <ul className="my-7 space-y-3 text-sm">{included.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-primary">✓</span>{item}</li>)}</ul>
        <Link href={`/pricing?service=${plan.id}#project-details`} className={button + " mt-auto"}>Choose {plan.name}</Link>
      </article>)}</div>
      <p className="mt-7 max-w-3xl leading-relaxed text-muted">Choose the lower monthly payment with a one-time setup fee, or choose no setup fee with the higher monthly payment. Both plans include the same standard small business website service. We’ll confirm the pages, content, and agreed scope before work begins.</p>
    </Container></section>
    <section className="bg-surface-alt py-16"><Container>
      <h2 className="font-display text-3xl text-ink">Built for a clear, useful business website</h2>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">Help people understand what you do, learn about your business, and take the next step. A standard website can present your business, services, and contact information in a professional, mobile-friendly format.</p>
      <div className="mt-9 rounded-3xl border border-border bg-surface p-7 sm:p-9"><h2 className="text-2xl font-semibold">Need something more custom?</h2>
        <p className="mt-4 max-w-3xl leading-relaxed">If your website requires custom development, advanced integrations, e-commerce, booking systems, extensive development, third-party services, advanced functionality, or a larger scope, we’ll provide a separate quote based on your needs. That work is outside the standard $49 and $99 monthly website packages.</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">AJH Digital’s higher-end and custom website services remain available for businesses and organizations with more complex requirements. We’ll discuss any additional cost before moving forward.</p>
        <Link href="/pricing?service=business-websites#project-details" className={button + " mt-6"}>Request a Custom Website Quote</Link>
      </div>
    </Container></section>
    <section className="py-16"><Container><h2 className="font-display text-3xl text-ink">A few common questions</h2><div className="mt-8 divide-y divide-border border-y border-border">
      {[
        ["Do I need a long-term contract?", "No. These plans are month-to-month with no long-term contract. A service agreement records your selected plan and agreed scope."],
        ["Can I cancel anytime?", "Yes. You can cancel the recurring service at any time. Cancellation stops future renewals."],
        ["Is hosting included?", "Yes. Both plans include hosting and ongoing website management for your standard small business website."],
        ["Does every business website qualify?", "No. These packages are designed for standard small business websites. Advanced functionality, integrations, e-commerce, booking, third-party services, and work outside the package require a separate quote."],
      ].map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer font-semibold text-ink">{question}</summary><p className="mt-3 max-w-3xl leading-relaxed text-muted">{answer}</p></details>)}
    </div><div className="mt-9 flex flex-wrap gap-4"><a href="#plans" className={button}>Start My Small Business Website</a><Link href="/church-websites" className="rounded-full border border-border px-6 py-3 font-semibold">Explore Church &amp; Ministry Websites</Link></div></Container></section>
  </>;
}
