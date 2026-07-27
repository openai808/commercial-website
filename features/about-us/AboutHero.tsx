type AboutHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function AboutHero({
  eyebrow = "About",
  title,
  description,
}: AboutHeroProps) {
  return (
    <section className="bg-[#000759] px-6 pb-8 pt-14 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] md:text-xs">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-normal leading-snug text-white md:text-5xl md:leading-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
