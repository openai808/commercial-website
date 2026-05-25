export default function PropertyDetailLoading() {
  return (
    <main
      className="bg-white text-[#000759]"
      role="status"
      aria-live="polite"
      aria-label="Loading property details"
    >
      <div className="animate-pulse">
        <div className="aspect-[16/9] w-full bg-[#e8ebf2] md:aspect-[21/9]" />
        <div className="mx-auto max-w-[1400px] space-y-4 px-5 py-8 md:px-8 lg:px-10">
          <div className="h-4 w-24 rounded bg-[#000759]/10" />
          <div className="h-8 max-w-2xl rounded bg-[#000759]/10" />
          <div className="h-5 max-w-xl rounded bg-[#000759]/10" />
        </div>
      </div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 lg:px-8 lg:py-12 xl:gap-16 xl:px-10">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-40 rounded bg-[#000759]/10" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-[#000759]/10" />
              <div className="h-4 w-full rounded bg-[#000759]/10" />
              <div className="h-4 w-4/5 rounded bg-[#000759]/10" />
            </div>
            <div className="aspect-[4/3] w-full rounded bg-[#e8ebf2]" />
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-48 rounded border border-[#e8ebf2] bg-[#f0f4fa]" />
            <div className="h-32 rounded border border-[#e8ebf2] bg-[#f0f4fa]" />
          </div>
        </div>
      </section>
      <p className="sr-only">Loading property details…</p>
    </main>
  );
}
