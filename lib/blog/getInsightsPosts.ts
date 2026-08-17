import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPost, BlogPostsPageResult } from "@/lib/blog/types";
import {
  DEFAULT_INSIGHTS_SORT,
  type InsightsSort,
} from "@/lib/insights/sortParams";

/** Default category scope when no Research Type is selected. */
const DEFAULT_CATEGORY_SCOPE = "%insights%";

function escapeIlike(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}

export type GetInsightsPostsOptions = {
  category?: string;
  location?: string;
  propertyType?: string;
  keywords?: string;
  sort?: InsightsSort;
};

export async function getInsightsPosts(
  page = 1,
  pageSize = 30,
  options: GetInsightsPostsOptions = {},
): Promise<BlogPostsPageResult> {
  const {
    category,
    location,
    propertyType,
    keywords,
    sort = DEFAULT_INSIGHTS_SORT,
  } = options;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createSupabaseServerClient();

  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("status", "published");

  query = category
    ? query.ilike("category", category)
    : query.ilike("category", DEFAULT_CATEGORY_SCOPE);

  if (location) {
    query = query.ilike("location", location);
  }

  if (propertyType) {
    query = query.ilike("property_type", propertyType);
  }

  if (keywords) {
    const term = `%${escapeIlike(keywords.trim())}%`;
    query = query.or(`title.ilike.${term},excerpt.ilike.${term}`);
  }

  // "Relevance" has no ranking source yet, so it falls back to newest-first
  // like "Date" — same simplification applied to the skipped filters.
  const ascending = sort.field === "date" && sort.direction === "asc";

  const { data, error, count } = await query
    .order("created_at", { ascending })
    .range(from, to);

  if (error) throw error;

  const rows = (data ?? []) as BlogPost[];
  const total = count ?? 0;

  return {
    data: rows,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}
