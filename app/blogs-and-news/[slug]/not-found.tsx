import Link from "next/link";

export default function InsightNotFound() {
  return (
    <main className="bg-white px-6 py-20 text-center text-[#000759] md:px-10">
      <h1 className="text-xl font-semibold">Article not found</h1>
      <p className="mt-3 text-sm text-[#4a5f9a]">
        This article may have been removed or is no longer available.
      </p>
      <Link
        href="/blogs-and-news"
        className="mt-8 inline-flex rounded-full bg-[#23408e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1d3575]"
      >
        Back to Blogs &amp; News
      </Link>
    </main>
  );
}
