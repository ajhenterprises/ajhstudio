import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[720px] px-6 sm:px-8">
          <div className="prose-ajh">
            <p>
              This page is a placeholder. Replace it with a privacy policy that accurately
              describes how {siteConfig.legalName} collects, uses, and protects information —
              including data submitted through the contact form on this site.
            </p>
            <p>
              At minimum, a complete policy should cover what information is collected (such as
              name, email address, and message content submitted via the contact form), how it is
              used, whether it is shared with third parties (such as the email delivery provider
              used to send form submissions), and how visitors can request that their information
              be removed.
            </p>
            <p>
              Last updated: this placeholder has not yet been reviewed by counsel and should not
              be relied on as a complete or accurate policy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
