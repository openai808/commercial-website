export default function RootLoading() {
  return (
    <div
      className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4 bg-white px-6 text-[#000759]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-[#000759]/10">
        <div className="h-full w-full origin-left animate-pulse rounded-full bg-[#000759]/35" />
      </div>
      <p className="text-sm text-[#000759]/70">Loading…</p>
    </div>
  );
}
