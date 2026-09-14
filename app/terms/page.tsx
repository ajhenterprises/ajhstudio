import { withBrandMetadata } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = withBrandMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the AJH Digital website.",
  alternates: { canonical: "/terms" },
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that govern your use of the AJH Digital website."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[760px] px-6 sm:px-8">
          <div className="prose-ajh">
            <p><strong>Effective date:</strong> September 14, 2026</p>
            <p>
              These Terms of Service (“Terms”) govern your access to and use of{" "}
              <a href={siteConfig.url}>{siteConfig.url.replace("https://www.", "")}</a>, operated
              by {siteConfig.legalName} (“AJH Digital,” “we,” “us,” or “our”). By using this
              website, you agree to these Terms. If you do not agree, please do not use the site.
            </p>

            <h2>Website information only</h2>
            <p>
              The public website introduces AJH Digital, describes available services and
              products, publishes educational content, and allows visitors to make inquiries.
              Website content is general information and is not legal, tax, financial, medical,
              brokerage, or other professional advice. See our{" "}
              <Link href="/disclaimer">Disclaimer</Link> for additional details.
            </p>

            <h2>Project inquiries and estimates</h2>
            <p>
              Submitting a contact form, project request, or service selection does not create a
              client relationship, obligate either party, reserve availability, or constitute an
              accepted contract. Displayed prices and calculated totals are starting estimates,
              not guaranteed quotes. Pricing, availability, deliverables, timelines, and scope are
              confirmed in a written proposal or service agreement before work begins.
            </p>

            <h2>Client services and separate agreements</h2>
            <p>
              Website design, development, hosting, care, content, consulting, and other client
              services are governed by the proposal, agreement, statement of work, invoice, or
              other written terms accepted for that project. If those project-specific terms
              conflict with these website Terms, the project-specific terms control for that
              engagement.
            </p>

            <h2>Pricing and third-party costs</h2>
            <p>
              Public prices are base starting prices and may change with or without notice.
              Domains, premium software, plugins, stock media, email platforms, APIs, IDX or MLS
              services, advertising, payment-processing fees, and other third-party products are
              not included unless a written proposal says otherwise. Such costs may be billed
              separately or passed through to the client.
            </p>

            <h2>Managed website updates</h2>
            <p>
              Any advertised unlimited-update benefit applies only to websites actively hosted
              and managed by AJH Digital and is subject to reasonable use. It does not apply
              to websites built and handed off to a client or managed elsewhere. Requests are
              evaluated case by case. Redesigns, new functionality, large content additions,
              urgent or unusually frequent work, or work outside the managed website may require
              separate scope, scheduling, and charges disclosed before that additional work begins.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Unless otherwise stated, the website and its original design, text, graphics,
              branding, downloads, and other content are owned by or licensed to AJH Digital
              and are protected by applicable intellectual-property laws. You may view and share
              links to public pages for personal, noncommercial purposes. You may not copy,
              republish, sell, scrape, frame, distribute, modify, or create derivative works from
              site content without written permission or another lawful basis.
            </p>

            <h2>Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the site unlawfully, fraudulently, or to infringe another person&apos;s rights.</li>
              <li>Attempt unauthorized access to the site, accounts, servers, or connected systems.</li>
              <li>Introduce malware, overload the site, bypass security, or interfere with operation.</li>
              <li>Submit false, abusive, infringing, confidential, or unlawfully obtained material.</li>
              <li>Use automated tools to harvest information or content where prohibited by law.</li>
            </ul>

            <h2>Third-party websites and services</h2>
            <p>
              Links, integrations, recommendations, or references to third-party websites do not
              make AJH Digital responsible for their content, availability, security,
              practices, pricing, or performance. Your use of a third-party service is governed by
              that provider&apos;s terms. Some links may be affiliate links; see our{" "}
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
            </p>

            <h2>No warranties</h2>
            <p>
              To the fullest extent permitted by law, the public website and its content are
              provided “as is” and “as available,” without warranties of any kind, express or
              implied. We do not guarantee uninterrupted availability, error-free content,
              compatibility, specific business outcomes, search rankings, traffic, sales, leads,
              or results from relying on the site.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, AJH Digital and its owner, contractors,
              and service providers will not be liable for indirect, incidental, special,
              consequential, exemplary, or punitive damages, or for lost profits, revenue, data,
              opportunities, or goodwill arising from use of—or inability to use—the public site.
              Nothing in these Terms excludes liability that cannot legally be excluded.
            </p>

            <h2>Changes and availability</h2>
            <p>
              We may change, suspend, or discontinue any public page, feature, description, or
              price at any time. We may update these Terms by publishing a revised version and
              changing the effective date. Continued use after an update constitutes acceptance
              of the revised Terms.
            </p>

            <h2>Governing law</h2>
            <p>
              These Terms are governed by the laws of the State of Alabama, without regard to
              conflict-of-law rules. Any dispute relating solely to use of this public website
              will be brought in a court of competent jurisdiction in Alabama, unless applicable
              law requires otherwise. Project-specific agreements may contain their own dispute
              terms.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found unenforceable, the remaining provisions
              will remain in effect. A failure to enforce a provision is not a waiver of it.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these Terms may be sent to{" "}
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
