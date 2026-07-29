import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Reports",
  description:
    "Research reports and market data from RE/MAX Philippines.",
};

export default function ResearchReportsPage() {
  return (
    <main className="bg-white text-[#000759]">
      <section className="bg-[#000759] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] md:text-xs">
            RE/MAX Philippines
          </p>
          <h1 className="mt-3 font-serif text-3xl font-normal leading-snug text-white md:text-5xl md:leading-tight">
            Research Reports
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 text-sm text-[#4a5f9a] md:px-8 lg:px-10">
        Coming soon.
      </section>
    </main>
  );
}
