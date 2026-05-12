import Image from "next/image";
import Link from "next/link";

type NewsCard = {
  imageSrc: string;
  imageAlt: string;
  date: string;
  dateTime: string;
  title: string;
  description: string;
  href: string;
};

const CARDS: NewsCard[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
    imageAlt: "City skyline at dusk with industrial structures in the foreground",
    date: "Apr 20, 2026",
    dateTime: "2026-04-20",
    title:
      "Metro logistics corridors reshape fringe demand as occupiers weigh last-mile access",
    description:
      "Developers and tenants are rebalancing footprint across core and ring markets as infrastructure spend and energy costs redraw the map…",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Abstract curved architectural interior in cool blue tones",
    date: "Apr 20, 2026",
    dateTime: "2026-04-20",
    title:
      "Design-led workplaces: how experience metrics are influencing renewal conversations",
    description:
      "Portfolio leaders are pairing traditional lease metrics with attendance, collaboration, and wellness signals to size the next commitment…",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1473341304170-971dccb56356?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Silhouettes of industrial equipment against a sunset sky",
    date: "Apr 20, 2026",
    dateTime: "2026-04-20",
    title:
      "Energy transition and real assets: what changing capex assumptions mean for site selection",
    description:
      "From grid stability to incentives, we unpack how teams are stress-testing location decisions against a faster-moving policy backdrop…",
    href: "/contact-us",
  },
];

export default function OccupierServicesNews() {
  return (
    <section
      id="news"
      className="scroll-mt-24 bg-white py-14 text-[#27386e] md:py-20"
      aria-labelledby="occupier-news-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="occupier-news-heading"
          className="text-center text-3xl font-light tracking-tight md:text-4xl"
        >
          News and insights
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base font-normal leading-relaxed text-[#3c4a76] md:text-lg">
          Making headlines by thinking differently and acting quickly.
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
                  dateTime={card.dateTime}
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b7bc7]"
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
