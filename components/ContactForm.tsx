"use client";

import { useId, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  projectTypes,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/contact";

const initialData: ContactFormData = {
  name: "",
  email: "",
  organization: "",
  website: "",
  projectType: "",
  message: "",
  company: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formId = useId();

  function update<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateContactForm(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setServerError(
          result.error ?? "Something went wrong sending your message. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setData(initialData);
      setErrors({});
    } catch {
      setServerError("Something went wrong sending your message. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-16 text-center"
      >
        <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
        <h3 className="font-display text-2xl text-ink">Message sent.</h3>
        <p className="max-w-sm text-muted">
          Thanks for reaching out. I&apos;ll review your message and get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-primary underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot field — hidden from sighted users, left empty by real people. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          required
          error={errors.name}
          value={data.name}
          onChange={(v) => update("name", v)}
          autoComplete="name"
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          type="email"
          required
          error={errors.email}
          value={data.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
        />
        <Field
          id={`${formId}-organization`}
          label="Business / Organization"
          value={data.organization}
          onChange={(v) => update("organization", v)}
          autoComplete="organization"
        />
        <Field
          id={`${formId}-website`}
          label="Website (optional)"
          value={data.website}
          onChange={(v) => update("website", v)}
          autoComplete="url"
          placeholder="https://"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-projectType`} className="text-sm font-medium text-ink">
          What do you need help with? <span className="text-secondary">*</span>
        </label>
        <select
          id={`${formId}-projectType`}
          name="projectType"
          required
          value={data.projectType}
          onChange={(e) => update("projectType", e.target.value as ContactFormData["projectType"])}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? `${formId}-projectType-error` : undefined}
          className={cn(
            "mt-2 w-full rounded-lg border bg-surface px-4 py-3 text-text outline-none transition-colors",
            errors.projectType ? "border-red-400" : "border-border focus:border-primary"
          )}
        >
          <option value="" disabled>
            Select one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id={`${formId}-projectType-error`} className="mt-1.5 text-sm text-red-600">
            {errors.projectType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="text-sm font-medium text-ink">
          Message <span className="text-secondary">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          placeholder="Tell me a bit about your project or what you need help with."
          className={cn(
            "mt-2 w-full resize-y rounded-lg border bg-surface px-4 py-3 text-text outline-none transition-colors",
            errors.message ? "border-red-400" : "border-border focus:border-primary"
          )}
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && serverError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-cta px-7 py-3.5 text-base font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-secondary">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 w-full rounded-lg border bg-surface px-4 py-3 text-text outline-none transition-colors",
          error ? "border-red-400" : "border-border focus:border-primary"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
