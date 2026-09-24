import {managedWebsitePlan, managedWebsitePlans, type ChurchDetails} from "./entry-offers";
import {serviceProjectTypes,websiteBuildTypes} from "./service-project-types";
import {normalizeWebsiteScope,websitePricing,type WebsiteScope} from "./website-pricing";
import { activeProjectServices, type ProjectService } from "@/lib/data/pricing-services";

export type ProjectInquiryData = {
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  phone: string;
  website: string;
  organizationType: string;
  projectDescription: string;
  timeframe: string;
  budget: string;
  notes: string;
  selectedServiceIds: string[];
  company: string;
  churchDetails?: ChurchDetails;
  selectedPlan?: {id:string;name:string;setup:number;monthly:number};
  billingTerm?: "monthly" | "annual";
  contentRefresh?: {pages:number; pageList:string; goal:string; audience:string; preserve:string};
  contentRefreshEstimate?: {pages:number;includedPages:number;basePrice:number;additionalPagePrice:number;total:number;customQuote:boolean};
  annualEstimate?:number;
  websiteScope?: WebsiteScope;
  websitePricing?: ReturnType<typeof websitePricing> & {version:string;clientCategory:string};
};

export type ProjectInquiryErrors = Partial<Record<keyof ProjectInquiryData, string>>;

export function validateProjectInquiry(data: ProjectInquiryData): ProjectInquiryErrors {
  const errors: ProjectInquiryErrors = {};
  const plan=managedWebsitePlan(data.selectedServiceIds);
  if(managedWebsitePlans.filter(p=>data.selectedServiceIds.includes(p.id)).length>1) errors.selectedServiceIds="Choose one managed website plan.";
  if(plan && data.selectedServiceIds.some(id=>websiteBuildTypes.has(serviceProjectTypes[id]) || id==='website-hosting-care')) errors.selectedServiceIds="Choose a managed website plan or a custom website project, not both. Managed website plans already include hosting.";
  if(plan && data.billingTerm==='annual') errors.billingTerm="Managed website plans are billed monthly.";

  if (data.firstName.trim().length < 2) errors.firstName = "Please enter your first name.";
  if (data.lastName.trim().length < 2) errors.lastName = "Please enter your last name.";
  if (data.organization.trim().length < 2) errors.organization = "Please enter your business or organization.";
  if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (!data.organizationType.trim()) errors.organizationType = "Please select an organization type.";
  if (data.projectDescription.trim().length < 20) errors.projectDescription = "Please share at least a few sentences about your project.";
  if (!data.timeframe.trim()) errors.timeframe = "Please select a desired timeframe.";
  if (data.selectedServiceIds.length === 0) errors.selectedServiceIds = "Select at least one service for your project.";
  if(data.selectedServiceIds.includes("website-content-refresh")){
   const r=data.contentRefresh;
   if(!r||!Number.isInteger(r.pages)||r.pages<1||r.pages>1000||!r.pageList.trim()||!r.goal.trim()||!r.audience.trim()) errors.contentRefresh="Enter 1–1,000 pages, the pages to refresh, your goal and audience.";
   try {const u=new URL(data.website);if(!['http:','https:'].includes(u.protocol))throw 0;}catch{errors.website="Enter a valid website URL beginning with https://.";}
  }
  return errors;
}
export function getSelectedServices(ids:string[],catalog:ProjectService[]=activeProjectServices){const unique=new Set(ids);return catalog.filter(s=>unique.has(s.id));}
export function calculateProjectEstimate(ids:string[],scope?:WebsiteScope,catalog:ProjectService[]=activeProjectServices,refresh?:ProjectInquiryData['contentRefresh']) {
 const services=getSelectedServices(ids,catalog);
 const plan=managedWebsitePlan(ids);
 const website=services.some(s=>!managedWebsitePlans.some(p=>p.id===s.id)&&websiteBuildTypes.has(s.projectType??serviceProjectTypes[s.id]??"other"))?websitePricing(normalizeWebsiteScope(scope)):null;
 const service=services.find(s=>s.id==='website-content-refresh');
 const contentRefresh=service?{pages:refresh?.pages||1,includedPages:service.includedPages??5,basePrice:service.oneTimePrice??99,additionalPagePrice:service.additionalPagePrice??55,customQuote:(refresh?.pages??1)>10,total:(refresh?.pages??1)>10?0:Math.round(((service.oneTimePrice??99)+Math.max(0,(refresh?.pages||1)-(service.includedPages??5))*(service.additionalPagePrice??55))*100)/100}:undefined;
 const extras=services.filter(s=>!website||(!websiteBuildTypes.has(s.projectType??serviceProjectTypes[s.id]??"other")&&s.id!=="website-hosting-care"));
 return {website,services,contentRefresh,plan,
 oneTimeTotal:Math.round(((website?.level.setupMin??0)+extras.reduce((n,s)=>n+(s.id==='website-content-refresh'?(contentRefresh!.customQuote?0:contentRefresh!.total):s.oneTimePrice??0),0))*100)/100,
 monthlyTotal:(website?.level.monthlyMin??0)+extras.reduce((n,s)=>n+(s.monthlyPrice??0),0),
 annualTotal:services.reduce((n,s)=>n+(s.annualPrice??0),0),customServices:services.filter(s=>s.customPricing||(s.id==='website-content-refresh'&&contentRefresh?.customQuote))};
}
