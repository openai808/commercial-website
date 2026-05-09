import Image from "next/image";
import Link from "next/link";

type InsightCard = {
  date: string;
  title: string;
  description?: string;
  href: string;
  image: string;
};

const MAIN_INSIGHT: InsightCard = {
  date: "Mar 23, 2026",
  title: "Colliers Survey Results | Q4 2025 | Makati fringe, Quezon City emerge as top destinations",
  description:
    "Discover key trends in the Metro Manila real estate market from office space demand and residential investment hotspots to hotel growth and industrial logistics opportunities.",
  href: "/insights",
  image:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1800&q=80",
};

const SIDE_INSIGHTS: InsightCard[] = [
  {
    date: "Mar 17, 2026",
    title: "Global Capital Flows March 2026",
    href: "/insights",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: "Mar 9, 2026",
    title: "Asia Pacific Investment Insights | March 2026",
    href: "/insights",
    image:
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: "Mar 2, 2026",
    title: "Colliers Flash | GDP | Property pins hope on rate cuts amid stifled GDP",
    href: "/insights",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
];

function ReadMoreLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f2d57] hover:text-[#2e4ea1]"
    >
      Read more
      <span aria-hidden>›</span>
    </Link>
  );
}

export default function CapitalMarketsResearchInsights() {
  return (
    <section className="bg-[#f4f5f7] px-6 py-12 text-[#1f2d57] md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl font-light leading-tight text-[#243768]">
            Research &amp; Insights
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-[#42507a] md:text-base">
            Make informed decisions. Get access to the latest property reports,
            industry trends, and market projections.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
          <article className="overflow-hidden border border-[#d7ddeb] bg-white">
            <div className="relative h-64 w-full md:h-80">
              <Image
                src={MAIN_INSIGHT.image}
                alt={MAIN_INSIGHT.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="p-5 md:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3760c7]">
                {MAIN_INSIGHT.date}
              </p>
              <h3 className="mt-2 text-3xl font-light leading-tight text-[#243768]">
                {MAIN_INSIGHT.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5678]">
                {MAIN_INSIGHT.description}
              </p>
              <div className="mt-4">
                <ReadMoreLink href={MAIN_INSIGHT.href} />
              </div>
            </div>
          </article>

          <div className="grid gap-3">
            {SIDE_INSIGHTS.map((item) => (
              <article
                key={item.title}
                className="grid overflow-hidden border border-[#d7ddeb] bg-white sm:grid-cols-[0.56fr_0.44fr]"
              >
                <div className="relative h-44 sm:h-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 34vw"
                  />
                </div>
                <div className="flex flex-col justify-between p-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3760c7]">
                      {item.date}
                    </p>
                    <h3 className="mt-2 text-xl font-light leading-tight text-[#243768]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-5">
                    <ReadMoreLink href={item.href} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/insights"
            className="rounded-full bg-[#23408e] px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1d3575]"
          >
            View more
          </Link>
        </div>
      </div>
    </section>
  );
}
