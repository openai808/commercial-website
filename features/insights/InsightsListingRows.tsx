import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";

type InsightsListingRowsProps = {
  posts: BlogPost[];
};

export default function InsightsListingRows({
  posts,
}: InsightsListingRowsProps) {
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
      aria-label="Insights articles"
      className="divide-y divide-[#000759]/15 border-t border-[#000759]/15"
    >
      {posts.map((post) => (
        <InsightRow key={post.id} post={post} />
      ))}
    </div>
  );
}

function InsightRow({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date(post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return (
    <article className="group flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:gap-8">
      <Link
        href={href}
        className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#e8ebf2] sm:w-56"
      >
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 224px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl text-[#000759]/10">✦</span>
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <time
          dateTime={post.published_at ?? post.created_at}
          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8cbe]"
        >
          {formattedDate}
        </time>

        <h2 className="text-xl font-semibold leading-snug text-[#000759] md:text-2xl">
          <Link href={href} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-[#4a5f9a] md:text-base">
            {post.excerpt}
          </p>
        )}

        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#23408e] transition hover:opacity-75"
        >
          Read More
          <span aria-hidden>&rsaquo;</span>
        </Link>
      </div>
    </article>
  );
}
