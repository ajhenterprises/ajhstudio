import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[720px] px-6 sm:px-8">
          <div className="prose-ajh">
            <p>
              This page is a placeholder. Replace it with terms of service that reflect how{" "}
              {siteConfig.legalName} actually engages clients — project scope, payment terms,
              revisions, ownership of deliverables, hosting terms, and cancellation policies.
            </p>
            <p>
              Because AJH Enterprises provides ongoing services like hosting and maintenance, consider
              including terms specific to those engagements, separate from one-time project work.
            </p>
            <p>
              Last updated: this placeholder has not yet been reviewed by counsel and should not
              be relied on as complete or legally binding terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
