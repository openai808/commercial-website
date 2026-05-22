import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Career } from "@/lib/careers/types";

const CAREER_COLUMNS =
  "id, title, slug, department, location, employment_type, description, requirements, benefits, application_url, published_at" as const;

export async function getCareers(): Promise<Career[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("careers")
    .select(CAREER_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Career[];
}

export async function getCareerBySlug(
  slug: string,
): Promise<Career | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("careers")
    .select(CAREER_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;

  return (data as Career) ?? null;
}
