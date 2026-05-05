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
import { submitHomeContactModal } from "@/lib/actions/homeContact";

const CONTACT_BG =
  "/Experts Banner.png";

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
    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
      {children}
      {required ? <span className="text-red-600"> *</span> : null}
    </span>
  );
}

const underlineInput =
  "w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-sm text-neutral-900 outline-none ring-0 placeholder:text-neutral-400 focus:border-[#000759]";

const selectClass =
  `${underlineInput} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0_top_50%] bg-no-repeat pr-8` +
  ` bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2024%2024%27%20stroke%3D%27%25233333%27%20stroke-width%3D%272%27%3E%3Cpath%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20d%3D%27M19%209l-7%207-7-7%27%2F%3E%3C%2Fsvg%3E")]`;

export default function HomeContact() {
  const [open, setOpen] = useState(false);
  /** Keeps modal in the DOM until exit opacity transition finishes. */
  const [modalMounted, setModalMounted] = useState(false);
  /** Drives overlay + panel transition targets (enter/leave). */
  const [modalEntered, setModalEntered] = useState(false);
  const [expandContactFab, setExpandContactFab] = useState(false);
  /** When the section bottom is in view, FAB is `absolute` here; otherwise `fixed` (sticky) until the bottom scrolls into the viewport. */
  const [dockContactFabInSection, setDockContactFabInSection] = useState(false);
  const sectionBottomSentinelRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const honeypotId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const sync = () => setExpandContactFab(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const el = sectionBottomSentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setDockContactFabInSection(entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /** Reset “pre-enter” styles before paint so the slide-from-top transition always runs. */
  useLayoutEffect(() => {
    if (!open) {
      setModalEntered(false);
      return;
    }
    setModalMounted(true);
    setModalEntered(false);
  }, [open]);

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
  }, [open, modalMounted]);

  /** Ensures we unmount after close even if `transitionend` never fires (e.g. rapid open/close). */
  useEffect(() => {
    if (open || !modalMounted) return;
    const id = window.setTimeout(() => setModalMounted(false), 400);
    return () => window.clearTimeout(id);
  }, [open, modalMounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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

  return (
    <>
      <section className="relative isolate flex min-h-[min(100dvh,450px)] md:min-h-[min(100dvh,640px)] w-full items-center md:block md:min-h-[min(100vh,450px)]">
        {/* overflow-hidden only on the media stack so a `fixed` FAB is not clipped by this section */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src={CONTACT_BG}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-md md:scale-100 md:blur-none"
          />
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/30 max-md:from-slate-950/55 max-md:via-slate-950/40 max-md:to-slate-950/45" />
        </div>

        <div className="relative z-10 mx-auto w-[90%] max-w-3xl px-0 md:mr-auto md:w-full md:max-w-3xl md:px-10 md:pb-28 md:pt-20 lg:ml-28 lg:px-14">
          <div className="border border-white/30 bg-white/[0.18] px-7 py-10 text-left text-white shadow-2xl backdrop-blur-2xl supports-[backdrop-filter]:bg-white/[0.12] md:border-white/25 md:bg-white/10 md:px-10 md:py-11 supports-[backdrop-filter]:md:bg-white/[0.08]">
            <p className="mb-4 text-[0.6875rem] font-sans uppercase leading-snug tracking-[0.22em] text-white/90 md:mb-3 md:text-[clamp(0.65rem,0.55vw,0.75rem)] md:text-white/85">
              Navigate Philippines real estate
            </p>
            <h2 className="mb-6 font-serif text-[clamp(1.5rem,5.5vw,2.65rem)] font-light leading-[1.12] tracking-tight md:mb-4 md:text-[clamp(1.65rem,3.2vw,2.65rem)] md:leading-[1.15]">
              End-to-end property solutions delivered by market-leading experts
            </h2>
            <p className="mb-8 hidden max-w-xl font-sans text-sm leading-relaxed text-white/80 md:block md:text-base">
              Tell us about your goals—leasing, investment, or advisory—and we will connect you with the right
              specialists.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent text-left font-sans text-[clamp(0.95rem,3.8vw,1.15rem)] font-semibold text-white transition hover:opacity-85 md:inline-flex md:w-auto md:gap-3 md:text-[clamp(0.95rem,1.4vw,1.15rem)]"
            >
              <span className="shrink-0">Find an expert</span>
              <span aria-hidden className="h-px min-w-[2.5rem] flex-1 bg-white md:w-10 md:flex-none" />
            </button>
          </div>
        </div>

        {/* When this line is not in the viewport, the section bottom is unseen → FAB stays fixed. */}
        <div
          ref={sectionBottomSentinelRef}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          aria-hidden
        />

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`group bottom-6 right-6 inline-flex h-14 min-h-14 min-w-14 overflow-hidden rounded-full bg-[#000759] text-white shadow-lg ring-2 ring-white/20 transition-[max-width,box-shadow,padding,width] duration-300 ease-out hover:bg-[#000759]/92 hover:shadow-xl hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[480px]:bottom-4 max-[480px]:right-4 md:bottom-10 md:right-10 ${
            dockContactFabInSection ? "absolute z-20" : "fixed z-40"
          } ${
            expandContactFab
              ? "w-auto max-w-[min(18rem,calc(100vw-2rem))] pr-5"
              : "w-14 max-w-14 pr-0 hover:w-auto hover:max-w-[min(18rem,calc(100vw-2rem))] hover:pr-5 focus-visible:w-auto focus-visible:max-w-[min(18rem,calc(100vw-2rem))] focus-visible:pr-5"
          }`}
          aria-label="Contact us — open form"
        >
          <span
            className="pointer-events-none absolute left-0 top-0 z-10 flex size-14 items-center justify-center"
            aria-hidden
          >
            <img
              src="/icon-phone-mail.svg"
              alt=""
              className="block size-8 object-contain"
              width={32}
              height={32}
              decoding="async"
            />
          </span>
          <span
            className={`flex h-14 min-h-14 min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap pl-14 pr-0.5 text-left text-xs font-bold uppercase tracking-[0.12em] transition-[opacity,transform] duration-300 ease-out ${
              expandContactFab
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-1 opacity-0 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            }`}
          >
            Contact us
          </span>
        </button>
      </section>

      {modalMounted ? (
        <div
          className={`fixed inset-0 z-[250] flex items-start justify-center overflow-y-auto bg-black/45 px-3 py-3 sm:items-center sm:p-6 transition-opacity duration-300 motion-reduce:transition-none ${
            modalEntered ? "ease-out opacity-100" : "ease-in opacity-0"
          } ${modalEntered ? "pointer-events-auto" : "pointer-events-none"}`}
          role="presentation"
          onTransitionEnd={onModalOverlayTransitionEnd}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
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
                onClick={() => setOpen(false)}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded text-white transition hover:bg-white/10"
                aria-label="Close"
              >
                <span className="text-2xl leading-none" aria-hidden>
                  ×
                </span>
              </button>
            </div>

            <form action={submitHomeContactModal} className="px-6 py-6 sm:px-8 sm:py-8">
              <p className="mb-6 text-xs font-semibold tracking-wide">
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
                  className="mt-1 w-full resize-y rounded-sm border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#000759] focus:ring-1 focus:ring-[#000759]/25"
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
                    <a href="#" className="font-medium text-[#000759] underline underline-offset-2">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-medium text-[#000759] underline underline-offset-2">
                      Privacy Policy
                    </a>
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
                  className="sm:order-2 rounded-full border-2 border-[#000759] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#000759] transition hover:bg-[#000759]/5"
                >
                  Send this email
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
