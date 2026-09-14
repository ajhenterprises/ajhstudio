import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How affiliate links and compensated recommendations are disclosed by AJH Enterprises.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Affiliate Disclosure"
        description="How AJH Enterprises handles affiliate links, commissions, and product recommendations."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Affiliate Disclosure" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[760px] px-6 sm:px-8">
          <div className="prose-ajh">
            <p><strong>Effective date:</strong> September 14, 2026</p>
            <p>
              AJH Enterprises believes readers should understand when content may result in
              compensation. Some pages, articles, emails, or social posts may contain affiliate
              links. If you click an affiliate link and make a qualifying purchase or take another
              qualifying action, {siteConfig.legalName} may earn a commission or referral fee at
              no additional cost to you.
            </p>

            <h2>How affiliate links are identified</h2>
            <p>
              Blog posts display an affiliate notice near the top of the article. Where practical,
              individual recommendations or links may also be identified with language such as
              “affiliate link,” “paid link,” “commission may be earned,” or a similar clear notice.
              The disclosure should be read before relying on a recommendation or clicking a link.
            </p>

            <h2>Editorial independence</h2>
            <p>
              Compensation does not guarantee positive coverage. We aim to recommend products,
              tools, or services based on their relevance and usefulness, but every reader should
              independently evaluate whether an offering is appropriate. A recommendation is not a
              warranty, guarantee, or promise of results.
            </p>

            <h2>Prices and third-party terms</h2>
            <p>
              Affiliate commissions generally do not increase the price you pay, but prices,
              availability, promotions, terms, and product details are controlled by the third
              party and may change without notice. AJH Enterprises is not the seller unless
              expressly stated and is not responsible for a third party&apos;s fulfillment,
              billing, returns, support, privacy, or performance.
            </p>

            <h2>Sponsored content and complimentary products</h2>
            <p>
              If content is sponsored or a product or service was provided without charge, we will
              disclose that material relationship in or near the relevant content. Sponsored
              content will not be presented as an independent consumer review without disclosure.
            </p>

            <h2>Amazon and other programs</h2>
            <p>
              AJH Enterprises may participate in affiliate programs operated by Amazon or other
              merchants and platforms. If participation in a program requires additional wording,
              that wording may appear on this page or with the relevant content. References to a
              company or program do not imply ownership, partnership, or endorsement beyond the
              disclosed affiliate relationship.
            </p>

            <h2>Questions</h2>
            <p>
              Questions about a link or relationship may be sent to{" "}
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>. You may also review
              our <Link href="/disclaimer">general Disclaimer</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
