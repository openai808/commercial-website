"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CareerApplicationState = {
  ok: boolean;
  error: string | null;
};

const MAX = {
  fullName: 120,
  email: 254,
  phone: 40,
  linkedinUrl: 500,
  coverLetter: 5000,
} as const;

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10 MB

const initialState: CareerApplicationState = { ok: false, error: null };

export async function submitCareerApplication(
  _prev: CareerApplicationState,
  formData: FormData,
): Promise<CareerApplicationState> {
  if (String(formData.get("website") ?? "").trim()) {
    return initialState;
  }

  const careerId = String(formData.get("careerId") ?? "").trim();
  const fullName = String(formData.get("full_name") ?? "")
    .trim()
    .slice(0, MAX.fullName);
  const email = String(formData.get("email") ?? "")
    .trim()
    .slice(0, MAX.email);
  const phone = String(formData.get("phone") ?? "")
    .trim()
    .slice(0, MAX.phone);
  const linkedinUrl = String(formData.get("linkedin_url") ?? "")
    .trim()
    .slice(0, MAX.linkedinUrl);
  const coverLetter = String(formData.get("cover_letter") ?? "")
    .trim()
    .slice(0, MAX.coverLetter);
  const resumeFile = formData.get("resume") as File | null;

  if (!careerId) {
    return { ok: false, error: "Career information is missing." };
  }

  if (!fullName || !email) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (
    linkedinUrl &&
    !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(linkedinUrl)
  ) {
    return { ok: false, error: "Please enter a valid LinkedIn profile URL." };
  }

  const supabase = createSupabaseServerClient();
  let resumeUrl: string | null = null;

  if (resumeFile && resumeFile.size > 0) {
    if (!ALLOWED_RESUME_TYPES.includes(resumeFile.type)) {
      return {
        ok: false,
        error: "Resume must be a PDF or Word document (.pdf, .doc, .docx).",
      };
    }

    if (resumeFile.size > MAX_RESUME_SIZE) {
      return { ok: false, error: "Resume file must be under 10 MB." };
    }

    const ext = resumeFile.name.split(".").pop() || "pdf";
    const path = `${crypto.randomUUID()}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("career-resumes")
      .upload(path, resumeFile, { cacheControl: "3600" });

    if (uploadError) {
      return { ok: false, error: "Failed to upload resume. Please try again." };
    }

    resumeUrl = path;
  }

  try {
    const { error } = await supabase
      .from("career_applications")
      .insert({
        career_id: careerId,
        full_name: fullName,
        email,
        phone: phone || null,
        linkedin_url: linkedinUrl || null,
        cover_letter: coverLetter || null,
        resume_url: resumeUrl,
      })
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        error: "Failed to submit application. Please try again.",
      };
    }

    return { ok: true, error: null };
  } catch {
    return { ok: false, error: "Network error. Please try again later." };
  }
}
