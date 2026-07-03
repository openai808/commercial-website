type LegalPageHeroProps = {
  title: string;
  description: string;
  lastUpdated: string;
};

export default function LegalPageHero({
  title,
  description,
  lastUpdated,
}: LegalPageHeroProps) {
  return (
    <section className="bg-[#000759] px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] md:text-xs">
          RE/MAX Philippines
        </p>
        <h1 className="mt-3 font-serif text-3xl font-normal leading-snug text-white md:text-5xl md:leading-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {description}
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.12em] text-[#6b8cbe]">
          Last updated: {lastUpdated}
        </p>
      </div>
    </section>
  );
}
