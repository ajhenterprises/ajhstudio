import {normalizeChurchDetails,churchPlan} from "@/lib/entry-offers";
import {normalizeWebsiteScope} from "@/lib/website-pricing";
import { saveProjectInquiry, readStoredInquiry } from "@/lib/crm-intake";
import { siteConfig } from "@/lib/site-config";
import { NextResponse } from "next/server";
import { deliverInquiryNotification } from "@/lib/project-inquiry-email";
import {
  calculateProjectEstimate,
  validateProjectInquiry,
  type ProjectInquiryData,
} from "@/lib/project-inquiry";

import {getPublicServices} from "@/lib/service-catalog";

export const runtime = "nodejs";

function text(value: unknown) {
  return (value ?? "").toString().trim().slice(0, 5000);
}

export async function POST(request: Request) {
  let body: Partial<ProjectInquiryData>;
  try {
    body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
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
    billingTerm: body.billingTerm === "annual" ? "annual" : "monthly",
    websiteScope:normalizeWebsiteScope(body.websiteScope),
    churchDetails:normalizeChurchDetails(body.churchDetails),
    contentRefresh:Array.isArray(body.selectedServiceIds)&&body.selectedServiceIds.includes('website-content-refresh')?{pages:Number(body.contentRefresh?.pages),pageList:text(body.contentRefresh?.pageList),goal:text(body.contentRefresh?.goal),audience:text(body.contentRefresh?.audience),preserve:text(body.contentRefresh?.preserve)}:undefined,
  };

  // Honeypot: silently accept automated submissions without sending email.
  if (data.company) return NextResponse.json({ ok: true });

  const errors = validateProjectInquiry(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  let catalog;
  try {catalog=await getPublicServices();}catch{return NextResponse.json({ok:false,error:"Service prices are temporarily unavailable. Please try again."},{status:503});}
  const plan=churchPlan(data.selectedServiceIds);
  if(plan && catalog.some(s=>data.selectedServiceIds.includes(s.id)&&!s.id.startsWith("church-")&&["website","website_redesign","landing_pages","business_websites","church_websites","nonprofit_websites","real_estate_websites","website_hosting"].includes(s.projectType??""))) return NextResponse.json({ok:false,error:"Church plans include a website and hosting. Request custom website work separately."},{status:422});
  const estimate = calculateProjectEstimate(data.selectedServiceIds,data.websiteScope,catalog,data.contentRefresh);
  if (estimate.services.length !== new Set(data.selectedServiceIds).size) {
    return NextResponse.json({ ok: false, error: "One or more selected services are unavailable." }, { status: 422 });
  }

  let receipt;
  try {
    receipt = await saveProjectInquiry(data, request,catalog);
  } catch (error) {
    const limited = error instanceof Error && error.message === "RATE_LIMIT";
    console.error(limited ? "Project intake rate limited" : "Project intake storage unavailable");
    return NextResponse.json({ok:false,error: limited ? "Too many requests. Please try again later." : `Your request could not be saved. Please try again or email ${siteConfig.email}.`},{status:limited?429:503});
  }
  if (receipt.notificationStatus === "sent") return NextResponse.json({ok:true});

  try {
    await deliverInquiryNotification(await readStoredInquiry(receipt.id));
  } catch {
    // Storage succeeded: never invite a duplicate submission because email failed.
    console.error("Project request saved; email notification remains pending");
  }
  return NextResponse.json({ ok: true });
}
