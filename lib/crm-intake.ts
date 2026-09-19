import {normalizeWebsiteScope,websitePricing} from "./website-pricing";
import "server-only";
import type {ProjectService} from "./data/pricing-services";
import { createHash, createHmac } from "node:crypto";
import type { ProjectInquiryData } from "./project-inquiry";
import { calculateProjectEstimate } from "./project-inquiry";
type Receipt = { id:string; projectId:string; clientId:string; notificationStatus:string };
function connection() {
 const url=process.env.CRM_SUPABASE_URL;
 const key=process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
 const owner=process.env.CRM_OWNER_ID;
 if(!url||!key||!owner) throw new Error("CRM intake is not configured");
 return {url,key,owner};
}
export async function saveProjectInquiry(data: ProjectInquiryData, request: Request, catalog:ProjectService[]): Promise<Receipt> {
 const {url,key,owner}=connection();
 const submission={...data,email:data.email.trim().toLowerCase(),selectedServiceIds:[...new Set(data.selectedServiceIds)].sort()};
 const estimate=calculateProjectEstimate(submission.selectedServiceIds,submission.websiteScope,catalog,submission.contentRefresh);
 const scope=normalizeWebsiteScope(submission.websiteScope);
 const pricing=estimate.website?{version:"2026-09",clientCategory:scope.category,...websitePricing(scope)}:null;
 const fingerprint=createHash("sha256").update(owner+JSON.stringify(submission)).digest("hex");
 // Vercel replaces this header; do not trust arbitrary client forwarding headers.
 const source=request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()||"unknown";
 const sourceHash=createHmac("sha256",key).update(source).digest("hex");
 const result=await fetch(`${url}/rest/v1/rpc/receive_project_inquiry`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({owner_id:owner,submission:{...submission,websitePricing:pricing,contentRefreshEstimate:estimate.contentRefresh,annualEstimate:estimate.annualTotal},selected_services:estimate.services,setup_total:estimate.oneTimeTotal,monthly_total:estimate.monthlyTotal,request_fingerprint:fingerprint,source_fingerprint:sourceHash}),cache:"no-store",signal:AbortSignal.timeout(15000)});
 if(!result.ok) { const detail=await result.json().catch(()=>({})); throw new Error(detail.code==="P0002"?"RATE_LIMIT":"CRM storage failed"); }
 const receipt=await result.json();
 if(!receipt.id||!receipt.projectId) throw new Error("Invalid CRM response");
 return receipt;
}
export async function recordInquiryNotification(id:string,status:"sent"|"failed",emailId?:string) {
 const {url,key}=connection();
 const response=await fetch(`${url}/rest/v1/project_inquiries?id=eq.${encodeURIComponent(id)}`,{method:"PATCH",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({notification_status:status,notification_id:emailId||null}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok) throw new Error("Could not update inquiry notification status");
}

export type StoredInquiry = {
  id: string;
  created_at: string;
  notification_status: string;
  payload: ProjectInquiryData;
  services: ReturnType<typeof calculateProjectEstimate>["services"];
  setup_estimate: number;
  monthly_estimate: number;
};

// With an admin token, PostgREST applies the existing owner-scoped RLS policies.
export async function readStoredInquiry(id: string, authorization?: string): Promise<StoredInquiry> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw new Error("Invalid inquiry");
  const { url, key } = connection();
  const headers = { apikey: key, Authorization: authorization || `Bearer ${key}` };
  if (authorization) {
    const access = await fetch(`${url}/rest/v1/rpc/is_crm_admin`, {
      method: "POST", headers: { ...headers, "Content-Type": "application/json" },
      body: "{}", cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    if (!access.ok || await access.json() !== true) throw new Error("Access denied");
  }
  const response = await fetch(`${url}/rest/v1/project_inquiries?id=eq.${id}&select=id,created_at,notification_status,payload,services,setup_estimate,monthly_estimate`, {
    headers, cache: "no-store", signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Inquiry unavailable");
  const rows = await response.json() as StoredInquiry[];
  if (rows.length !== 1) throw new Error("Inquiry unavailable");
  return rows[0];
}
