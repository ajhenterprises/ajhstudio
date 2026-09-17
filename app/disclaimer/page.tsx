import { withBrandMetadata } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = withBrandMetadata({
  title: "Disclaimer",
  description: "Important disclaimers for AJH Digital website content and services.",
  alternates: { canonical: "/disclaimer" },
});

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
            <p><strong>Effective date:</strong> September 17, 2026</p>

            <h2 id="services-continuity" className="scroll-mt-28">Services Disclaimer: website access if AJH Digital closes</h2>
            <p>If AJH Digital permanently ceases business, we will provide each website client with access to a private GitHub repository containing their website source files and project assets held by AJH Digital, so the client can download and retain a copy for continued use or transfer to another provider.</p>
            <p>Access is private to the client and authorized collaborators. A GitHub account may be needed. Once access is provided, the client can open the repository, select <strong>Code → Download ZIP</strong>, and save a copy. Downloading source files does not by itself keep a website online.</p>
            <p>Hosting, domain registrations, email, databases, and third-party integrations may need separate exports, account transfers, subscriptions, or configuration. Third-party software and assets remain subject to their license terms. Passwords, private keys, and other clients’ information will not be included in a shared source-code archive.</p>
            <p>Clients should keep their contact information current and retain their own downloaded backup. Please review this policy before beginning services and raise any questions during onboarding. Project-specific ownership and transfer terms remain governed by the written service agreement; this notice does not record or imply that an existing client has already accepted new terms.</p>
            <p>See <a href="https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives" target="_blank" rel="noopener noreferrer">GitHub’s download instructions</a> for help saving the files.</p>

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
              Some links may be affiliate links, meaning AJH Digital may receive a commission
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

