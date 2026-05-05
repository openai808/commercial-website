export default function ServicesLoading() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <div
        className="flex h-[210px] md:h-[280px] animate-pulse items-center justify-center bg-[#233d83]/80 px-6"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-12 md:px-10">
        <div className="h-8 w-2/3 max-w-md rounded bg-[#1f2d57]/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`services-skel-${i}`}
              className="h-40 rounded-lg border border-[#1f2d57]/10 bg-[#f4f6fb]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
