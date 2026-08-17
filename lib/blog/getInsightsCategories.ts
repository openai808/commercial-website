import { createSupabaseServerClient } from "@/lib/supabase/server";

export type InsightsCategoryOption = {
  category: string;
  count: number;
};

const PAGE_SIZE = 1000;

/** All distinct categories on published posts (not restricted to "insights"). */
export async function getInsightsCategories(): Promise<
  InsightsCategoryOption[]
> {
  const supabase = createSupabaseServerClient();
  const counts = new Map<string, number>();
  let from = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("category")
      .eq("status", "published")
      .not("category", "is", null)
      .order("category", { ascending: true })
      .range(from, to);

    if (error) throw error;

    const rows = data ?? [];
    for (const row of rows) {
      const category =
        typeof row.category === "string" ? row.category.trim() : "";
      if (!category) continue;
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }

    if (rows.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}
