"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import {
  submitPropertyContact,
  type PropertyContactState,
} from "@/lib/actions/propertyContact";

const initialState: PropertyContactState = { ok: false, error: null };

const underlineInput =
  "w-full border-0 border-b border-[#c5cad6] bg-transparent px-0 py-2.5 text-sm text-[#000759] outline-none ring-0 placeholder:text-[#000759]/45 focus:border-[#000759]";

type PropertyDetailContactFormProps = {
  listingCode: string;
  listingTitle: string;
  agentId: string | null;
  price: string;
  propertyType: string;
  contractType: string;
  city: string;
};

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#000759]">
      {children}
      {required ? <span className="text-red-600"> *</span> : null}
    </span>
  );
}

export default function PropertyDetailContactForm({
  listingCode,
  listingTitle,
  agentId,
  price,
  propertyType,
  contractType,
  city,
}: PropertyDetailContactFormProps) {
  const [state, setState] = useState<PropertyContactState>(initialState);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitPropertyContact(state, formData);
      setState(result);
      if (result.ok) {
        formRef.current?.reset();
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-6">
      <p className="text-[11px] font-semibold tracking-wide text-[#000759]">
        <span className="text-red-600">*</span> REQUIRED FIELD
      </p>

      <label htmlFor="property-contact-website" className="sr-only">
        Leave this field empty
      </label>
      <input
        id="property-contact-website"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
      />

      <input type="hidden" name="listingCode" value={listingCode} />
      <input type="hidden" name="listingTitle" value={listingTitle} />
      {agentId ? <input type="hidden" name="agentId" value={agentId} /> : null}
      <input type="hidden" name="price" value={price} />
      <input type="hidden" name="propertyType" value={propertyType} />
      <input type="hidden" name="contractType" value={contractType} />
      <input type="hidden" name="city" value={city} />

      <div className="mt-5 space-y-5">
        <label className="block">
          <FieldLabel required>First name</FieldLabel>
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            maxLength={80}
            placeholder="Please enter your first name"
            className={underlineInput}
          />
        </label>

        <label className="block">
          <FieldLabel required>Last name</FieldLabel>
          <input
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            maxLength={80}
            placeholder="Please enter your last name"
            className={underlineInput}
          />
        </label>

        <label className="block">
          <FieldLabel required>Email</FieldLabel>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="Email Address"
            className={underlineInput}
          />
        </label>

        <label className="block">
          <FieldLabel>Phone</FieldLabel>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder="Contact Phone"
            className={underlineInput}
          />
        </label>

        <label className="block">
          <FieldLabel>Company</FieldLabel>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder="Company"
            className={underlineInput}
          />
        </label>

        <label className="block">
          <FieldLabel required>Message</FieldLabel>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={4000}
            placeholder="Message"
            className="mt-1 w-full resize-y border border-[#d9dce5] bg-white px-3 py-2.5 text-sm text-[#000759] outline-none placeholder:text-[#000759]/45 focus:border-[#000759] focus:ring-1 focus:ring-[#000759]/20"
          />
        </label>
      </div>

      <ContactConsent />

      {state.error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      <ContactSubmit pending={pending} success={state.ok} />
    </form>
  );
}

function ContactConsent() {
  return (
    <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#000759]/85">
      <label className="flex cursor-pointer gap-3">
        <input
          name="consentRequired"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-[#c5cad6] text-[#000759] focus:ring-[#000759]"
        />
        <span>
          I agree that my information may be used to respond to this enquiry in
          line with the{" "}
          <a
            href="#"
            className="font-medium text-[#23408e] underline underline-offset-2"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="font-medium text-[#23408e] underline underline-offset-2"
          >
            Privacy Policy
          </a>
          . <span className="text-red-600">(Required) *</span>
        </span>
      </label>

      <label className="flex cursor-pointer gap-3">
        <input
          name="consentMarketing"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-[#c5cad6] text-[#000759] focus:ring-[#000759]"
        />
        <span>
          I would like to receive marketing communications by email.{" "}
          <span className="text-[#000759]/55">(Optional)</span>
        </span>
      </label>
    </div>
  );
}

function ContactSubmit({
  pending,
  success,
}: {
  pending: boolean;
  success: boolean;
}) {
  return (
    <div className="mt-8 space-y-4">
      {success ? (
        <ContactSuccess />
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#000759] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1d3575] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Submitting…" : "Submit"}
      </button>
    </div>
  );
}

function ContactSuccess() {
  return (
    <div
      className="flex items-center gap-3 border border-[#d9dce5] bg-[#f8fafc] px-4 py-3"
      role="status"
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
        aria-hidden
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <span className="text-sm font-semibold text-[#000759]">Success!</span>
        <Image
          src="/REMAX Commercial Logo.png"
          alt="RE/MAX Commercial"
          width={100}
          height={24}
          className="h-5 w-auto shrink-0 object-contain"
        />
      </div>
    </div>
  );
}
