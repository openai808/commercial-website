export default function InsightsLoading() {
  return (
    <main
      className="bg-white text-[#000759]"
      role="status"
      aria-live="polite"
      aria-label="Loading articles"
    >
      <section className="bg-[#000759] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px] animate-pulse">
          <div className="h-3 w-28 rounded bg-white/20" />
          <div className="mt-4 h-10 max-w-md rounded bg-white/20" />
          <div className="mt-4 h-4 max-w-lg rounded bg-white/10" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden border border-[#d9dce5]">
              <div className="aspect-[16/10] bg-[#e8ebf2]" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-24 rounded bg-[#000759]/10" />
                <div className="h-5 w-full rounded bg-[#000759]/10" />
                <div className="h-4 w-4/5 rounded bg-[#000759]/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <p className="sr-only">Loading articles…</p>
    </main>
  );
}
