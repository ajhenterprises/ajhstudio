export const projectTypes = [
  "New Website",
  "Website Redesign",
  "Website Hosting / Maintenance",
  "Copywriting",
  "Content",
  "Something Else",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export type ContactFormData = {
  name: string;
  email: string;
  organization: string;
  website: string;
  projectType: ProjectType | "";
  message: string;
  // Honeypot field — should always be empty when submitted by a human.
  company: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.projectType) {
    errors.projectType = "Please select what you need help with.";
  }

  if (!data.message.trim()) {
    errors.message = "Please add a short message so we know what you need.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Please add a little more detail so we can help.";
  }

  return errors;
}
