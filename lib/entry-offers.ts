import type { ProjectService } from "./data/pricing-services";
export const churchPlans = [
 { id: "church-essential", name: "Essential", setup: 99, monthly: 25, badge: "Best Monthly Value" },
 { id: "church-simple-start", name: "Simple Start", setup: 0, monthly: 49, badge: "$0 Upfront / Most Popular" },
] as const;
export const smallBusinessPlans = [
 { id: "small-business-essential", name: "Essential", setup: 199, monthly: 49, badge: "Lower Monthly Price" },
 { id: "small-business-simple-start", name: "Simple Start", setup: 0, monthly: 99, badge: "No Setup Fee" },
] as const;
export const managedWebsitePlans = [...churchPlans, ...smallBusinessPlans];
export function managedWebsitePlan(ids: string[]) { return managedWebsitePlans.find(p => ids.includes(p.id)); }
export const refreshPricing = { base: 99, included: 5, additional: 55, maximum: 10 } as const;
export const entryServices: ProjectService[] = [
 ...churchPlans.map((p, i): ProjectService => ({id:p.id,name:`Church & Ministry Website — ${p.name}`,shortDescription:"Professionally built church/ministry website, hosting, maintenance and reasonable routine content updates. Same core service on both plans. Month-to-month; cancel anytime.",category:"Websites",pricingType:"mixed",oneTimePrice:p.setup,monthlyPrice:p.monthly,projectType:"church_websites",priceNote:`$${p.setup} setup + $${p.monthly}/month`,active:true,displayOrder:i,icon:"church"})),
 ...smallBusinessPlans.map((p, i): ProjectService => ({id:p.id,name:`Small Business Website — ${p.name}`,shortDescription:"Professionally designed standard small business website with hosting and ongoing management. No long-term contract; cancel anytime. Custom development, integrations, e-commerce, booking and third-party services are quoted separately.",category:"Websites",pricingType:"mixed",oneTimePrice:p.setup,monthlyPrice:p.monthly,projectType:"business_websites",priceNote:`$${p.setup} setup + $${p.monthly}/month`,active:true,displayOrder:i+2,icon:"globe"})),
 {id:"website-content-refresh",name:"Website Content Refresh",shortDescription:"Refresh existing website content with clearer messaging, stronger calls-to-action, better readability, organization and content-level SEO. Content only; redesign and development require a separate quote.",category:"Content & Marketing",pricingType:"one-time",oneTimePrice:99,includedPages:5,additionalPagePrice:55,projectType:"content",active:true,displayOrder:4,icon:"pen",priceNote:"$99 for up to 5 pages; $55 per additional page, up to 10 total. Larger projects receive a custom quote."}
];
export const churchFields = [
 ["location","Church location"],["existingDomain","Existing domain"],["desiredDomain","Desired domain"],["serviceTimes","Service times"],["pages","Approximate pages needed"],["branding","Existing logo / branding (link or description)"],["churchPlatform","Planning Center or other church platform"],["givingPlatform","Giving platform"],["sermonPlatform","Sermon platform"],["socialMedia","Social media links"],["additionalNeeds","Additional needs"]
] as const;
export type ChurchDetails = Partial<Record<typeof churchFields[number][0], string>>;
export function normalizeChurchDetails(value:unknown):ChurchDetails {
 const v=value && typeof value === "object" ? value as Record<string,unknown> : {};
 return Object.fromEntries(churchFields.map(([key])=>[key,typeof v[key]==="string"?(v[key] as string).trim().slice(0,2000):""]));
}
