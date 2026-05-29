import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DeveloperProject = {
  id: string;
  created_at: string;
  category: string;
  developer_name: string;
  project_name: string;
  location?: string | null;
  thumbnail_url?: string | null;
  information_link?: string | null;
  contacts?: { name: string; email: string; number: string }[] | null;
  [key: string]: unknown;
};

export type DeveloperProjectsPageResult = {
  data: DeveloperProject[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function getDeveloperProjectById(
  id: string,
): Promise<DeveloperProject | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("developer_projects_safe")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return (data as DeveloperProject) ?? null;
}

const GRID_COLUMNS =
  "id,project_name,location,thumbnail_url,created_at" as const;

export async function getDeveloperProjects(
  page = 1,
  pageSize = 20,
): Promise<DeveloperProjectsPageResult> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createSupabaseServerClient();

  const [listResult, countResult] = await Promise.all([
    supabase
      .from("developer_projects_safe")
      .select(GRID_COLUMNS)
      .eq("category", "office_commercial")
      .order("created_at", { ascending: false })
      .range(from, to),
    supabase
      .from("developer_projects_safe")
      .select("id", { count: "exact", head: true })
      .eq("category", "office_commercial"),
  ]);

  if (listResult.error) throw listResult.error;
  if (countResult.error) throw countResult.error;

  const rows = (listResult.data ?? []) as DeveloperProject[];
  const total = countResult.count ?? 0;

  return {
    data: rows,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}
