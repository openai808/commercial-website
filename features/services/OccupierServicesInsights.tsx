import Image from "next/image";
import Link from "next/link";

type InsightCard = {
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
  href: string;
};

const CARDS: InsightCard[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f290?auto=format&fit=crop&w=900&q=80",
    imageAlt: "City skyline at dusk",
    date: "Mar 23, 2026",
    title:
      "REMAX Survey Results | Q4 2025 | Makati fringe, Quezon City emerge as active fringe markets",
    description:
      "Occupier sentiment, leasing velocity, and rent expectations across Metro Manila submarkets heading into the year ahead…",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1480714378408-67cf0d385cb9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Urban city scenes and architecture",
    date: "Mar 23, 2026",
    title: "Global Capital Flows March 2026",
    description:
      "Cross-border investment themes, sector rotation, and where institutional capital is tilting as financing conditions evolve…",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professional reviewing documents with financial charts on screen",
    date: "Mar 23, 2026",
    title:
      "REMAX Flash | GDP | Property pins hope on rate cuts amid stifled consumer demand",
    description:
      "A concise read on macro prints, policy signals, and what they imply for pricing, cap rates, and transaction timing…",
    href: "/contact-us",
  },
];

export default function OccupierServicesInsights() {
  return (
    <section
      id="insights"
      className="scroll-mt-24 bg-white py-14 text-[#27386e] md:py-20"
      aria-labelledby="occupier-insights-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="occupier-insights-heading"
          className="text-center text-3xl font-light tracking-tight md:text-4xl"
        >
          Industry-leading research
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-[#5a6478] md:text-lg">
          Make decisions that are driven by data and guided by expertise with our latest
          property reports.
        </p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {CARDS.map((card) => (
            <li
              key={card.title}
              className="flex flex-col border border-[#d9dce5] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eef0f5]">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                <time
                  dateTime="2026-03-23"
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#23408e]"
                >
                  {card.date}
                </time>
                <h3 className="mt-3 text-base font-bold leading-snug text-[#27386e] md:text-lg">
                  {card.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#5a6478]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex self-start text-xs font-bold uppercase tracking-[0.14em] text-[#23408e] hover:text-[#1d3575]"
                >
                  Read more
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-full bg-[#23408e] px-10 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1d3575]"
          >
            View more
          </Link>
        </div>
      </div>
    </section>
  );
}
