import "server-only";
import {entryServices} from "./entry-offers";
import {serviceProjectTypes} from "./service-project-types";
import {activeProjectServices,type ProjectService} from "./data/pricing-services";
export async function getPublicServices():Promise<ProjectService[]> {
 const url=process.env.CRM_SUPABASE_URL,key=process.env.CRM_SUPABASE_SERVICE_ROLE_KEY,owner=process.env.CRM_OWNER_ID;
 if(!url||!key||!owner) throw new Error("Service catalog configuration unavailable");
 const response=await fetch(`${url}/rest/v1/billing_services?owner_id=eq.${encodeURIComponent(owner)}&select=id,name,description,amount,interval,active,website_visible,website_key,website_category,included_pages,additional_page_price,project_type`,{headers:{apikey:key,Authorization:`Bearer ${key}`},cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new Error("Service catalog unavailable");
 const rows=await response.json() as {id:string;project_type:string;name:string;description:string;amount:number;interval:string;active:boolean;website_visible:boolean;website_key:string|null;website_category:ProjectService['category'];included_pages:number|null;additional_page_price:number|null}[];
 const linked=new Set(rows.map(r=>r.website_key).filter(Boolean));
 const offerIds=new Set(entryServices.map(s=>s.id));
 return [...entryServices,...activeProjectServices.filter(s=>!linked.has(s.id)&&!offerIds.has(s.id)).map(s=>({...s,projectType:serviceProjectTypes[s.id]??"other"})),...rows.filter(r=>r.active&&r.website_visible&&!offerIds.has(r.website_key??"")).map((r,i):ProjectService=>({id:r.website_key||`catalog-${r.id}`,projectType:r.project_type,name:r.name,shortDescription:r.description,category:r.website_category,pricingType:r.interval==='monthly'?'monthly':'one-time',...(r.interval==='monthly'?{monthlyPrice:Number(r.amount)}:r.interval==='annual'?{annualPrice:Number(r.amount)}:{oneTimePrice:Number(r.amount)}),includedPages:r.included_pages??undefined,additionalPagePrice:r.additional_page_price==null?undefined:Number(r.additional_page_price),active:true,displayOrder:100+i,icon:r.website_key==='website-content-refresh'?'pen':'file'}))].sort((a,b)=>a.displayOrder-b.displayOrder);
}
