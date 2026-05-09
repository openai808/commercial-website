import Image from "next/image";
import Link from "next/link";

type Stat = {
  label: string;
  value: string;
};

type PropertyCard = {
  title: string;
  details: string;
  size: string;
  price: string;
  image: string;
  href: string;
};

const STATS: Stat[] = [
  { label: "Investors", value: "175+" },
  { label: "Transaction Volume", value: "$16 bn+" },
  { label: "Capital Market Professionals", value: "130+" },
  { label: "Offices", value: "38" },
];

const FEATURED_PROPERTIES: PropertyCard[] = [
  {
    title: "36-hectare Raw Land for Sale in Bulacan",
    details: "San Jose del Monte, Bulacan",
    size: "360,000 sqm",
    price: "PHP 4.2 B",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    href: "/properties/industrial",
  },
  {
    title: "Commercial Lot for Sale in Cebu City",
    details: "Cebu Business Park, Cebu",
    size: "7,200 sqm",
    price: "PHP 1.8 B",
    image:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
    href: "/properties/retail",
  },
  {
    title: "Property for Sale near Tagaytay",
    details: "Silang, Cavite",
    size: "25,000 sqm",
    price: "PHP 420 M",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    href: "/properties/office",
  },
];

export default function CapitalMarketsOverview() {
  return (
    <section className="bg-white px-6 py-10 text-[#1f2d57] md:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-stretch">
          <div className="relative min-h-[220px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="Office towers in a financial district"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-light leading-tight text-[#243768]">
              An Integrated Asia Platform with Access to Global Opportunities
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4a5678]">
              Our capital markets team combines regional intelligence with local
              execution to identify and close opportunities across office, retail,
              industrial, and mixed-use assets. We guide clients from underwriting to
              disposition with a disciplined, value-driven process.
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 border-y border-[#e4e8f1] py-5 md:grid-cols-4">
          {STATS.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#7a86a7]">
                {item.label}
              </p>
              <p className="mt-1 text-2xl font-light text-[#243768]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-light leading-tight text-[#243768]">
              Capital Markets &amp; Investment Services Global Real Estate Advisory
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a5678]">
              Access strategic advisory and transaction support for acquisitions,
              portfolio optimization, debt and equity placement, and asset sales.
              Our specialists tailor every strategy to your return profile and
              long-term objectives.
            </p>
          </div>

          <Link
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="group relative block min-h-[172px] overflow-hidden"
            aria-label="Watch Capital Markets video"
          >
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
              alt="Capital markets video preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-[#233d83]/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/95 text-white shadow-lg">
                ▶
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-10">
          <h3 className="text-center text-xl font-light text-[#243768]">
            Featured properties
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {FEATURED_PROPERTIES.map((property) => (
              <Link
                key={property.title}
                href={property.href}
                className="group block overflow-hidden border border-[#e2e6ef] bg-white transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(35,61,131,0.12)]"
              >
                <div className="relative h-36 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium leading-snug text-[#243768] group-hover:underline">
                    {property.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#6a7697]">{property.details}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#3b4a74]">
                    <span>{property.size}</span>
                    <span>{property.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/properties"
              className="rounded-full bg-[#233d83] px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1e336f]"
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
