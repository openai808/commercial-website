"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import {
  submitPropertyContact,
  type PropertyContactState,
} from "@/lib/actions/propertyContact";

const initialState: PropertyContactState = { ok: false, error: null };

const AGENT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80";

const underlineInput =
  "w-full border-0 border-b border-[#c5cad6] bg-transparent px-0 py-2.5 text-sm text-[#000759] outline-none ring-0 placeholder:text-[#000759]/45 focus:border-[#000759]";

type PropertyDetailContactPanelProps = {
  listingCode: string;
  listingTitle: string;
  agentId: string | null;
  price: string;
  propertyType: string;
  contractType: string;
  city: string;
  agentName: string | null;
  agentPosition: string | null;
  agentDepartment: string | null;
  agentLocation: string;
  agentPhone: string | null;
  agentEmail: string | null;
  agentAvatar: string | null;
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

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function PropertyDetailContactPanel({
  listingCode,
  listingTitle,
  agentId,
  price,
  propertyType,
  contractType,
  city,
  agentName,
  agentPosition,
  agentDepartment,
  agentLocation,
  agentPhone,
  agentEmail,
  agentAvatar,
}: PropertyDetailContactPanelProps) {
  const [state, setState] = useState<PropertyContactState>(initialState);
  const [pending, startTransition] = useTransition();
  const [contactRevealed, setContactRevealed] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const contactDialogRef = useRef<HTMLDialogElement>(null);

  const hasAgentContact = Boolean(agentPhone || agentEmail);

  const openContactModal = useCallback(() => {
    setContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
  }, []);

  useEffect(() => {
    if (contactModalOpen) {
      contactDialogRef.current?.showModal();
    } else {
      contactDialogRef.current?.close();
    }
  }, [contactModalOpen]);

  useEffect(() => {
    const dialog = contactDialogRef.current;
    if (!dialog) return;

    function handleCancel(e: Event) {
      e.preventDefault();
      closeContactModal();
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [closeContactModal]);

  function submitForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    startTransition(async () => {
      const result = await submitPropertyContact(state, formData);
      setState(result);
      if (result.ok) {
        form.reset();
        if (hasAgentContact) {
          setContactRevealed(true);
          openContactModal();
        }
      }
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitForm(e.currentTarget);
  }

  function handleShowContactClick() {
    const form = formRef.current;
    if (!form) return;

    const consent = form.querySelector<HTMLInputElement>(
      'input[name="consentRequired"]',
    );
    if (!consent?.checked) {
      setState({
        ok: false,
        error: "Please complete all required fields and agree to the terms.",
      });
      consent?.focus();
      return;
    }

    if (!form.checkValidity()) {
      setState({ ok: false, error: "Please complete all required fields." });
      form.reportValidity();
      return;
    }

    setState(initialState);
    submitForm(form);
  }

  function handleContactDialogBackdrop(
    e: React.MouseEvent<HTMLDialogElement>,
  ) {
    if (e.target === contactDialogRef.current) {
      closeContactModal();
    }
  }

  return (
    <>
      {agentName ? (
      <div className="mt-6 border border-[#d9dce5] bg-[#fafbfd] p-4">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#d9dce5] bg-white">
            <Image
              src={agentAvatar ?? AGENT_PLACEHOLDER}
              alt={agentName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold leading-tight text-[#000759]">
              {agentName}
            </p>
            {agentPosition ? (
              <p className="mt-1 text-sm font-medium text-[#23408e]">
                {agentPosition}
              </p>
            ) : null}
            {agentDepartment ? (
              <p className="mt-0.5 text-sm text-[#000759]/85">
                {agentDepartment}
              </p>
            ) : null}
            <p className="mt-0.5 text-sm text-[#000759]/85">{agentLocation}</p>

            {hasAgentContact ? (
              <div className="relative mt-3">
                {!contactRevealed ? (
                  <>
                    <div
                      className="flex flex-wrap gap-4 blur-sm select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {agentPhone ? (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#23408e]">
                          <PhoneIcon />
                          Call Now
                        </span>
                      ) : null}
                      {agentEmail ? (
                        <span className="text-sm font-medium text-[#23408e] underline underline-offset-2">
                          Email
                        </span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={handleShowContactClick}
                      disabled={pending}
                      className="absolute inset-0 flex items-center justify-center bg-[#fafbfd]/75 text-sm font-semibold text-[#23408e] transition hover:bg-[#fafbfd]/90 hover:text-[#1d3575] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {pending ? "Submitting…" : "Show number and email"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={openContactModal}
                    className="text-sm font-semibold text-[#23408e] underline underline-offset-2 hover:text-[#1d3575]"
                  >
                    View number and email
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      ) : null}

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

      {hasAgentContact ? (
        <dialog
          ref={contactDialogRef}
          onClick={handleContactDialogBackdrop}
          className="m-0 mx-auto my-auto w-full max-w-md rounded-none border-0 bg-transparent p-0 backdrop:bg-[#000759]/60 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
        >
          <div
            className="relative w-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e8ebf2] px-6 py-4">
              <h3 className="font-serif text-lg font-normal text-[#000759]">
                Agent contact
              </h3>
              <button
                type="button"
                onClick={closeContactModal}
                aria-label="Close contact details"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#6b8cbe] transition hover:text-[#000759]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-[#000759]/80">
                Thank you for your enquiry.
                {agentName
                  ? ` You can reach ${agentName} using the details below.`
                  : " Contact details are below."}
              </p>

              <ul className="mt-5 space-y-4">
                {agentPhone ? (
                  <li>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8cbe]">
                      Phone
                    </p>
                    <a
                      href={`tel:${agentPhone.replace(/\s/g, "")}`}
                      className="mt-1 inline-flex items-center gap-2 text-base font-medium text-[#23408e] hover:text-[#1d3575]"
                    >
                      <PhoneIcon />
                      {agentPhone}
                    </a>
                  </li>
                ) : null}
                {agentEmail ? (
                  <li>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8cbe]">
                      Email
                    </p>
                    <a
                      href={`mailto:${agentEmail}`}
                      className="mt-1 block text-base font-medium text-[#23408e] underline underline-offset-2 hover:text-[#1d3575]"
                    >
                      {agentEmail}
                    </a>
                  </li>
                ) : null}
              </ul>

              <button
                type="button"
                onClick={closeContactModal}
                className="mt-8 w-full bg-[#000759] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1d3575]"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
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
      {success ? <ContactSuccess /> : null}

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
