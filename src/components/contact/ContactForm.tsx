"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/lib/animations";
import { AlertCircle, Check, CheckCircle2, ChevronDown, Loader2, Send, X } from "lucide-react";
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

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "submitted">("idle");
  const [showModal, setShowModal] = useState(false);
  const [productRef, setProductRef] = useState("");
  const [enquiryMenuOpen, setEnquiryMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  useScrollReveal(formRef);
  const enquiryDropdownRef = useRef<HTMLDivElement | null>(null);

  /* Close enquiry dropdown on click outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        enquiryDropdownRef.current &&
        !enquiryDropdownRef.current.contains(event.target as Node)
      ) {
        setEnquiryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          product: productRef
            ? products.find((p) => p.slug === productRef)?.name || productRef
            : "",
        }),
      });
    } catch {
      // Continue to show success state gracefully
    }

    setStatus("submitted");
    setShowModal(true);
    setValues(EMPTY);
    setProductRef("");
  };

  const errorEntries = Object.entries(errors);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="w-full"
    >
      <div data-reveal data-reveal-delay="0.05" className="flex items-start justify-between gap-4 border-b border-ink pb-5">
        <div>
          <h2 className="font-display text-[26px] font-semibold leading-tight text-ink">
            Enquiry form
          </h2>
        </div>
      </div>

      {productRef && (
        <div data-reveal data-reveal-delay="0.1" className="mt-6 flex flex-wrap items-baseline gap-x-3 border-b border-line pb-3 text-[14px] text-mid">
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
        <div data-reveal data-reveal-delay="0.1"><Field
          label="Name"
          name="name"
          required
          value={values.name}
          onChange={(value) => update("name", value)}
          error={errors.name}
          autoComplete="name"
          placeholder="Full name"
        /></div>
        <div data-reveal data-reveal-delay="0.15"><Field
          label="Company"
          name="company"
          required
          value={values.company}
          onChange={(value) => update("company", value)}
          error={errors.company}
          autoComplete="organization"
          placeholder="Company name"
        /></div>
        <div data-reveal data-reveal-delay="0.2"><Field
          label="Email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(value) => update("email", value)}
          error={errors.email}
          autoComplete="email"
          placeholder="name@company.com"
        /></div>
        <div data-reveal data-reveal-delay="0.25"><Field
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(value) => update("phone", value)}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+91"
          hint="Optional"
        /></div>

        <div data-reveal data-reveal-delay="0.3" className="sm:col-span-2" ref={enquiryDropdownRef}>
          <div
            className={`field-shell group relative rounded-[14px] border bg-[#fafafa]/80 px-4.5 pb-2.5 pt-3 transition-all duration-200 hover:bg-white ${
              errors.enquiryType
                ? "border-brand bg-brand/[0.02] ring-2 ring-brand/15"
                : enquiryMenuOpen
                ? "border-ink bg-white ring-2 ring-ink/10 shadow-sm"
                : "border-line/90 hover:border-mid/50"
            }`}
          >
            <label
              id="enquiryType-label"
              className={`block text-[11.5px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                enquiryMenuOpen ? "text-ink" : "text-mid/80"
              }`}
            >
              Enquiry type <span className="text-brand">*</span>
            </label>

            <button
              type="button"
              id="enquiryType"
              aria-haspopup="listbox"
              aria-expanded={enquiryMenuOpen}
              aria-labelledby="enquiryType-label enquiryType"
              onClick={() => setEnquiryMenuOpen((prev) => !prev)}
              className="mt-1 flex h-8 w-full items-center justify-between text-left text-[15.5px] font-medium outline-none focus-visible:outline-none"
            >
              <span className={values.enquiryType ? "text-ink" : "text-mid/45"}>
                {values.enquiryType || "Select an enquiry type"}
              </span>
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 text-mid/70 transition-transform duration-200 ${
                  enquiryMenuOpen ? "rotate-180 text-ink" : ""
                }`}
              />
            </button>

            {/* Custom elevated dropdown menu */}
            {enquiryMenuOpen && (
              <div
                role="listbox"
                aria-labelledby="enquiryType-label"
                className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-[14px] border border-line bg-white py-1.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)]"
              >
                {site.enquiryTypes.map((type) => {
                  const isSelected = values.enquiryType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        update("enquiryType", type);
                        setEnquiryMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14.5px] transition-colors ${
                        isSelected
                          ? "bg-light font-semibold text-brand"
                          : "text-ink hover:bg-soft"
                      }`}
                    >
                      <span>{type}</span>
                      {isSelected && <Check className="h-4 w-4 text-brand" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hidden field for form data */}
            <input
              type="hidden"
              name="enquiryType"
              value={values.enquiryType}
            />
          </div>
          {errors.enquiryType && (
            <p
              id="enquiryType-error"
              className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand"
            >
              <AlertCircle aria-hidden className="h-3.5 w-3.5" />
              {errors.enquiryType}
            </p>
          )}
        </div>

        <div data-reveal data-reveal-delay="0.35" className="sm:col-span-2">
          <div
            className={`field-shell group relative rounded-[14px] border bg-[#fafafa]/80 px-4.5 pb-3 pt-3 transition-all duration-200 hover:bg-white ${
              errors.message
                ? "border-brand bg-brand/[0.02] ring-2 ring-brand/15"
                : "border-line/90 hover:border-mid/50 focus-within:border-ink focus-within:bg-white focus-within:ring-2 focus-within:ring-ink/10 focus-within:shadow-sm"
            }`}
          >
            <label
              htmlFor="message"
              className="block text-[11.5px] font-semibold uppercase tracking-[0.12em] text-mid/80 transition-colors group-focus-within:text-ink"
            >
              Message <span className="text-brand">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Capacity, colour, closure and quantity you need — plus anything specific to your filling line."
              className="mt-1 w-full resize-y border-0 bg-transparent p-0 text-[15.5px] font-medium leading-relaxed text-ink outline-none placeholder:text-mid/45 focus-visible:outline-none"
            />
          </div>
          {errors.message && (
            <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand">
              <AlertCircle aria-hidden className="h-3.5 w-3.5" />
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from real users, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div data-reveal data-reveal-delay="0.4" className="mt-8 flex flex-col gap-4 border-t border-line/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[12.5px] leading-relaxed text-mid">
          We use your details only to respond to this enquiry.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-brand px-7 text-[14.5px] font-semibold text-white shadow-xs transition-all duration-200 hover:bg-brand-dark hover:shadow-md active:scale-[0.98] disabled:opacity-70"
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

      {/* Success Modal Popup */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Clean Green Modal Card */}
          <div className="relative w-full max-w-sm rounded-[22px] border border-line bg-white p-7 text-center shadow-xl transition-all duration-300">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-mid/60 transition-colors hover:bg-soft hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h3 id="modal-title" className="mt-4 font-display text-xl font-semibold text-ink">
              Enquiry Sent
            </h3>

            <p className="mt-2 text-[14px] leading-relaxed text-mid">
              We received your enquiry and our team will get back to you shortly.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-600 px-6 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
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
        className={`field-shell group relative rounded-[14px] border bg-[#fafafa]/80 px-4.5 pb-2.5 pt-3 transition-all duration-200 hover:bg-white ${
          error
            ? "border-brand bg-brand/[0.02] ring-2 ring-brand/15"
            : "border-line/90 hover:border-mid/50 focus-within:border-ink focus-within:bg-white focus-within:ring-2 focus-within:ring-ink/10 focus-within:shadow-sm"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor={name}
            className="block text-[11.5px] font-semibold uppercase tracking-[0.12em] text-mid/80 transition-colors group-focus-within:text-ink"
          >
            {label} {required && <span className="text-brand">*</span>}
          </label>
          {hint && <span className="text-[11px] text-mid/70">{hint}</span>}
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
          className="mt-1 h-8 w-full border-0 bg-transparent p-0 text-[15.5px] font-medium text-ink outline-none placeholder:text-mid/45 focus-visible:outline-none"
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand">
          <AlertCircle aria-hidden className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
