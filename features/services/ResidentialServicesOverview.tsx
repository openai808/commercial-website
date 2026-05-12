const leasingItems = [
  "Expat Housing Services Orientation Program",
  "Identifying Suitable Accommodation",
  "School Assistance",
  "Lease Negotiation and Documentation",
  "Hand-over of Premises",
  "Tenant/Landlord Liaison",
  "Tenancy Management",
];

const salesItems = [
  "Sale/disposal and management of residential property",
  "Acts as sole or lead agent for marketing campaigns",
  "Assists in property acquisition for individual or corporate buyers",
];

function ChevronList({ items }: { items: string[] }) {
  return (
    <ul className="mx-auto flex max-w-3xl flex-col items-center gap-2.5 text-center text-sm leading-relaxed text-[#2a2a2a] md:text-base">
      {items.map((item) => (
        <li key={item}>
          <span className="text-[#2f3f74]" aria-hidden>
            &gt;{" "}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResidentialServicesOverview() {
  return (
    <section
      aria-labelledby="residential-overview-heading"
      className="w-full bg-white px-6 py-14 text-center text-[#2a2a2a] md:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="residential-overview-heading" className="sr-only">
          Introduction
        </h2>

        <div className="space-y-5 text-sm leading-relaxed md:text-base md:leading-relaxed">
          <p>
            In the Philippines, as in any new and exciting city, the single most important
            task you face is likely to be finding the right home. It can determine how
            quickly you and your family will adjust to a new way of life and how much you
            will enjoy your time here. To be fully aware of your options, and to obtain the
            best possible leasing terms, it pays to consult a professional. On the other
            hand, looking at investing or owning your own home is such a big decision and
            involves a lot of serious deliberation. Ensuring you do get value for your money
            and optimize your return on investment is of utmost importance. Our experienced
            team turns what can be an intimidating experience into an informed and exciting
            choice. The Residential Sales &amp; Leasing Division has a comprehensive listing
            of houses and condominium apartments for lease and sale. Our portfolio includes a
            wide range of choices, strategically accessible to and from the Central Business
            Districts and in all the prime residential locations.
          </p>
          <p>
            Our service is supplemented and enhanced also by our Research and Advisory team
            enabling the Division to be both proactive and innovative in its approach.
          </p>
        </div>

        <div className="mt-14 space-y-4 md:mt-16">
          <h2 className="text-lg font-semibold text-[#2f3f74] md:text-xl">Leasing</h2>
          <p className="text-sm leading-relaxed md:text-base md:leading-relaxed">
            We successfully serve both local and multinational corporations in the relocation
            of their executives, staff and their families. Our team of consultants understands
            the different cultures and requirements of various organisations, and our
            experience enables us to tailor our service to fulfill the expectations of
            relocating families and, equally important, the expectations of unit owners as
            well.
          </p>
        </div>

        <div className="mt-14 space-y-4 md:mt-16">
          <h2 className="text-lg font-semibold text-[#2f3f74] md:text-xl">Sales</h2>
          <p className="text-sm leading-relaxed md:text-base md:leading-relaxed">
            Working closely with a broad clientele such as public and private developers,
            investors, institutions and private high-net-worth individuals, the team offers
            financial analysis, research and market advice on all aspects of the residential
            property sales market.
          </p>
        </div>

        <div className="mt-14 space-y-5 md:mt-16">
          <h2 className="text-lg font-semibold text-[#2f3f74] md:text-xl">
            Leasing Services:
          </h2>
          <ChevronList items={leasingItems} />
        </div>

        <div className="mt-14 space-y-5 md:mt-16">
          <h2 className="text-lg font-semibold text-[#2f3f74] md:text-xl">Sales Services:</h2>
          <ChevronList items={salesItems} />
        </div>
      </div>
    </section>
  );
}
