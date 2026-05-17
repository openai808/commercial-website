import Image from "next/image";
import Link from "next/link";

type Expert = {
  name: string;
  role: string;
  team: string;
  location: string;
  image: string;
  profileHref: string;
};

const EXPERTS: Expert[] = [
  {
    name: "Marcus Whitfield",
    role: "Senior Director",
    team: "Debt & Structured Finance",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    profileHref: "/professionals",
  },
  {
    name: "Sofia Andersson",
    role: "Associate Director",
    team: "Investment Sales Advisory",
    location: "Hong Kong",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    profileHref: "/professionals",
  },
];

function ContactAction({ label, symbol }: { label: string; symbol: string }) {
  return (
    <p className="flex items-center gap-2 text-sm text-[#1f2d57]">
      <span aria-hidden className="text-[14px] text-[#203c88]">
        {symbol}
      </span>
      {label}
    </p>
  );
}

export default function CapitalMarketsExperts() {
  return (
    <section className="bg-[#e9edf6] px-6 py-12 text-[#1f2d57] md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl font-light leading-tight text-[#243768] md:text-5xl">
            Experts
          </h2>
          <p className="mt-3 text-base text-[#3d4d78] md:text-lg">
            Leading our industry into the future.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {EXPERTS.map((expert) => (
            <article
              key={expert.name}
              className="overflow-hidden border border-[#cfd6e6] bg-white"
            >
              <div className="flex items-start gap-4 p-5">
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border border-[#d3d9e8]">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                    sizes="68px"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-light leading-tight text-[#243768] md:text-[2rem]">
                    {expert.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-[#203c88]">{expert.role}</p>
                  <p className="mt-1 text-base leading-snug text-[#2c3a64]">{expert.team}</p>
                  <p className="mt-1 text-base text-[#2c3a64]">{expert.location}</p>
                  <div className="mt-2 space-y-1">
                    <ContactAction label="Call now" symbol="☎" />
                    <ContactAction label="Call Mobile" symbol="▯" />
                    <ContactAction label="Email" symbol="✉" />
                  </div>
                </div>
              </div>

              <Link
                href={expert.profileHref}
                className="flex items-center justify-center bg-[#274393] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#1f3677]"
              >
                View Expert
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
