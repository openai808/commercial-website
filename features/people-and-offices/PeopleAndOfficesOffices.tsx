import Image from "next/image";

type OfficeListing = {
  id: string;
  name: string;
  addressLines: string[];
  phoneHref: string;
  directionsHref: string;
  imageSrc: string;
  imageAlt: string;
};

const OFFICES: OfficeListing[] = [
  {
    id: "philippines",
    name: "Philippines Office",
    addressLines: [
      "12th, 14th & 15th floors, M1 Tower Building",
      "141 H.V. Dela Costa Street, Salcedo Village",
      "Makati City, 1227",
    ],
    phoneHref: "tel:+63288168888",
    directionsHref:
      "https://www.google.com/maps/search/?api=1&query=141+H.V.+Dela+Costa+Street,+Salcedo+Village,+Makati+City,+1227",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    imageAlt: "M1 Tower Building, Makati City",
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

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      />
    </svg>
  );
}

function OfficeRow({ office }: { office: OfficeListing }) {
  return (
    <article className="grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-start md:gap-10 md:py-12">
      <div>
        <h3 className="font-serif text-xl font-normal leading-snug text-[#000759] md:text-2xl">
          {office.name}
        </h3>
        <a
          href={office.phoneHref}
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#000759] transition-colors hover:text-[#23408e]"
        >
          <IconPhone className="shrink-0" />
          Phone
        </a>
      </div>

      <div>
        <address className="not-italic text-sm leading-relaxed text-[#000759]/85">
          {office.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a
          href={office.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#000759] transition-colors hover:text-[#23408e]"
        >
          <IconMapPin className="shrink-0" />
          Get Directions
        </a>
      </div>

      <div className="relative h-[120px] w-full max-w-[180px] shrink-0 overflow-hidden md:h-[140px] md:w-[180px]">
        <Image
          src={office.imageSrc}
          alt={office.imageAlt}
          fill
          className="object-cover"
          sizes="180px"
        />
      </div>
    </article>
  );
}

export default function PeopleAndOfficesOffices() {
  return (
    <section
      aria-labelledby="people-offices-locations-heading"
      className="w-full bg-white text-[#000759]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-12">
        <h2
          id="people-offices-locations-heading"
          className="max-w-4xl font-serif text-2xl font-normal leading-snug tracking-tight md:text-4xl md:leading-tight"
        >
          With 500 offices on six continents, our team collaborates across borders
          and in every sector of real estate.
        </h2>

        <div className="mt-10 border-t border-[#d9dce5] md:mt-12">
          {OFFICES.map((office) => (
            <OfficeRow key={office.id} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
}
