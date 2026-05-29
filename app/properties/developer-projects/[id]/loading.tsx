export default function DeveloperProjectDetailLoading() {
  return (
    <main
      className="bg-white text-[#000759]"
      role="status"
      aria-live="polite"
      aria-label="Loading project details"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8 xl:px-10">
        <div className="h-5 w-52 animate-pulse rounded bg-[#000759]/10 py-5" />

        <div className="mt-5 grid min-h-[420px] animate-pulse grid-cols-1 overflow-hidden lg:min-h-[520px] lg:grid-cols-2">
          <div className="aspect-[3/4] w-full bg-[#e8ebf2] sm:aspect-[4/5] lg:aspect-auto" />
          <div className="space-y-4 px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
            <div className="h-4 w-48 rounded bg-[#000759]/10" />
            <div className="h-10 w-72 rounded bg-[#000759]/10" />
            <div className="mt-6 h-48 w-full rounded-lg bg-[#dfe3f0]/50" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1400px] animate-pulse px-5 md:mt-14 lg:px-8 xl:px-10">
        <div className="h-5 w-48 rounded bg-[#000759]/10" />
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 rounded bg-[#000759]/10" />
              <div className="h-4 w-32 rounded bg-[#000759]/10" />
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">Loading project details…</p>
    </main>
  );
}
