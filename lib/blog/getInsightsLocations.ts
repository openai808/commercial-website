import { createSupabaseServerClient } from "@/lib/supabase/server";

export type InsightsLocationOption = {
  location: string;
  count: number;
};

const PAGE_SIZE = 1000;

/** All distinct locations on published posts. */
export async function getInsightsLocations(): Promise<
  InsightsLocationOption[]
> {
  const supabase = createSupabaseServerClient();
  const counts = new Map<string, number>();
  let from = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("location")
      .eq("status", "published")
      .not("location", "is", null)
      .order("location", { ascending: true })
      .range(from, to);

    if (error) throw error;

    const rows = data ?? [];
    for (const row of rows) {
      const location =
        typeof row.location === "string" ? row.location.trim() : "";
      if (!location) continue;
      counts.set(location, (counts.get(location) ?? 0) + 1);
    }

    if (rows.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return [...counts.entries()]
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => a.location.localeCompare(b.location));
}
