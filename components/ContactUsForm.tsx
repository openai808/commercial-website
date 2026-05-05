"use client";

import { FormEvent, useState } from "react";

type ContactUsFormProps = {
  title?: string;
  className?: string;
};

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  consentRequired: boolean;
  consentMarketing: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function ContactUsForm({
  title = "How can we help you?",
  className = "",
}: ContactUsFormProps) {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    message: "",
    consentRequired: false,
    consentMarketing: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validate = (formValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formValues.firstName.trim()) {
      nextErrors.firstName = "Please enter a valid first name.";
    }

    if (!formValues.lastName.trim()) {
      nextErrors.lastName = "Please enter a valid last name.";
    }

    if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (!formValues.message.trim()) {
      nextErrors.message = "Please enter a valid message.";
    }

    if (!formValues.consentRequired) {
      nextErrors.consentRequired = "Please check to submit your form.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Submit handler can be wired to an API endpoint later.
  };

  const inputBaseClass =
    "border-b bg-transparent px-0 py-2 text-base normal-case placeholder:text-[#4f5d85]/80 focus:border-[#223e83] focus:outline-none";
  const errorClass = "border-[#e07f91]";
  const defaultBorderClass = "border-[#a4aec8]";
  const fieldLabelClass = "flex flex-col gap-2 text-[11px] uppercase tracking-[0.12em] text-[#2d3a63]";
  const errorTextClass =
    "mt-1 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-[#d6697d]";

  return (
    <section aria-labelledby="contact-us-title" className={`bg-[#e6ebf6] py-16 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 text-[#1f2d57] md:px-10">
        <h2 id="contact-us-title" className="mb-10 text-center text-4xl font-light">
          {title}
        </h2>

        <form className="space-y-8" noValidate onSubmit={handleSubmit}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#6f7896]">* Required field</p>

          <div className="grid gap-6 md:grid-cols-2">
            <label className={fieldLabelClass}>
              First Name *
              <input
                type="text"
                name="firstName"
                placeholder="Please enter your first name"
                value={values.firstName}
                onChange={(event) =>
                  setValues((current) => ({ ...current, firstName: event.target.value }))
                }
                className={`${inputBaseClass} ${errors.firstName ? errorClass : defaultBorderClass}`}
              />
              {hasSubmitted && errors.firstName ? (
                <p className={errorTextClass}>⚠ {errors.firstName}</p>
              ) : null}
            </label>

            <label className={fieldLabelClass}>
              Last Name *
              <input
                type="text"
                name="lastName"
                placeholder="Please enter your last name"
                value={values.lastName}
                onChange={(event) =>
                  setValues((current) => ({ ...current, lastName: event.target.value }))
                }
                className={`${inputBaseClass} ${errors.lastName ? errorClass : defaultBorderClass}`}
              />
              {hasSubmitted && errors.lastName ? (
                <p className={errorTextClass}>⚠ {errors.lastName}</p>
              ) : null}
            </label>

            <label className={fieldLabelClass}>
              Phone (Optional)
              <input
                type="tel"
                name="phone"
                placeholder="Contact Phone"
                value={values.phone}
                onChange={(event) =>
                  setValues((current) => ({ ...current, phone: event.target.value }))
                }
                className={`${inputBaseClass} ${defaultBorderClass}`}
              />
            </label>

            <label className={fieldLabelClass}>
              Email *
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={values.email}
                onChange={(event) =>
                  setValues((current) => ({ ...current, email: event.target.value }))
                }
                className={`${inputBaseClass} ${errors.email ? errorClass : defaultBorderClass}`}
              />
              {hasSubmitted && errors.email ? (
                <p className={errorTextClass}>⚠ {errors.email}</p>
              ) : null}
            </label>
          </div>

          <label className={fieldLabelClass}>
            Company (Optional)
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={values.company}
              onChange={(event) =>
                setValues((current) => ({ ...current, company: event.target.value }))
              }
              className={`${inputBaseClass} ${defaultBorderClass}`}
            />
          </label>

          <label className={fieldLabelClass}>
            Message *
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={values.message}
              onChange={(event) =>
                setValues((current) => ({ ...current, message: event.target.value }))
              }
              className={`min-h-[110px] resize-y border bg-transparent px-4 py-3 text-base normal-case placeholder:text-[#4f5d85]/80 focus:border-[#223e83] focus:outline-none ${
                errors.message ? errorClass : defaultBorderClass
              }`}
            />
            {hasSubmitted && errors.message ? (
              <p className={errorTextClass}>⚠ {errors.message}</p>
            ) : null}
          </label>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="space-y-5 text-xs leading-5 text-[#2e3c66]">
              <label className="flex items-start gap-3 border-b border-[#a4aec8] pb-4">
                <input
                  type="checkbox"
                  name="consentRequired"
                  checked={values.consentRequired}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      consentRequired: event.target.checked,
                    }))
                  }
                  className={`mt-1 h-4 w-4 ${errors.consentRequired ? "accent-[#d6697d]" : ""}`}
                />
                <span>
                  I agree that REMAX/8 may save and use my contact details to respond to my
                  request via email or phone (if provided). I have read and accept the Colliers
                  Terms of Use and Privacy Policy. (Required)
                </span>
              </label>
              {hasSubmitted && errors.consentRequired ? (
                <p className={errorTextClass}>⚠ {errors.consentRequired}</p>
              ) : null}

              <label className="flex items-start gap-3 border-b border-[#a4aec8] pb-4">
                <input
                  type="checkbox"
                  name="consentMarketing"
                  checked={values.consentMarketing}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      consentMarketing: event.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4"
                />
                <span>
                  I agree to receive occasional marketing emails from REMAX/8. If unchecked, I
                  acknowledge that I am opting out of receiving such communications. (Optional)
                </span>
              </label>
            </div>

            <div className="grid gap-6">
              <div className="w-full min-w-[210px] border border-[#d2d8e8] bg-white px-4 py-3 text-sm text-[#2e3c66] shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                      ✓
                    </span>
                    Success!
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#5f6b8b]">
                    Cloudflare
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer justify-self-end rounded-full border-2 border-[#25408f] bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#25408f] transition hover:border-[#25408f] hover:bg-[#1c54f4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25408f]"
              >
                Send This Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
