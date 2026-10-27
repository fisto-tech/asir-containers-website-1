"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { site, type EnquiryType } from "@/data/site";
import { products } from "@/data/products";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType | "";
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  enquiryType: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phonePattern = /^[+0-9\s()-]{7,20}$/;

const validate = (values: Fields, productRef: string): Errors => {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number, digits and + only.";
  }
  if (!values.enquiryType) errors.enquiryType = "Select an enquiry type.";
  if (values.message.trim().length < 20) {
    errors.message = "Tell us a little more — at least 20 characters.";
  }
  if (productRef && values.message.trim().length < 20) {
    errors.message = "Add the capacity, colour and quantity you need.";
  }
  return errors;
};

/**
 * Frontend-only enquiry form.
 * Validation, error states and the product reference are live; there is no
 * backend, so submission deliberately reports that nothing was transmitted.
 * To go live: POST `values` to a route handler, Formspree, Resend or your CRM,
 * then replace the `notConnected` state with real success handling.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "notConnected">("idle");
  const [productRef, setProductRef] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  /* Pre-fill the product reference from /contact?product=… */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    if (!slug) return;
    const match = products.find((product) => product.slug === slug);
    if (!match) return;
    setProductRef(match.slug);
    setValues((current) =>
      current.message
        ? current
        : {
            ...current,
            enquiryType: "Product enquiry",
            message: `I’d like details on the ${match.name}. Quantity needed: `,
          },
    );
  }, []);

  const update = (key: keyof Fields, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values, productRef);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      field?.focus();
      return;
    }

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("notConnected");
  };

  const errorEntries = Object.entries(errors);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="w-full"
    >
      <div className="flex items-start justify-between gap-4 border-b border-ink pb-6">
        <div>
          <h2 className="font-display text-[26px] font-semibold leading-tight text-ink">
            Enquiry form
          </h2>
          <p className="mt-2 text-[14px] text-mid">
            Fields marked <span className="text-brand">*</span> are required.
          </p>
        </div>
      </div>

      {productRef && (
        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 border-b border-line pb-3 text-[14px] text-mid">
          <span className="text-[14px] text-mid">
            Product
          </span>
          <span className="text-ink">{products.find((product) => product.slug === productRef)?.name}</span>
          <button
            type="button"
            onClick={() => setProductRef("")}
            className="ml-auto text-[13px] text-mid underline decoration-line underline-offset-4 hover:text-ink"
          >
            Remove
          </button>
        </div>
      )}

      {errorEntries.length > 0 && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-[12px] border border-brand/20 bg-brand/[0.04] px-4 py-3 text-[14px] text-ink"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <p>
            <span className="font-semibold">
              Please check {errorEntries.length} field{errorEntries.length === 1 ? "" : "s"} below.
            </span>{" "}
            <span className="text-mid">Highlighted rows need attention before sending.</span>
          </p>
        </div>
      )}

      <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          value={values.name}
          onChange={(value) => update("name", value)}
          error={errors.name}
          autoComplete="name"
          placeholder="Full name"
        />
        <Field
          label="Company"
          name="company"
          required
          value={values.company}
          onChange={(value) => update("company", value)}
          error={errors.company}
          autoComplete="organization"
          placeholder="Company name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(value) => update("email", value)}
          error={errors.email}
          autoComplete="email"
          placeholder="name@company.com"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(value) => update("phone", value)}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+91"
          hint="Optional"
        />

        <div className="sm:col-span-2">
          <div
            className={`field-shell group rounded-[14px] border bg-white px-4 pb-2.5 pt-3 transition-all duration-300 ${
              errors.enquiryType
                ? "border-brand ring-4 ring-brand/[0.08]"
                : "border-line hover:border-mid/60 focus-within:border-ink focus-within:ring-4 focus-within:ring-ink/[0.06] focus-within:shadow-[inset_2px_0_0_0_#e51827]"
            }`}
          >
            <label
              htmlFor="enquiryType"
              className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mid transition-colors group-focus-within:text-ink"
            >
              Enquiry type <span className="text-brand">*</span>
            </label>
            <div className="relative">
              <select
                id="enquiryType"
                name="enquiryType"
                value={values.enquiryType}
                onChange={(event) => update("enquiryType", event.target.value)}
                aria-invalid={Boolean(errors.enquiryType)}
                aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
                className="mt-0.5 w-full appearance-none border-0 bg-transparent py-1.5 pr-8 text-[15px] text-ink outline-none focus-visible:outline-none"
              >
                <option value="">Select an enquiry type</option>
                {site.enquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-mid transition-colors group-focus-within:text-ink"
              />
            </div>
          </div>
          {errors.enquiryType && (
            <p
              id="enquiryType-error"
              className="mt-1.5 flex items-center gap-1.5 text-[12px] text-brand"
            >
              <AlertCircle aria-hidden className="h-3.5 w-3.5" />
              {errors.enquiryType}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <div
            className={`field-shell group rounded-[14px] border bg-white px-4 pb-3 pt-3 transition-all duration-300 ${
              errors.message
                ? "border-brand ring-4 ring-brand/[0.08]"
                : "border-line hover:border-mid/60 focus-within:border-ink focus-within:ring-4 focus-within:ring-ink/[0.06] focus-within:shadow-[inset_2px_0_0_0_#e51827]"
            }`}
          >
            <label
              htmlFor="message"
              className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mid transition-colors group-focus-within:text-ink"
            >
              Message <span className="text-brand">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : "message-hint"}
              placeholder="Capacity, colour, closure and quantity you need — plus anything specific to your filling line."
              className="mt-1 w-full resize-y border-0 bg-transparent p-0 text-[15px] leading-relaxed text-ink outline-none placeholder:text-mid/70 focus-visible:outline-none"
            />
          </div>
          {errors.message ? (
            <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-[12px] text-brand">
              <AlertCircle aria-hidden className="h-3.5 w-3.5" />
              {errors.message}
            </p>
          ) : (
            <p id="message-hint" className="mt-1.5 text-[12px] text-mid">
              The more detail you give us, the faster we can confirm the container.
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from real users, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[13px] leading-relaxed text-mid">
          We use your details only to respond to this enquiry.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-13 items-center justify-center gap-2 bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking…
            </>
          ) : (
            <>
              Send enquiry
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      {/* Honest submission state: no backend exists in this build */}
      {status === "notConnected" && (
        <div role="status" className="mt-8 border-t border-line pt-5">
          <p className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
            <CheckCircle2 className="h-4 w-4 text-brand" />
            Your details passed validation — but nothing has been sent.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-mid">
            This website is a frontend build with no submission service connected, so the
            enquiry has <strong className="font-semibold text-ink">not</strong> been delivered to
            ASIR Containers. To make the form live, connect{" "}
            <code className="text-[13px] font-medium text-ink">
              src/components/contact/ContactForm.tsx
            </code>{" "}
            to a form endpoint or API route. Until then, please use the direct contact details
            once published.
          </p>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <div
        className={`field-shell group rounded-[14px] border bg-white px-4 pb-2.5 pt-3 transition-all duration-300 ${
          error
            ? "border-brand ring-4 ring-brand/[0.08]"
            : "border-line hover:border-mid/60 focus-within:border-ink focus-within:ring-4 focus-within:ring-ink/[0.06] focus-within:shadow-[inset_2px_0_0_0_#e51827]"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor={name}
            className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mid transition-colors group-focus-within:text-ink"
          >
            {label} {required && <span className="text-brand">*</span>}
          </label>
          {hint && <span className="text-[11px] text-mid">{hint}</span>}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-0.5 h-8 w-full border-0 bg-transparent p-0 text-[15px] text-ink outline-none placeholder:text-mid/70 focus-visible:outline-none"
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-brand">
          <AlertCircle aria-hidden className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
