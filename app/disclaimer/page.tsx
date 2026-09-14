import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers for AJH Enterprises website content and services.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="Important context about the information, recommendations, and results discussed on this website."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[760px] px-6 sm:px-8">
          <div className="prose-ajh">
            <p><strong>Effective date:</strong> September 14, 2026</p>

            <h2>General information</h2>
            <p>
              Content published by {siteConfig.legalName} is provided for general informational
              and educational purposes. Although we aim to be clear and accurate, information may
              become outdated, contain errors, or not apply to your particular circumstances.
              Nothing on this public website creates a professional or client relationship.
            </p>

            <h2>No professional advice</h2>
            <p>
              Website articles, examples, downloads, recommendations, and other materials are not
              a substitute for legal, tax, accounting, financial, medical, cybersecurity,
              brokerage, or other licensed professional advice. Consult an appropriately qualified
              professional before acting on information where your situation calls for one.
            </p>

            <h2>Technology, marketing, and business results</h2>
            <p>
              Examples and discussions of websites, search visibility, content, marketing,
              technology, business growth, traffic, leads, revenue, or conversions are not
              guarantees. Results depend on many factors outside our control, including your
              market, offer, content, budget, implementation, third-party platforms, algorithms,
              competition, and ongoing effort.
            </p>

            <h2>Testimonials and examples</h2>
            <p>
              Testimonials and portfolio examples reflect individual experiences and projects.
              They do not promise that another client or visitor will receive the same result.
              Project details may be summarized for clarity or privacy.
            </p>

            <h2>External links and third parties</h2>
            <p>
              We may reference or link to third-party tools, websites, products, services, and
              information. A link does not guarantee accuracy, availability, safety, suitability,
              or endorsement of everything offered by that third party. You are responsible for
              reviewing third-party terms, privacy practices, pricing, and suitability before use.
            </p>

            <h2>Affiliate relationships</h2>
            <p>
              Some links may be affiliate links, meaning AJH Enterprises may receive a commission
              if you purchase through them at no additional cost to you. Affiliate relationships
              do not change the price you pay and do not guarantee a product or service is right
              for you. Read the full <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
            </p>

            <h2>Your responsibility</h2>
            <p>
              You are responsible for how you use information from this site and for evaluating
              any product, provider, strategy, or decision for your own needs. To the fullest
              extent allowed by law, you assume the risk of relying on public site content.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this Disclaimer may be sent to{" "}
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
