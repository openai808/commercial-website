"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { submitHomeContactModal } from "@/lib/actions/homeContact";

const LOCATION_CHOICES = [
  { value: "metro-manila", label: "Metro Manila" },
  { value: "cebu", label: "Cebu" },
  { value: "davao", label: "Davao" },
  { value: "clark", label: "Clark / Central Luzon" },
  { value: "iloilo", label: "Iloilo / Western Visayas" },
  { value: "other-ph", label: "Other (Philippines)" },
  { value: "international", label: "International" },
] as const;

const ASSET_CLASS_OPTIONS = [
  { value: "", label: "Select" },
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail" },
  { value: "industrial", label: "Industrial / Logistics" },
  { value: "residential", label: "Residential" },
  { value: "mixed-use", label: "Mixed-use" },
  { value: "hospitality", label: "Hospitality" },
  { value: "land", label: "Land" },
  { value: "other", label: "Other" },
];

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700 sm:text-[12.5px] lg:text-[14px]">
      {children}
      {required ? <span className="text-red-600"> *</span> : null}
    </span>
  );
}

const underlineInput =
  "w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-sm text-neutral-900 outline-none ring-0 placeholder:text-neutral-400 focus:border-[#000759] focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-offset-2";

const selectClass =
  `${underlineInput} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0_top_50%] bg-no-repeat pr-8` +
  ` bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2024%2024%27%20stroke%3D%27%25233333%27%20stroke-width%3D%272%27%3E%3Cpath%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20d%3D%27M19%209l-7%207-7-7%27%2F%3E%3C%2Fsvg%3E")]`;

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  /** Keeps modal in the DOM until exit opacity transition finishes. */
  const [modalMounted, setModalMounted] = useState(false);
  const [modalEntered, setModalEntered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const honeypotId = useId();

  useLayoutEffect(() => {
    if (!open) {
      setModalEntered(false);
      return;
    }
    setModalMounted(true);
    setModalEntered(false);
  }, [open, setModalMounted]);

  useEffect(() => {
    if (!open || !modalMounted) return;
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setModalEntered(true));
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [open, modalMounted]);

  useEffect(() => {
    if (!modalMounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalMounted]);

  useEffect(() => {
    if (open || !modalMounted) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setModalMounted(false);
  }, [open, modalMounted, setModalMounted]);

  /** Ensures we unmount after close even if `transitionend` never fires (e.g. rapid open/close). */
  useEffect(() => {
    if (open || !modalMounted) return;
    const id = window.setTimeout(() => setModalMounted(false), 400);
    return () => window.clearTimeout(id);
  }, [open, modalMounted, setModalMounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!modalEntered || !modalMounted) return;
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>("[data-modal-close]")?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [modalEntered, modalMounted]);

  function onModalOverlayTransitionEnd(e: TransitionEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "opacity") return;
    if (!open) setModalMounted(false);
  }

  if (!modalMounted) return null;

  const returnTo = pathname && pathname.startsWith("/") ? pathname : "/";

  return (
    <div
      className={`fixed inset-0 z-[250] flex items-start justify-center overflow-y-auto bg-black/45 px-3 py-3 sm:items-center sm:p-6 transition-opacity duration-300 motion-reduce:transition-none ${
        modalEntered ? "ease-out opacity-100" : "ease-in opacity-0"
      } ${modalEntered ? "pointer-events-auto" : "pointer-events-none"}`}
      role="presentation"
      onTransitionEnd={onModalOverlayTransitionEnd}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-3xl overflow-y-auto rounded-sm bg-white shadow-2xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
          modalEntered
            ? "ease-out translate-y-0 opacity-100"
            : "ease-in -translate-y-[min(28dvh,9rem)] opacity-0"
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#000759] px-10 py-4 text-center">
          <h2 id={titleId} className="pr-8 text-base font-semibold text-white sm:text-lg">
            How can we help you?
          </h2>
          <button
            type="button"
            data-modal-close
            onClick={onClose}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            <span className="text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <form action={submitHomeContactModal} className="px-6 py-6 sm:px-8 sm:py-8">
          <input type="hidden" name="returnTo" value={returnTo} />

          <p className="mb-6 text-xs font-semibold tracking-wide sm:text-[13px]">
            <span className="text-red-600">*</span>
            <span className="text-[#000759]"> REQUIRED FIELD</span>
          </p>

          <label htmlFor={honeypotId} className="sr-only">
            Leave this field empty
          </label>
          <input
            id={honeypotId}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="block md:col-span-1">
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
            <label className="block md:col-span-1">
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
            <label className="block md:col-span-1">
              <FieldLabel>Phone (optional)</FieldLabel>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                placeholder="Contact Phone"
                className={underlineInput}
              />
            </label>
            <label className="block md:col-span-1">
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
          </div>

          <label className="mt-6 block">
            <FieldLabel>Company (optional)</FieldLabel>
            <input
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={120}
              placeholder="Company"
              className={underlineInput}
            />
          </label>

          <label className="mt-6 block">
            <FieldLabel required>Location of interest</FieldLabel>
            <select name="locationOfInterest" required className={selectClass} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {LOCATION_CHOICES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-6 block">
            <FieldLabel>Asset class (optional)</FieldLabel>
            <select name="assetClass" className={selectClass}>
              {ASSET_CLASS_OPTIONS.map((opt) => (
                <option key={opt.label + opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-6 block">
            <FieldLabel required>Message</FieldLabel>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={4000}
              placeholder="Message"
              className="mt-1 w-full resize-y rounded-sm border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#000759] focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-offset-2"
            />
          </label>

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-neutral-700">
            <label className="flex cursor-pointer gap-3">
              <input
                name="consentRequired"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-400 text-[#000759] focus:ring-[#000759]"
              />
              <span>
                I agree that my information may be used to respond to this enquiry in line with the{" "}
                <Link href="/terms-of-use" className="font-medium text-[#000759] underline underline-offset-2">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="font-medium text-[#000759] underline underline-offset-2">
                  Privacy Policy
                </Link>
                . <span className="text-red-600">(Required) *</span>
              </span>
            </label>
            <label className="flex cursor-pointer gap-3">
              <input
                name="consentMarketing"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-400 text-[#000759] focus:ring-[#000759]"
              />
              <span className="flex flex-wrap items-center gap-1.5">
                I would like to receive marketing communications by email.{" "}
                <span className="text-neutral-500">(Optional)</span>
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-400 text-xs font-semibold text-neutral-500"
                  title="You can unsubscribe at any time."
                >
                  ?
                </span>
              </span>
            </label>
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:justify-end">
            <div
              className="flex items-center gap-2 self-end rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-green-800 sm:order-1"
              role="status"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white" aria-hidden>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-medium">Success!</span>
              <span className="sr-only">Demo verification state. Replace with your captcha provider in production.</span>
            </div>
            <button
              type="submit"
              className="sm:order-2 rounded-full border-2 border-[#000759] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#000759] transition hover:bg-[#000759]/5 sm:text-[13.5px] lg:text-[15.4px]"
            >
              Send this email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
