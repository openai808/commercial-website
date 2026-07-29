import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog/getBlogPosts";
import InsightDetailHero from "@/features/insights/InsightDetailHero";
import InsightDetailContent from "@/features/insights/InsightDetailContent";

type InsightDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: InsightDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.excerpt ?? undefined,
  };
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white text-[#000759]">
      <InsightDetailHero
        title={post.title}
        category={post.category}
        coverImageUrl={post.cover_image_url}
        publishedAt={post.published_at}
        author={post.author}
      />
      <InsightDetailContent content={post.content} />
    </main>
  );
}
