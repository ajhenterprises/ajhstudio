import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AJH Enterprises collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="A clear explanation of the information AJH Enterprises collects and how it is handled."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[760px] px-6 sm:px-8">
          <div className="prose-ajh">
            <p><strong>Effective date:</strong> September 14, 2026</p>
            <p>
              {siteConfig.legalName} (“AJH Enterprises,” “we,” “us,” or “our”) respects your
              privacy. This Privacy Policy explains what information we collect through{" "}
              <a href={siteConfig.url}>{siteConfig.url.replace("https://www.", "")}</a>, how we
              use it, and the choices available to you.
            </p>

            <h2>Information you provide</h2>
            <p>We may collect information you voluntarily submit, including:</p>
            <ul>
              <li>Your name, email address, phone number, and business or organization name.</li>
              <li>Your existing website address and type of business or organization.</li>
              <li>Project details, selected services, budget range, desired timeline, and notes.</li>
              <li>Messages, files, or other information you choose to send us.</li>
            </ul>
            <p>
              Please do not submit passwords, payment-card information, Social Security numbers,
              health information, or other highly sensitive information through a website form.
            </p>

            <h2>Information collected automatically</h2>
            <p>
              When you visit the site, our hosting and security providers may automatically
              receive technical information such as your IP address, browser and device type,
              requested pages, referring page, date and time of access, and diagnostic or
              security logs. This information is used to deliver, secure, maintain, and improve
              the site.
            </p>

            <h2>Cookies and similar technologies</h2>
            <p>
              This site may use cookies or similar browser storage that are necessary for core
              functionality, security, and remembering your cookie-notice preference. AJH
              Enterprises does not currently use advertising cookies on this site. If analytics,
              advertising, or other non-essential tracking is added later, this policy and the
              site&apos;s consent choices will be updated as appropriate.
            </p>
            <p>
              Links to third-party websites—including possible affiliate links—may allow those
              third parties to use their own cookies or tracking technologies. Their practices
              are controlled by their own privacy policies. Learn more in our{" "}
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
            </p>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to questions and project inquiries.</li>
              <li>To evaluate requested services and prepare proposals or agreements.</li>
              <li>To provide, maintain, secure, and improve the website and our services.</li>
              <li>To communicate about an existing or prospective business relationship.</li>
              <li>To prevent spam, fraud, misuse, and security incidents.</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>
            <p>We do not sell your personal information.</p>

            <h2>Service providers and disclosures</h2>
            <p>
              We may share information with service providers that help us operate the site and
              communicate with you, such as website hosting, infrastructure, security, and
              transactional-email providers. Those providers process information for the
              services they supply to us. We may also disclose information when required by law,
              to protect rights or safety, in connection with a business transfer, or with your
              direction or consent.
            </p>

            <h2>Data retention and security</h2>
            <p>
              We retain information only as long as reasonably necessary for the purposes in this
              policy, including responding to inquiries, maintaining business records, resolving
              disputes, and meeting legal obligations. We use reasonable administrative and
              technical safeguards, but no internet transmission or storage system can be
              guaranteed completely secure.
            </p>

            <h2>Your choices and privacy requests</h2>
            <p>
              You may ask to access, correct, or delete personal information you have submitted,
              subject to legal and legitimate business-record requirements. You may also ask a
              privacy question or withdraw consent where consent is the basis for processing.
              Email <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>. We may need to
              verify your identity before completing a request.
            </p>
            <p>
              Your browser may provide controls for cookies and local storage. Blocking essential
              storage may affect certain site features. Because no universal standard is currently
              applied consistently, the site may not respond to every “Do Not Track” signal.
            </p>

            <h2>Children&apos;s privacy</h2>
            <p>
              This business website is not directed to children under 13, and we do not knowingly
              collect personal information from children under 13 through it. Contact us if you
              believe a child submitted personal information so we can review and remove it as
              appropriate.
            </p>

            <h2>Third-party links</h2>
            <p>
              This site may link to services we do not control. We are not responsible for their
              privacy, security, availability, or content. Review the privacy terms of any external
              service before providing information.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as the site, services, or legal requirements change. The
              effective date above identifies the latest published version. Material changes may
              also be highlighted on the site when appropriate.
            </p>

            <h2>Contact</h2>
            <p>
              Questions or requests may be sent to {siteConfig.legalName} at{" "}
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
