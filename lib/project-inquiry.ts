import { activeProjectServices } from "@/lib/data/pricing-services";

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
  return errors;
}
export function getSelectedServices(ids: string[]) {
  const uniqueIds = new Set(ids);
  return activeProjectServices.filter((service) => uniqueIds.has(service.id));
}

export function calculateProjectEstimate(ids: string[]) {
  const services = getSelectedServices(ids);
  return {
    services,
    oneTimeTotal: services.reduce((total, service) => total + (service.oneTimePrice ?? 0), 0),
    monthlyTotal: services.reduce((total, service) => total + (service.monthlyPrice ?? 0), 0),
    customServices: services.filter((service) => service.customPricing),
  };
}
