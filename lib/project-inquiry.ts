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
  billingTerm?: "monthly" | "annual";
  contentRefresh?: {pages:number; pageList:string; goal:string; audience:string; preserve:string};
  contentRefreshEstimate?: {pages:number;includedPages:number;basePrice:number;additionalPagePrice:number;total:number};
  annualEstimate?:number;
  websiteScope?: WebsiteScope;
  websitePricing?: ReturnType<typeof websitePricing> & {version:string;clientCategory:string};
};

export type ProjectInquiryErrors = Partial<Record<keyof ProjectInquiryData, string>>;

export function validateProjectInquiry(data: ProjectInquiryData): ProjectInquiryErrors {
  const errors: ProjectInquiryErrors = {};
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
 const website=services.some(s=>websiteBuildTypes.has(s.projectType??serviceProjectTypes[s.id]??"other"))?websitePricing(normalizeWebsiteScope(scope)):null;
 const service=services.find(s=>s.id==='website-content-refresh');
 const contentRefresh=service?{pages:refresh?.pages||1,includedPages:service.includedPages??5,basePrice:service.oneTimePrice??199,additionalPagePrice:service.additionalPagePrice??50,total:Math.round(((service.oneTimePrice??199)+Math.max(0,(refresh?.pages||1)-(service.includedPages??5))*(service.additionalPagePrice??50))*100)/100}:undefined;
 const extras=services.filter(s=>!website||(!websiteBuildTypes.has(s.projectType??serviceProjectTypes[s.id]??"other")&&s.id!=="website-hosting-care"));
 return {website,services,contentRefresh,
 oneTimeTotal:Math.round(((website?.level.setupMin??0)+extras.reduce((n,s)=>n+(s.id==='website-content-refresh'?contentRefresh!.total:s.oneTimePrice??0),0))*100)/100,
 monthlyTotal:(website?.level.monthlyMin??0)+extras.reduce((n,s)=>n+(s.monthlyPrice??0),0),
 annualTotal:services.reduce((n,s)=>n+(s.annualPrice??0),0),customServices:services.filter(s=>s.customPricing)};
}
