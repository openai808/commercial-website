"use client";

import type { DeveloperProject } from "@/lib/properties/getDeveloperProjects";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, useTransition } from "react";
import {
  submitPropertyContact,
  type PropertyContactState,
} from "@/lib/actions/propertyContact";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";

type DeveloperProjectDetailHeroProps = {
  project: DeveloperProject;
};

function HeroImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          className="absolute inset-0 z-[1] animate-pulse bg-[#e8eaf0] motion-reduce:animate-none"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${className ?? ""} transition-opacity duration-300 motion-reduce:transition-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}

export default function DeveloperProjectDetailHero({
  project,
}: DeveloperProjectDetailHeroProps) {
  const router = useRouter();
  const imageUrl = project.thumbnail_url || PLACEHOLDER_IMAGE;
  const title = project.project_name || "Untitled Project";
  const location = project.location || null;
  const floorPlanUrl = (project.floor_plan_url as string) || null;

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/properties/developer-projects");
    }
  }, [router]);

  return (
    <section aria-label="Project overview">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8 xl:px-10">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 py-5 text-sm font-medium text-[#1a3fb5] transition hover:text-[#000759]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Developer Projects
        </button>

        <div className="grid min-h-[420px] grid-cols-1 overflow-hidden bg-white lg:min-h-[520px] lg:grid-cols-2">
          {/* Left — building photo */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a1030] sm:aspect-[4/5] lg:aspect-auto">
            <HeroImage
              src={imageUrl}
              alt={title}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right — info + floor plan */}
          <div className="flex flex-col justify-start px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
            {location && (
              <p className="text-sm font-medium tracking-wide text-[#1a3fb5] md:text-base">
                {location}
              </p>
            )}

            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#1a3fb5] md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {title}
            </h1>

            <DeveloperProjectContactForm project={project} />

            {floorPlanUrl && (
              <div className="mt-8 md:mt-10">
                <h2 className="text-base font-bold text-[#000759] md:text-lg">
                  Floor Plan
                </h2>
                <div className="relative mt-4 aspect-[16/10] w-full max-w-[520px] overflow-hidden border border-[#d9dce5]">
                  <HeroImage
                    src={floorPlanUrl}
                    alt={`${title} floor plan`}
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const initialContactState: PropertyContactState = { ok: false, error: null };

const underlineInput =
  "w-full border-0 border-b border-[#c5cad6] bg-transparent px-0 py-2.5 text-sm text-[#000759] outline-none ring-0 placeholder:text-[#000759]/45 focus:border-[#000759]";

function DeveloperProjectContactForm({
  project,
}: {
  project: DeveloperProject;
}) {
  const [state, setState] = useState<PropertyContactState>(initialContactState);
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

  const contacts = project.contacts ?? [];

  return (
    <div className="mt-8 rounded-lg bg-[#dfe3f0]/50 px-6 py-6 md:mt-10 md:px-8 md:py-8">
      {contacts.length > 0 ? (
        <>
          <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#000759] md:text-lg">
            Assigned Brokers
          </h2>
          <hr className="mt-3 border-[#000759]/20" />
          <div className="mt-5 space-y-5">
            {contacts.map((contact) => (
              <div key={contact.email || contact.name}>
                <p className="text-base font-bold text-[#000759] md:text-lg">
                  {contact.name}
                </p>
                {contact.number ? (
                  <a
                    href={`tel:${contact.number.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm text-[#4a5f9a] hover:underline"
                  >
                    {contact.number}
                  </a>
                ) : null}
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-sm text-[#1a3fb5] hover:underline"
                  >
                    {contact.email}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : null}

      <h2
        className={`text-base font-bold uppercase tracking-[0.08em] text-[#000759] md:text-lg ${
          contacts.length > 0 ? "mt-8" : ""
        }`}
      >
        Contact Us
      </h2>
      <hr className="mt-3 border-[#000759]/20" />

      {state.ok ? (
        <div className="mt-6 space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
            <svg
              viewBox="0 0 16 16"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M3 8l3 3 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-base font-semibold text-[#000759]">
            Thank you for your inquiry!
          </p>
          <p className="text-sm text-[#4a5f9a]">
            Our team will get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setState(initialContactState)}
            className="mt-2 text-sm font-medium text-[#1a3fb5] underline underline-offset-2 hover:text-[#000759]"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="mt-5">
          <p className="text-[11px] font-semibold tracking-wide text-[#000759]">
            <span className="text-red-600">*</span> REQUIRED FIELD
          </p>

          <label htmlFor="dev-contact-website" className="sr-only">
            Leave this field empty
          </label>
          <input
            id="dev-contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
          />

          <input
            type="hidden"
            name="listingCode"
            value={project.project_name || project.id}
          />
          <input
            type="hidden"
            name="listingTitle"
            value={project.project_name || "Developer Project"}
          />
          <input
            type="hidden"
            name="propertyType"
            value={String(project.category ?? "")}
          />
          <input type="hidden" name="contractType" value="" />
          <input
            type="hidden"
            name="city"
            value={project.location ?? ""}
          />

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#000759]">
                  First name <span className="text-red-600">*</span>
                </span>
                <input
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  placeholder="First name"
                  className={underlineInput}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#000759]">
                  Last name <span className="text-red-600">*</span>
                </span>
                <input
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                  placeholder="Last name"
                  className={underlineInput}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#000759]">
                Email <span className="text-red-600">*</span>
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="Email address"
                className={underlineInput}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#000759]">
                Phone
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                placeholder="Contact phone"
                className={underlineInput}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#000759]">
                Message <span className="text-red-600">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={4}
                maxLength={4000}
                placeholder="How can we help you?"
                className="mt-1 w-full resize-y border border-[#c5cad6] bg-white px-3 py-2.5 text-sm text-[#000759] outline-none placeholder:text-[#000759]/45 focus:border-[#000759] focus:ring-1 focus:ring-[#000759]/20"
              />
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer gap-3 text-sm leading-relaxed text-[#000759]/85">
            <input
              name="consentRequired"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-[#c5cad6] text-[#000759] focus:ring-[#000759]"
            />
            <span>
              I agree that my information may be used to respond to this
              enquiry in line with the{" "}
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

          {state.error ? (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full bg-[#000759] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1d3575] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Submitting\u2026" : "Submit Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
