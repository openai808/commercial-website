export default function PropertiesLoading() {
  return (
    <main
      className="bg-white text-[#000759]"
      role="status"
      aria-live="polite"
      aria-label="Loading properties"
    >
      <div className="animate-pulse border-b border-[#e8ebf2] px-6 py-6 md:px-10">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-6 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-2.5 w-20 rounded bg-[#000759]/10" />
              <div className="h-5 w-full rounded bg-[#000759]/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="animate-pulse bg-[#f0f4fa] px-6 py-7 md:px-10">
        <div className="mx-auto flex max-w-[1600px] justify-end gap-4">
          <div className="h-3 w-40 rounded bg-[#000759]/10" />
          <div className="h-3 w-56 rounded bg-[#000759]/10" />
        </div>
      </div>

      <div className="mx-auto mt-9 flex w-full max-w-[1600px] animate-pulse flex-col gap-6 px-6 md:px-10 lg:flex-row lg:gap-4 lg:px-8 xl:gap-5 xl:px-10">
        <div className="min-w-0 w-full lg:flex-[3]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden border border-[#d9dce5]">
                <div className="aspect-[4/3] w-full bg-[#e8ebf2]" />
                <div className="space-y-2 p-4 md:p-5">
                  <div className="h-4 w-full rounded bg-[#000759]/10" />
                  <div className="h-3 w-2/3 rounded bg-[#000759]/10" />
                  <div className="h-3 w-1/3 rounded bg-[#000759]/10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 w-full lg:flex-[2]">
          <div className="h-[min(52vh,420px)] w-full rounded bg-[#e8ebf2] lg:h-full lg:min-h-[420px]" />
        </div>
      </div>
      <p className="sr-only">Loading properties…</p>
    </main>
  );
}
