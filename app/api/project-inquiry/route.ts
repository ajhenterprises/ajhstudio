import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  calculateProjectEstimate,
  validateProjectInquiry,
  type ProjectInquiryData,
} from "@/lib/project-inquiry";

export const runtime = "nodejs";

function text(value: unknown) {
  return (value ?? "").toString().trim().slice(0, 5000);
}

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
    maximumFractionDigits: 0,
  }).format(value);
}

export async function POST(request: Request) {
  let body: Partial<ProjectInquiryData>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const data: ProjectInquiryData = {
    firstName: text(body.firstName),
    lastName: text(body.lastName),
    organization: text(body.organization),
    email: text(body.email),
    phone: text(body.phone),
    website: text(body.website),
    organizationType: text(body.organizationType),
    projectDescription: text(body.projectDescription),
    timeframe: text(body.timeframe),
    budget: text(body.budget),
    notes: text(body.notes),
    selectedServiceIds: Array.isArray(body.selectedServiceIds)
      ? body.selectedServiceIds.map(text).slice(0, 30)
      : [],
    company: text(body.company),
  };

  // Honeypot: silently accept automated submissions without sending email.
  if (data.company) return NextResponse.json({ ok: true });

  const errors = validateProjectInquiry(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const estimate = calculateProjectEstimate(data.selectedServiceIds);
  if (estimate.services.length !== new Set(data.selectedServiceIds).size) {
    return NextResponse.json({ ok: false, error: "One or more selected services are unavailable." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = "aaron@ajhenterprises.com";
  if (!apiKey || !fromEmail) {
    console.error("Project inquiry email is missing RESEND_API_KEY or CONTACT_FROM_EMAIL.");
    return NextResponse.json({ ok: false, error: "Project requests are temporarily unavailable. Please email aaron@ajhenterprises.com." }, { status: 500 });
  }

  const submittedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Chicago",
  }).format(new Date());
  const serviceRows = estimate.services
    .map((service) => {
      const servicePrice = [
        service.oneTimePrice != null ? `${price(service.oneTimePrice)} one-time` : "",
        service.monthlyPrice != null ? `${price(service.monthlyPrice)}/month` : "",
        service.customPricing ? service.priceNote ?? "Custom pricing" : "",
      ].filter(Boolean).join(" · ");
      return `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #e8dfce;">${escapeHtml(service.name)}</td><td style="padding:8px 0;border-bottom:1px solid #e8dfce;text-align:right;">${escapeHtml(servicePrice)}</td></tr>`;
    })
    .join("");
  const customNames = estimate.customServices.map((service) => service.name).join(", ") || "None";

  const ownerHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#26332f;max-width:720px;margin:auto;">
      <div style="border-top:6px solid #28665b;padding:28px;background:#fffdf8;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b65d35;margin:0;">AJH Enterprises</p>
        <h1 style="font-family:Georgia,serif;color:#17322d;margin:8px 0 2px;">New project request</h1>
        <p style="color:#68716c;margin:0 0 24px;">Submitted ${escapeHtml(submittedAt)} CT</p>
        <h2 style="font-family:Georgia,serif;color:#17322d;">Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(`${data.firstName} ${data.lastName}`)}<br>
        <strong>Business / organization:</strong> ${escapeHtml(data.organization)}<br>
        <strong>Type:</strong> ${escapeHtml(data.organizationType)}<br>
        <strong>Email:</strong> ${escapeHtml(data.email)}<br>
        <strong>Phone:</strong> ${escapeHtml(data.phone || "—")}<br>
        <strong>Existing website:</strong> ${escapeHtml(data.website || "—")}</p>
        <h2 style="font-family:Georgia,serif;color:#17322d;">Selected services</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${serviceRows}</table>
        <div style="margin:20px 0;padding:18px;background:#f7f1e6;border-radius:10px;">
          <strong>One-time estimate:</strong> ${price(estimate.oneTimeTotal)}<br>
          <strong>Monthly estimate:</strong> ${price(estimate.monthlyTotal)}/month<br>
          <strong>Custom-price services:</strong> ${escapeHtml(customNames)}
        </div>
        <h2 style="font-family:Georgia,serif;color:#17322d;">Project details</h2>
        <p><strong>Desired timeframe:</strong> ${escapeHtml(data.timeframe)}<br><strong>Budget:</strong> ${escapeHtml(data.budget || "Not provided")}</p>
        <p><strong>Description</strong><br>${escapeHtml(data.projectDescription).replace(/\n/g, "<br>")}</p>
        <p><strong>Additional notes</strong><br>${escapeHtml(data.notes || "—").replace(/\n/g, "<br>")}</p>
        <p style="font-size:12px;color:#68716c;margin-top:28px;">Displayed amounts are starting estimates. Final scope and pricing must be confirmed before work begins.</p>
      </div>
    </div>`;

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#26332f;max-width:680px;margin:auto;">
      <div style="border-top:6px solid #28665b;padding:28px;background:#fffdf8;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b65d35;margin:0;">AJH Enterprises</p>
        <h1 style="font-family:Georgia,serif;color:#17322d;margin:8px 0 12px;">Thanks for reaching out, ${escapeHtml(data.firstName)}.</h1>
        <p>Your project request has been received. I&apos;ll review your selections and contact you to discuss your project, confirm scope, and provide final pricing.</p>
        <h2 style="font-family:Georgia,serif;color:#17322d;margin-top:28px;">Your selections</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${serviceRows}</table>
        <p style="font-size:12px;color:#68716c;margin-top:24px;">This summary is a starting estimate and is not a contract or guaranteed final price. Third-party costs and custom work are confirmed separately when applicable.</p>
        <p style="margin-top:28px;">Aaron Joseph Hall<br><strong>AJH Enterprises</strong><br><a href="mailto:aaron@ajhenterprises.com" style="color:#28665b;">aaron@ajhenterprises.com</a></p>
      </div>
    </div>`;

  const resend = new Resend(apiKey);
  try {
    const ownerResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New AJH project request — ${data.organization}`,
      html: ownerHtml,
    });
    if (ownerResult.error) throw new Error(ownerResult.error.message);

    // The client confirmation is useful but should never hide a successfully
    // delivered owner notification if their inbox rejects the receipt.
    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      replyTo: "aaron@ajhenterprises.com",
      subject: "We received your AJH Enterprises project request",
      html: customerHtml,
    });
    if (confirmationResult.error) console.error("Project confirmation email failed:", confirmationResult.error);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Project inquiry send failed:", error);
    return NextResponse.json({ ok: false, error: "I couldn’t send your project request. Please try again or email aaron@ajhenterprises.com." }, { status: 502 });
  }
}
