import "server-only";
import {annualPlan} from "./website-pricing";
import { Resend } from "resend";
import brand from "./brand.json";
import { siteConfig } from "./site-config";
import { recordInquiryNotification, type StoredInquiry } from "./crm-intake";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function price(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export async function deliverInquiryNotification(inquiry: StoredInquiry): Promise<boolean> {
  if (inquiry.notification_status === "sent") return true;
  const data = inquiry.payload;
  const receipt = { id: inquiry.id };
  const estimate = {
    services: inquiry.services,
    oneTimeTotal: inquiry.setup_estimate,
    monthlyTotal: inquiry.monthly_estimate,
    customServices: inquiry.services.filter(service => service.customPricing),
  };
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = siteConfig.email;
  try {
    if (!apiKey || !fromEmail) throw new Error("Email configuration unavailable");
  const submittedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Chicago",
  }).format(new Date(inquiry.created_at));
  const serviceRows = estimate.services
    .map((service) => {
      const servicePrice = [
        service.oneTimePrice != null ? `${price(service.oneTimePrice)} one-time` : "",
        service.annualPrice != null ? `${price(service.annualPrice)}/year` : "",
        service.monthlyPrice != null ? `${price(service.monthlyPrice)}/month` : "",
        service.customPricing ? service.priceNote ?? "Custom pricing" : "",
      ].filter(Boolean).join(" · ");
      return `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid ${brand.border};">${escapeHtml(service.name)}</td><td style="padding:8px 0;border-bottom:1px solid ${brand.border};text-align:right;">${escapeHtml(servicePrice)}</td></tr>`;
    })
    .join("");
  const customNames = estimate.customServices.map((service) => service.name).join(", ") || "None";

  const refreshHtml=data.contentRefresh&&data.contentRefreshEstimate?`<h2>Website Content Refresh</h2><p>${data.contentRefreshEstimate.pages} pages · Estimated project price: ${data.contentRefreshEstimate.customQuote?"Custom quote required (more than 10 pages)":price(data.contentRefreshEstimate.total)}. Subject to scope review.</p><p>Pages: ${escapeHtml(data.contentRefresh.pageList)}<br>Goal: ${escapeHtml(data.contentRefresh.goal)}<br>Audience: ${escapeHtml(data.contentRefresh.audience)}<br>Keep this wording: ${escapeHtml(data.contentRefresh.preserve||"Not specified")}</p>`:'';
  const billingHtml = `<p><strong>Payment preference:</strong> ${data.billingTerm === "annual" ? `Yearly upfront — 15% savings on monthly plans. Known recurring estimate: ${price(annualPlan(estimate.monthlyTotal).total)}/year.` : "Monthly"} Setup fees and third-party charges are separate, at full price. Final scope and pricing require review.</p>`;
  const ownerHtml = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:${brand.navy};max-width:720px;margin:auto;">
      <div style="border-top:6px solid ${brand.interactive};padding:28px;background:${brand.background};">
        <img src="${siteConfig.url}${siteConfig.logo.email}" alt="${siteConfig.name}" width="280" style="max-width:100%;height:auto"/><p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${brand.interactive};margin:0;">AJH Digital</p>
        <h1 style="font-family:Inter,Arial,sans-serif;color:${brand.navy};margin:8px 0 2px;">New project request</h1>
        <p style="color:${brand.gray};margin:0 0 24px;">Submitted ${escapeHtml(submittedAt)} CT</p>
        <p><a href="${siteConfig.crmUrl}/inquiries/${receipt.id}">View request in AJH Digital CRM</a></p><h2 style="font-family:Inter,Arial,sans-serif;color:${brand.navy};">Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(`${data.firstName} ${data.lastName}`)}<br>
        <strong>Business / organization:</strong> ${escapeHtml(data.organization)}<br>
        <strong>Type:</strong> ${escapeHtml(data.organizationType)}<br>
        <strong>Email:</strong> ${escapeHtml(data.email)}<br>
        <strong>Phone:</strong> ${escapeHtml(data.phone || "—")}<br>
        <strong>Existing website:</strong> ${escapeHtml(data.website || "—")}</p>
        <h2 style="font-family:Inter,Arial,sans-serif;color:${brand.navy};">Selected services</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${serviceRows}</table>${billingHtml}${refreshHtml}
        <div style="margin:20px 0;padding:18px;background:${brand.surfaceAlt};border-radius:10px;">
          <strong>Setup starting range:</strong> ${data.websitePricing?escapeHtml(data.websitePricing.level.setup):data.contentRefreshEstimate?.customQuote?"Custom quote required":price(estimate.oneTimeTotal)}<br>
          <strong>Monthly starting range:</strong> ${data.websitePricing?escapeHtml(data.websitePricing.level.monthly):price(estimate.monthlyTotal)}<br>
          <strong>Custom-price services:</strong> ${escapeHtml(customNames)}
        </div>
        ${data.websitePricing?`<h2>Website scope — not a final quote</h2><p>Client-selected category: ${escapeHtml(data.websitePricing.clientCategory)}<br>Suggested category: ${escapeHtml(data.websitePricing.suggestion.category)}<br>Setup range: ${escapeHtml(data.websitePricing.level.setup)}<br>Monthly management range: ${escapeHtml(data.websitePricing.level.monthly)}</p><p>${escapeHtml(JSON.stringify(data.websiteScope))}</p>`:''}
        <h2 style="font-family:Inter,Arial,sans-serif;color:${brand.navy};">Project details</h2>
        <p><strong>Desired timeframe:</strong> ${escapeHtml(data.timeframe)}<br><strong>Budget:</strong> ${escapeHtml(data.budget || "Not provided")}</p>
        <p><strong>Description</strong><br>${escapeHtml(data.projectDescription).replace(/\n/g, "<br>")}</p>
        <p><strong>Additional notes</strong><br>${escapeHtml(data.notes || "—").replace(/\n/g, "<br>")}</p>
        <p style="font-size:12px;color:${brand.gray};margin-top:28px;">Displayed amounts are starting estimates. Final pricing may increase or decrease based on the project’s requirements and must be confirmed before work begins.</p>
      </div>
    </div>`;

  const customerHtml = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:${brand.navy};max-width:680px;margin:auto;">
      <div style="border-top:6px solid ${brand.interactive};padding:28px;background:${brand.background};">
        <img src="${siteConfig.url}${siteConfig.logo.email}" alt="${siteConfig.name}" width="280" style="max-width:100%;height:auto"/><p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${brand.interactive};margin:0;">AJH Digital</p>
        <h1 style="font-family:Inter,Arial,sans-serif;color:${brand.navy};margin:8px 0 12px;">Thanks for reaching out, ${escapeHtml(data.firstName)}.</h1>
        <p>Your project request has been received. I&apos;ll review your selections and contact you to discuss your project, confirm scope, and provide final pricing.</p>
        <h2 style="font-family:Inter,Arial,sans-serif;color:${brand.navy};margin-top:28px;">Your selections</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${serviceRows}</table>${billingHtml}${refreshHtml}
        <p style="font-size:12px;color:${brand.gray};margin-top:24px;">This summary is a starting estimate and is not a contract or guaranteed final price. Final pricing may increase or decrease based on the project’s requirements. Third-party costs and custom work are confirmed separately when applicable.</p>
        <p style="margin-top:28px;">Aaron Joseph Hall<br><strong>AJH Digital</strong><br><a href="mailto:${siteConfig.email}" style="color:${brand.interactive};">${siteConfig.email}</a></p>
      </div>
    </div>`;

  const resend = new Resend(apiKey);
    const ownerResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New AJH project request — ${data.organization}`,
      html: ownerHtml,
    }, { idempotencyKey: `project-owner-${receipt.id}` });
    if (ownerResult.error) throw new Error("Owner notification failed");
    await recordInquiryNotification(receipt.id, "sent", ownerResult.data?.id);

    // The client confirmation is useful but should never hide a successfully
    // delivered owner notification if their inbox rejects the receipt.
    try {
    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      replyTo: siteConfig.email,
      subject: "We received your AJH Digital project request",
      html: customerHtml,
    }, { idempotencyKey: `project-confirmation-${receipt.id}` });
    if (confirmationResult.error) console.error("Project confirmation email failed");
    } catch { console.error("Project confirmation email unavailable"); }

    return true;
  } catch (error) {
    void error;
    console.error("Project inquiry saved; notification delivery needs attention");
    await recordInquiryNotification(receipt.id, "failed").catch(() => console.error("Notification status update failed"));
    return false;
  }
}
