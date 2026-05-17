import Image from "next/image";
import Link from "next/link";

type Expert = {
  name: string;
  title: string;
  department: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  phoneHref: string;
  mobileHref?: string;
  emailHref: string;
};

const EXPERTS: Expert[] = [
  {
    name: "Thomas Brennan",
    title: "Director",
    department: "Workplace Strategy",
    location: "Sydney",
    imageSrc:
      "https://images.unsplash.com/photo-1560250097-9eb93e25a8f9?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Thomas Brennan",
    phoneHref: "tel:+61290123456",
    mobileHref: "tel:+61412345678",
    emailHref: "mailto:thomas.brennan@example.com",
  },
  {
    name: "Nadia Volkov",
    title: "Senior Director",
    department: "Tenant Advisory",
    location: "Melbourne",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Nadia Volkov",
    phoneHref: "tel:+61387654321",
    mobileHref: "tel:+61498765432",
    emailHref: "mailto:nadia.volkov@example.com",
  },
  {
    name: "Elliot Hayes",
    title: "Director & Head",
    department: "Portfolio Analytics",
    location: "Brisbane",
    imageSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Portrait of Elliot Hayes",
    phoneHref: "tel:+61734567890",
    emailHref: "mailto:elliot.hayes@example.com",
  },
];

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      />
    </svg>
  );
}

function IconMobile({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zM12 20c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"
      />
    </svg>
  );
}

function IconEnvelope({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}

export default function OccupierServicesLeadership() {
  return (
    <section
      id="leadership"
      className="scroll-mt-24 bg-white py-14 text-[#27386e] md:py-20"
      aria-labelledby="occupier-leadership-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="occupier-leadership-heading"
          className="text-center text-3xl font-light tracking-tight md:text-4xl"
        >
          Meet our experts
        </h2>

        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {EXPERTS.map((expert) => (
            <li
              key={expert.name}
              className="flex flex-col border border-[#d9dce5] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex gap-4">
                  <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full bg-[#eef0f5] ring-1 ring-[#d9dce5]">
                    <Image
                      src={expert.imageSrc}
                      alt={expert.imageAlt}
                      fill
                      className="object-cover"
                      sizes="88px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-base font-bold leading-tight text-[#27386e] md:text-lg">
                      {expert.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-[#27386e]">{expert.title}</p>
                    <p className="mt-2 text-sm font-normal leading-snug text-[#27386e]">
                      {expert.department} · {expert.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 border-t border-[#eceef3] pt-4">
                  <a
                    href={expert.phoneHref}
                    className="flex items-center gap-2 text-sm font-medium text-[#23408e] hover:text-[#1d3575]"
                  >
                    <IconPhone className="shrink-0 text-[#23408e]" />
                    Call now
                  </a>
                  {expert.mobileHref ? (
                    <a
                      href={expert.mobileHref}
                      className="flex items-center gap-2 text-sm font-medium text-[#23408e] hover:text-[#1d3575]"
                    >
                      <IconMobile className="shrink-0 text-[#23408e]" />
                      Call Mobile
                    </a>
                  ) : null}
                  <a
                    href={expert.emailHref}
                    className="flex items-center gap-2 text-sm font-medium text-[#23408e] hover:text-[#1d3575]"
                  >
                    <IconEnvelope className="shrink-0 text-[#23408e]" />
                    Email
                  </a>
                </div>
              </div>

              <Link
                href="/contact-us"
                className="flex w-full items-center justify-center bg-[#23408e] px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1d3575]"
              >
                View expert
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
