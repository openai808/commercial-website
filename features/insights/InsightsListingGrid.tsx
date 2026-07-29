import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";

type InsightsListingGridProps = {
  posts: BlogPost[];
  variant?: "link" | "button";
};

export default function InsightsListingGrid({
  posts,
  variant = "link",
}: InsightsListingGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#4a5f9a]">
          No published articles yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div
      aria-label="Blog articles"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <InsightCard key={post.id} post={post} variant={variant} />
      ))}
    </div>
  );
}

function InsightCard({
  post,
  variant,
}: {
  post: BlogPost;
  variant: "link" | "button";
}) {
  const href = `/blog/${post.slug}`;
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const image = post.cover_image_url ? (
    <Image
      src={post.cover_image_url}
      alt={post.title}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  ) : (
    <div className="flex h-full items-center justify-center">
      <span className="text-4xl text-[#000759]/10">✦</span>
    </div>
  );

  if (variant === "button") {
    return (
      <article className="group flex flex-col items-center overflow-hidden bg-white text-center transition-shadow duration-200 hover:shadow-lg">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8ebf2]">
          {image}
        </div>

        <div className="flex flex-1 flex-col items-center gap-3 p-5">
          <h2 className="text-sm font-bold leading-snug text-[#000759] md:text-base">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="line-clamp-3 text-xs leading-relaxed text-[#4a5f9a] md:text-sm">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto pt-4">
            <Link
              href={href}
              className="inline-block rounded-[6px] bg-[#123B72] px-6 py-2.5 text-sm font-medium tracking-[0.04em] text-white transition-colors hover:bg-[#0d2c58]"
            >
              Read More <span className="ml-1 opacity-75">»</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden border border-[#d9dce5] bg-white transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8ebf2]">
        {image}
        {post.category && (
          <span className="absolute left-0 top-0 bg-[#23408e] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <time
          dateTime={post.published_at ?? post.created_at}
          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8cbe]"
        >
          {formattedDate}
        </time>

        <h2 className="text-sm font-bold leading-snug text-[#000759] group-hover:underline md:text-base">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="line-clamp-3 text-xs leading-relaxed text-[#4a5f9a] md:text-sm">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#23408e]">
            Read article
            <span aria-hidden className="h-px w-5 bg-[#23408e]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
