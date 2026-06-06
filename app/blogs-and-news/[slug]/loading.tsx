export default function InsightDetailLoading() {
  return (
    <main
      className="bg-white text-[#000759]"
      role="status"
      aria-live="polite"
      aria-label="Loading article"
    >
      <div className="animate-pulse">
        <div className="aspect-[16/7] w-full bg-[#000759] md:aspect-[21/9]" />
        <div className="mx-auto max-w-[900px] space-y-4 px-5 py-8 md:px-8">
          <div className="h-3 w-20 rounded bg-[#000759]/10" />
          <div className="h-8 max-w-xl rounded bg-[#000759]/10" />
          <div className="h-4 w-48 rounded bg-[#000759]/10" />
        </div>
      </div>
      <section className="border-t border-[#e8ebf2] bg-white">
        <div className="mx-auto max-w-[900px] animate-pulse space-y-5 px-5 py-10 md:px-8 lg:px-10">
          <div className="h-4 w-full rounded bg-[#000759]/10" />
          <div className="h-4 w-full rounded bg-[#000759]/10" />
          <div className="h-4 w-4/5 rounded bg-[#000759]/10" />
          <div className="h-4 w-full rounded bg-[#000759]/10" />
          <div className="h-4 w-3/5 rounded bg-[#000759]/10" />
        </div>
      </section>
      <p className="sr-only">Loading article…</p>
    </main>
  );
}
