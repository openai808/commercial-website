import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPost, BlogPostsPageResult } from "@/lib/blog/types";

export async function getBlogPosts(
  page = 1,
  pageSize = 10,
): Promise<BlogPostsPageResult> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createSupabaseServerClient();

  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("created_at", { ascending: false })
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

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;

  return (data as BlogPost) ?? null;
}

export async function getRecentBlogPosts(
  limit = 5,
): Promise<BlogPost[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []) as BlogPost[];
}
