import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactForm, type ContactFormData } from "@/lib/contact";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Partial<ContactFormData>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const data: ContactFormData = {
    name: (body.name ?? "").toString(),
    email: (body.email ?? "").toString(),
    organization: (body.organization ?? "").toString(),
    website: (body.website ?? "").toString(),
    projectType: (body.projectType ?? "") as ContactFormData["projectType"],
    message: (body.message ?? "").toString(),
    company: (body.company ?? "").toString(),
  };

  // Honeypot: bots tend to fill every field. If this hidden field has a
  // value, silently pretend the submission succeeded.
  if (data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Contact form is not fully configured. Missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL."
    );
    return NextResponse.json(
      { ok: false, error: "The contact form isn't configured yet. Please email me directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New inquiry from ${data.name}${
    data.organization ? ` (${data.organization})` : ""
  }`;

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #1c231f;">
      <h2 style="margin-bottom: 4px;">New inquiry</h2>
      <p style="color: #6e6a5c; margin-top: 0;">Submitted via ajhenterprises.com contact form</p>
      <table cellpadding="0" cellspacing="0" style="margin-top: 16px;">
        <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Name</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Email</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Organization</td><td>${escapeHtml(data.organization || "—")}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Website</td><td>${escapeHtml(data.website || "—")}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Project Type</td><td>${escapeHtml(data.projectType)}</td></tr>
      </table>
      <p style="font-weight: 600; margin-top: 20px; margin-bottom: 4px;">Message</p>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "I couldn't send your message. Please try again or email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { ok: false, error: "I couldn't send your message. Please try again or email me directly." },
      { status: 500 }
    );
  }
}
