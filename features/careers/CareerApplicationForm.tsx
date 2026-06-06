"use client";

import Image from "next/image";
import { useRef, useState, useTransition, useCallback, useEffect } from "react";
import {
  submitCareerApplication,
  type CareerApplicationState,
} from "@/lib/actions/careerApplication";

const initialState: CareerApplicationState = { ok: false, error: null };

const underlineInput =
  "w-full border-0 border-b border-[#c5cad6] bg-transparent px-0 py-2.5 text-sm text-[#000759] outline-none ring-0 placeholder:text-[#000759]/45 focus:border-[#000759]";

type CareerApplicationFormProps = {
  careerId: string;
  careerTitle: string;
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

export default function CareerApplicationForm({
  careerId,
  careerTitle,
}: CareerApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CareerApplicationState>(initialState);
  const [pending, startTransition] = useTransition();
  const [resumeName, setResumeName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback(() => {
    setOpen(true);
    setState(initialState);
  }, []);

  const closeDialog = useCallback(() => {
    if (pending) return;
    setOpen(false);
    setState(initialState);
    setResumeName(null);
    formRef.current?.reset();
  }, [pending]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(e: Event) {
      e.preventDefault();
      if (!pending) {
        setOpen(false);
        setState(initialState);
        setResumeName(null);
        formRef.current?.reset();
      }
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [pending]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitCareerApplication(state, formData);
      setState(result);
      if (result.ok) {
        formRef.current?.reset();
        setResumeName(null);
      }
    });
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setResumeName(file ? file.name : null);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current && !pending) {
      closeDialog();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-flex rounded-full bg-[#23408e] px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1d3575]"
      >
        Apply now
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="m-0 mx-auto my-auto w-full max-w-lg rounded-none border-0 bg-transparent p-0 backdrop:bg-[#000759]/60 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
      >
        <div className="relative max-h-[90vh] w-full overflow-y-auto bg-white shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e8ebf2] bg-white px-6 py-4">
            <div className="min-w-0 pr-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8cbe]">
                Apply for
              </p>
              <h2 className="truncate font-serif text-lg font-normal text-[#000759]">
                {careerTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              disabled={pending}
              aria-label="Close application form"
              className="flex h-8 w-8 shrink-0 items-center justify-center text-[#6b8cbe] transition hover:text-[#000759] disabled:opacity-50"
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
            {state.ok ? (
              <ApplicationSuccess onClose={closeDialog} />
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <p className="text-[11px] font-semibold tracking-wide text-[#000759]">
                  <span className="text-red-600">*</span> REQUIRED FIELD
                </p>

                <label htmlFor={`apply-honeypot-${careerId}`} className="sr-only">
                  Leave this field empty
                </label>
                <input
                  id={`apply-honeypot-${careerId}`}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
                />

                <input type="hidden" name="careerId" value={careerId} />

                <div className="mt-5 space-y-5">
                  <label className="block">
                    <FieldLabel required>Full name</FieldLabel>
                    <input
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder="Enter your full name"
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
                      placeholder="Enter your email address"
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
                      placeholder="e.g. +63 912 345 6789"
                      className={underlineInput}
                    />
                  </label>

                  <label className="block">
                    <FieldLabel>LinkedIn profile</FieldLabel>
                    <input
                      name="linkedin_url"
                      type="url"
                      maxLength={500}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={underlineInput}
                    />
                  </label>

                  <label className="block">
                    <FieldLabel>Cover letter</FieldLabel>
                    <textarea
                      name="cover_letter"
                      rows={4}
                      maxLength={5000}
                      placeholder="Tell us why you're a great fit for this role"
                      className="mt-1 w-full resize-y border border-[#d9dce5] bg-white px-3 py-2.5 text-sm text-[#000759] outline-none placeholder:text-[#000759]/45 focus:border-[#000759] focus:ring-1 focus:ring-[#000759]/20"
                    />
                  </label>

                  <div>
                    <FieldLabel required>Resume</FieldLabel>
                    <div className="mt-1 flex items-center gap-3">
                      <label className="group inline-flex cursor-pointer items-center gap-2 border border-[#d9dce5] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#23408e] transition hover:border-[#23408e] hover:bg-[#23408e]/5">
                        <svg
                          viewBox="0 0 20 20"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M10 4v12m0-12l-3 3m3-3l3 3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Upload file
                        <input
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={handleResumeChange}
                          className="sr-only"
                        />
                      </label>
                      {resumeName ? (
                        <span className="min-w-0 truncate text-xs text-[#4a5f9a]">
                          {resumeName}
                        </span>
                      ) : (
                        <span className="text-xs text-[#000759]/40">
                          PDF or Word, max 10 MB
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {state.error ? (
                  <p className="mt-4 text-sm text-red-600" role="alert">
                    {state.error}
                  </p>
                ) : null}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-[#000759] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1d3575] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {pending ? "Submitting…" : "Submit application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

function ApplicationSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="mt-4 font-serif text-xl font-normal text-[#000759]">
        Application submitted!
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#4a5f9a]">
        Thank you for your interest. We&apos;ll review your application and get
        back to you soon.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <Image
          src="/REMAX Commercial Logo.png"
          alt="RE/MAX Commercial"
          width={100}
          height={24}
          className="h-5 w-auto shrink-0 object-contain"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex rounded-full bg-[#23408e] px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1d3575]"
      >
        Close
      </button>
    </div>
  );
}
