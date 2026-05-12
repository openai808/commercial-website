import Image from "next/image";
import Link from "next/link";

type SuccessCard = {
  imageSrc: string;
  imageAlt: string;
  date: string;
  dateTime: string;
  title: string;
  href: string;
};

const CARDS: SuccessCard[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Abstract blue flowing gradient pattern",
    date: "Nov 26, 2025",
    dateTime: "2025-11-26",
    title:
      "REMAX/8 recognised for excellence in commercial advisory across Asia Pacific",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Corporate event stage with professional lighting",
    date: "Aug 6, 2025",
    dateTime: "2025-08-06",
    title:
      "Industry body honours REMAX/8 for stakeholder engagement and market leadership",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Smartphone displaying business analytics on screen",
    date: "Oct 28, 2024",
    dateTime: "2024-10-28",
    title:
      "REMAX/8 deepens institutional partnerships for data-led property insights",
    href: "/contact-us",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern glass office tower facade",
    date: "Oct 3, 2024",
    dateTime: "2024-10-03",
    title:
      "REMAX/8 named among the region’s standout real estate advisory firms",
    href: "/contact-us",
  },
];

export default function RealEstateManagementServicesClientSuccess() {
  return (
    <section
      className="bg-[#f0f4f8] py-14 text-[#1f2d57] md:py-20"
      aria-labelledby="rems-client-success-heading"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <h2
          id="rems-client-success-heading"
          className="text-center text-3xl font-light tracking-tight text-[#27386e] md:text-4xl"
        >
          Client success
        </h2>

        <ul className="mt-12 grid list-none grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
          {CARDS.map((card) => (
            <li
              key={card.title}
              className="grid min-h-[200px] grid-cols-1 border border-[#e0e0e0] bg-white sm:min-h-[220px] sm:grid-cols-2 sm:items-stretch"
            >
              <div className="relative h-full min-h-[180px] w-full bg-[#e8edf2] sm:min-h-[200px]">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-between bg-white p-6 sm:p-7">
                <div>
                  <time
                    dateTime={card.dateTime}
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#23408e]"
                  >
                    {card.date}
                  </time>
                  <h3 className="mt-3 text-left text-base font-semibold leading-snug text-[#1f2d57] md:text-lg">
                    {card.title}
                  </h3>
                </div>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex self-start text-[11px] font-bold uppercase tracking-[0.14em] text-[#23408e] transition-colors hover:text-[#1d3575]"
                >
                  Read more &gt;
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
