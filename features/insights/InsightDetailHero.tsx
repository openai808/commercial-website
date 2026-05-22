import Image from "next/image";
import Link from "next/link";

type InsightDetailHeroProps = {
  title: string;
  category: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  author: string | null;
};

export default function InsightDetailHero({
  title,
  category,
  coverImageUrl,
  publishedAt,
  author,
}: InsightDetailHeroProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section className="bg-[#000759]">
      {coverImageUrl && (
        <div className="relative aspect-[16/7] w-full md:aspect-[21/9]">
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000759] via-[#000759]/40 to-transparent" />
        </div>
      )}

      <div
        className={`mx-auto max-w-[900px] px-5 pb-10 md:px-8 lg:px-10 ${coverImageUrl ? "-mt-24 relative z-10 md:-mt-32" : "pt-10"}`}
      >
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            <li>
              <Link href="/insights" className="transition hover:text-white">
                Insights
              </Link>
            </li>
            <li aria-hidden>
              <span className="mx-1">/</span>
            </li>
            {category && (
              <>
                <li className="text-white/80">{category}</li>
              </>
            )}
          </ol>
        </nav>

        <h1 className="font-serif text-2xl font-normal leading-snug text-white md:text-4xl lg:text-5xl lg:leading-tight">
          {title}
        </h1>

        {(formattedDate || author) && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
            {author && <span>By {author}</span>}
            {author && formattedDate && (
              <span aria-hidden className="h-3 w-px bg-white/30" />
            )}
            {formattedDate && <time dateTime={publishedAt!}>{formattedDate}</time>}
          </div>
        )}
      </div>
    </section>
  );
}
