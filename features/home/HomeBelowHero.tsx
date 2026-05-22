import HomeBlogSlider from "@/features/home/HomeBlogSlider";
import HomeContact from "@/features/home/HomeContact";
import HomeNewsInsights from "@/features/home/HomeNewsInsights";
import type { NewsInsightItem } from "@/features/home/HomeNewsInsights";
import HomePillars from "@/features/home/HomePillars";
import HomeServices from "@/features/home/HomeServices";
import { getRecentBlogPosts } from "@/lib/blog/getBlogPosts";

export default async function HomeBelowHero() {
  const recentPosts = await getRecentBlogPosts(5);

  const newsItems: NewsInsightItem[] = recentPosts.map((post) => ({
    title: post.title,
    date: new Date(post.published_at ?? post.created_at).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" },
    ),
    dateTime: (post.published_at ?? post.created_at).split("T")[0],
    href: `/insights/${post.slug}`,
  }));

  const sliderPosts = recentPosts.map((post) => ({
    title: post.title,
    category: post.category ?? "Insights",
    excerpt: post.excerpt ?? "",
    href: `/insights/${post.slug}`,
    image: post.cover_image_url ?? "",
  }));

  return (
    <>
      <HomeNewsInsights items={newsItems} />
      {sliderPosts.length > 0 && <HomeBlogSlider posts={sliderPosts} />}
      <HomeServices />
      <HomePillars />
      <HomeContact />
    </>
  );
}
