"use client";
import WebsiteScopeFields from "./WebsiteScopeFields";
import {annualPlan,blankWebsiteScope,normalizeWebsiteScope,type WebsiteScope} from "@/lib/website-pricing";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Minus, X } from "lucide-react";
import ServiceOptionCard from "@/components/pricing/ServiceOptionCard";
import type { ProjectService } from "@/lib/data/pricing-services";
import { serviceCategories } from "@/lib/data/pricing-services";
import {
  calculateProjectEstimate,
  validateProjectInquiry,
  type ProjectInquiryData,
  type ProjectInquiryErrors,
} from "@/lib/project-inquiry";
import { cn } from "@/lib/utils";

const initialSelection = ["website-design-development", "website-hosting-care"];
const initialForm: ProjectInquiryData = {
  firstName: "",
  lastName: "",
  organization: "",
  email: "",
  phone: "",
  website: "",
  organizationType: "",
  projectDescription: "",
  timeframe: "",
  budget: "",
  notes: "",
  selectedServiceIds: initialSelection,
  company: "",
  billingTerm:"monthly",
  websiteScope:blankWebsiteScope,
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function track(name: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", name, detail);
  } else if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push({ event: name, ...detail });
  }
}

export default function ProjectBuilder({ services }: { services: ProjectService[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [form, setForm] = useState<ProjectInquiryData>(initialForm);
  const [errors, setErrors] = useState<ProjectInquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track("pricing_page_viewed");
  }, []);

  const estimate = useMemo(() => calculateProjectEstimate(selectedIds,form.websiteScope), [selectedIds,form.websiteScope]);

  function toggleService(service: ProjectService) {
    setSelectedIds((current) => {
      const removing = current.includes(service.id);
      track(removing ? "service_removed" : "service_selected", {
        service_id: service.id,
        service_name: service.name,
      });
      return removing ? current.filter((id) => id !== service.id) : [...current, service.id];
    });
  }

  function beginInquiry() {
    if (!formStarted) track("inquiry_form_started", { selected_services: selectedIds.length });
    setFormStarted(true);
    setMobileSummaryOpen(false);
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function update<K extends keyof ProjectInquiryData>(key: K, value: ProjectInquiryData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submission = { ...form, selectedServiceIds: selectedIds };
    const nextErrors = validateProjectInquiry(submission);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Your request could not be sent.");
      track("inquiry_submitted", { selected_services: selectedIds.length });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setServerError(error instanceof Error ? error.message : "Your request could not be sent. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section id="build-your-project" className="scroll-mt-28 border-y border-border bg-surface-alt py-20">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Request received</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Thanks for reaching out to AJH Digital.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Your project request has been received. I&apos;ll review your selections and contact you to discuss your project, confirm scope, and provide final pricing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="build-your-project" className="scroll-mt-24 border-y border-border bg-surface-alt py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Build Your Project</p>
          <h2 className="mt-3 text-balance font-display text-3xl text-ink sm:text-4xl lg:text-5xl">Choose what your project needs.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Start with the services you need, add anything else you want to discuss, and send the complete project summary in one inquiry. Nothing here is a checkout or payment.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="space-y-14">
            {serviceCategories.map((category) => {
              const categoryServices = services.filter((service) => service.category === category);
              return (
                <div key={category}>
                  <h3 className="font-display text-2xl text-ink">{category}</h3>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {categoryServices.map((service) => (
                      <ServiceOptionCard
                        key={service.id}
                        service={service}
                        selected={selectedIds.includes(service.id)}
                        onToggle={() => toggleService(service)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <aside aria-label="Project summary — scroll for totals and next step" tabIndex={0} className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] self-start overflow-y-auto rounded-2xl [scrollbar-gutter:stable] focus-visible:outline-2 focus-visible:outline-primary lg:block">
            <ProjectSummary onBillingChange={value=>update("billingTerm",value)} billingTerm={form.billingTerm} scope={form.websiteScope} selectedIds={selectedIds} onRemove={(service) => toggleService(service)} onContinue={beginInquiry} />
          </aside>
        </div>

        {formStarted && (
          <div ref={formRef} className="scroll-mt-28 pt-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
              <form onSubmit={submitInquiry} noValidate className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Tell Me About Your Project</p>
                <h3 className="mt-3 font-display text-3xl text-ink">A few details, then I&apos;ll review everything.</h3>
                <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="project-company">Company</label>
                  <input id="project-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => update("company", e.target.value)} />
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Field label="First name" required value={form.firstName} error={errors.firstName} autoComplete="given-name" onChange={(value) => update("firstName", value)} />
                  <Field label="Last name" required value={form.lastName} error={errors.lastName} autoComplete="family-name" onChange={(value) => update("lastName", value)} />
                  <Field label="Business / organization" required value={form.organization} error={errors.organization} autoComplete="organization" onChange={(value) => update("organization", value)} />
                  <Field label="Email" required type="email" value={form.email} error={errors.email} autoComplete="email" onChange={(value) => update("email", value)} />
                  <Field label="Phone number" type="tel" value={form.phone} autoComplete="tel" onChange={(value) => update("phone", value)} />
                  {(!estimate.website||form.websiteScope?.buildType==="Redesign existing website"||form.websiteScope?.features.includes("migration"))&&<Field label="Existing website URL" type="url" value={form.website} placeholder="https://" autoComplete="url" onChange={(value) => update("website", value)} />}
                  <SelectField label="Type of business / organization" required value={form.organizationType} error={errors.organizationType} onChange={(value) => update("organizationType", value)} options={["Business", "Entrepreneur / personal brand", "Nonprofit", "Church / ministry", "Real estate agent / team", "Brokerage", "Community organization", "Other"]} />
                  <SelectField label="Desired launch timeframe" required value={form.timeframe} error={errors.timeframe} onChange={(value) => update("timeframe", value)} options={["As soon as practical", "Within 1 month", "1–3 months", "3–6 months", "More than 6 months", "I’m flexible / not sure"]} />
                  <SelectField label="Budget range (optional)" value={form.budget} onChange={(value) => update("budget", value)} options={["Under $1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000+", "I’m not sure yet"]} />
                </div>
                {estimate.website&&<WebsiteScopeFields value={normalizeWebsiteScope(form.websiteScope)} onChange={value=>update("websiteScope",value)}/>}
                <label className="mt-6 block text-sm font-semibold">Payment preference<select className="mt-2 w-full rounded-xl border border-border bg-background p-3" value={form.billingTerm??"monthly"} onChange={e=>update("billingTerm",e.target.value==="annual"?"annual":"monthly")}><option value="monthly">Pay monthly</option><option value="annual">Pay yearly upfront — save 15% on monthly plans</option></select><span className="mt-2 block font-normal text-muted">Setup fees are paid separately at full price. Your final quote will confirm all amounts.</span></label>
                <TextArea label="Project description" required value={form.projectDescription} error={errors.projectDescription} placeholder="What are you building, who is it for, and what do you want it to accomplish?" onChange={(value) => update("projectDescription", value)} />
                <TextArea label="Additional notes" value={form.notes} placeholder="Share any helpful details, integrations, content needs, or questions." onChange={(value) => update("notes", value)} />
                {errors.selectedServiceIds && <p className="mt-5 text-sm text-red-700">{errors.selectedServiceIds}</p>}
                {status === "error" && serverError && (
                  <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {serverError}
                  </div>
                )}
                <button type="submit" disabled={status === "submitting"} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-7 py-4 font-semibold text-cta-foreground transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                  {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
                  {status === "submitting" ? "Sending Your Request…" : "Request Your Project"}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-muted">Submitting this request does not obligate you to hire AJH Digital and does not guarantee final pricing.</p>
              </form>
              <div role="region" aria-label="Request summary — scroll for totals" tabIndex={0} className="rounded-2xl focus-visible:outline-2 focus-visible:outline-primary lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto lg:[scrollbar-gutter:stable]">
                <ProjectSummary onBillingChange={value=>update("billingTerm",value)} billingTerm={form.billingTerm} scope={form.websiteScope} selectedIds={selectedIds} onRemove={(service) => toggleService(service)} compact />
              </div>
            </div>
          </div>
        )}
      </div>

      <button type="button" onClick={() => { setMobileSummaryOpen(true); track("project_summary_opened", { selected_services: selectedIds.length }); }} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-4 py-3 text-xs font-semibold whitespace-nowrap text-background shadow-2xl lg:hidden">
        View Project ({selectedIds.length})
        <span className="text-accent">{estimate.website?"Scope estimate":`${money(estimate.oneTimeTotal)} + ${money(estimate.monthlyTotal)}/mo`}</span>
      </button>

      <div role="dialog" aria-modal="true" aria-label="Your project summary" className={cn("fixed inset-0 z-[80] lg:hidden", mobileSummaryOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <button type="button" aria-label="Close project summary" onClick={() => setMobileSummaryOpen(false)} className={cn("absolute inset-0 bg-ink/55 transition-opacity", mobileSummaryOpen ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl transition-transform", mobileSummaryOpen ? "translate-y-0" : "translate-y-full")}>
          <button type="button" onClick={() => setMobileSummaryOpen(false)} aria-label="Close summary" className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-surface-alt text-ink"><X className="size-5" /></button>
          <ProjectSummary onBillingChange={value=>update("billingTerm",value)} billingTerm={form.billingTerm} scope={form.websiteScope} selectedIds={selectedIds} onRemove={(service) => toggleService(service)} onContinue={beginInquiry} />
        </div>
      </div>
    </section>
  );
}

function ProjectSummary({ onBillingChange, billingTerm, scope, selectedIds, onRemove, onContinue, compact = false }: { onBillingChange:(value:"monthly"|"annual")=>void; billingTerm?:"monthly"|"annual"; scope?:WebsiteScope; selectedIds: string[]; onRemove: (service: ProjectService) => void; onContinue?: () => void; compact?: boolean }) {
  const estimate = calculateProjectEstimate(selectedIds,scope);
  return (
    <div className={cn("rounded-2xl border border-border bg-background p-6 shadow-card", compact && "shadow-none")}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Your Project</p>
      <h3 className="mt-2 font-display text-2xl text-ink">Project Summary</h3>
      {estimate.services.length === 0 ? (
        <p className="mt-5 rounded-xl bg-surface-alt p-4 text-sm leading-relaxed text-muted">Select a service to begin building your project.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {estimate.services.map((service) => (
            <li key={service.id} className="flex items-start justify-between gap-3 border-b border-border pb-3 text-sm">
              <span className="font-medium leading-snug text-ink">{service.name}</span>
              <button type="button" onClick={() => onRemove(service)} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted hover:text-secondary" aria-label={`Remove ${service.name}`}>
                <Minus className="size-3" aria-hidden="true" /> Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {estimate.website&&<p className="mt-4 text-sm font-semibold">{estimate.website.level.name} · indicative only</p>}
      <p className="mt-3 text-sm">Full setup payment is required before work begins. <a href="/refund-policy" className="underline" target="_blank" rel="noopener noreferrer">Refund &amp; cancellation rules</a> apply separately to setup, monthly and annual services.</p>
      {selectedIds.includes("content-seo")&&estimate.website&&<p className="mt-3 text-sm">Separate content-level SEO: $249/month, subject to review.</p>}
      <label className="mt-5 block text-sm font-semibold">Payment schedule<select value={billingTerm??"monthly"} onChange={e=>onBillingChange(e.target.value==="annual"?"annual":"monthly")} className="mt-2 w-full rounded-lg border border-border bg-surface p-3"><option value="monthly">Monthly</option><option value="annual">Yearly upfront — save 15%</option></select></label>
      <dl className="mt-6 space-y-3 border-t border-border pt-5">
        <div className="flex items-baseline justify-between gap-4"><dt className="text-sm text-muted">Setup starting range</dt><dd className="font-display text-xl text-ink">{estimate.website?.level.setup??money(estimate.oneTimeTotal)}</dd></div>
        <div className="flex items-baseline justify-between gap-4"><dt className="text-sm text-muted">Website management</dt><dd className="font-display text-xl text-ink">{estimate.website?estimate.website.level.monthly:money(estimate.monthlyTotal)}{estimate.website?.level.id!=="complex"?"/mo":""}</dd></div>
        <div className="flex items-baseline justify-between gap-4"><dt className="text-sm text-muted">{billingTerm==="annual"?"Selected plans / year":"Selected plans / month"}</dt><dd className="font-display text-xl text-ink">{estimate.monthlyTotal===0&&estimate.customServices.length?"Quote required":`${money(billingTerm==="annual"?annualPlan(estimate.monthlyTotal).total:estimate.monthlyTotal)}${estimate.website?"+":""}`}</dd></div>
        {estimate.customServices.length > 0 && <div className="flex items-start justify-between gap-4"><dt className="text-sm text-muted">Custom-price services</dt><dd className="text-right text-sm font-semibold text-ink">{estimate.customServices.length} selected</dd></div>}
      </dl>
      <p className="mt-4 rounded-lg bg-surface-alt p-3 text-sm">{billingTerm==="annual"?"Yearly upfront selected":"Yearly upfront option"}: {estimate.monthlyTotal>0?`${money(annualPlan(estimate.monthlyTotal).total)}/year starting estimate for selected monthly services; save ${money(annualPlan(estimate.monthlyTotal).savings)} per year.`:"Save 15% on your quoted monthly plans."} Setup and third-party fees are separate and not discounted. Custom services are quoted separately.</p>
      <p className="mt-5 text-xs leading-relaxed text-muted">This is a starting estimate, not a guaranteed final price. Final pricing can increase or decrease based on your project’s requirements. Scope, custom work, and third-party costs are confirmed before work begins.</p>
      {onContinue && (
        <button type="button" disabled={selectedIds.length === 0} onClick={onContinue} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-5 py-3.5 font-semibold text-cta-foreground transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-50">
          Continue to Project Request <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function Field({ label, value, onChange, required, error, type = "text", placeholder, autoComplete }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; error?: string; type?: string; placeholder?: string; autoComplete?: string }) {
  const id = `project-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return <label htmlFor={id} className="block text-sm font-semibold text-ink">{label}{required && <span className="text-secondary"> *</span>}<input id={id} type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} className={cn("mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal text-text outline-none transition-colors", error ? "border-red-400" : "border-border focus:border-primary")} />{error && <span className="mt-1.5 block font-normal text-red-700">{error}</span>}</label>;
}

function SelectField({ label, value, onChange, options, required, error }: { label: string; value: string; onChange: (value: string) => void; options: string[]; required?: boolean; error?: string }) {
  const id = `project-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return <label htmlFor={id} className="block text-sm font-semibold text-ink">{label}{required && <span className="text-secondary"> *</span>}<select id={id} required={required} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} className={cn("mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal text-text outline-none transition-colors", error ? "border-red-400" : "border-border focus:border-primary")}><option value="">Select one</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{error && <span className="mt-1.5 block font-normal text-red-700">{error}</span>}</label>;
}

function TextArea({ label, value, onChange, required, error, placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; error?: string; placeholder?: string }) {
  const id = `project-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return <label htmlFor={id} className="mt-6 block text-sm font-semibold text-ink">{label}{required && <span className="text-secondary"> *</span>}<textarea id={id} required={required} rows={5} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} className={cn("mt-2 w-full resize-y rounded-xl border bg-background px-4 py-3 font-normal text-text outline-none transition-colors", error ? "border-red-400" : "border-border focus:border-primary")} />{error && <span className="mt-1.5 block font-normal text-red-700">{error}</span>}</label>;
}
