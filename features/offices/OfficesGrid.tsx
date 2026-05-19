import type { OfficeLocation } from "@/lib/offices/types";

type OfficesGridProps = {
  offices: OfficeLocation[];
};

export default function OfficesGrid({ offices }: OfficesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {offices.map((office) => (
        <article
          key={office.id}
          className="border border-[#d9dce5] bg-white p-6 md:p-8"
        >
          <h2 className="text-2xl font-light text-[#000759] md:text-3xl">
            {office.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#23408e]">{office.city}</p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-[#000759]/85">
            {office.address}
          </address>
          <ul className="mt-4 space-y-2 text-sm text-[#000759]">
            <li>
              <span className="font-semibold">Phone: </span>
              <a
                href={`tel:${office.phone.replace(/\s/g, "")}`}
                className="hover:underline"
              >
                {office.phone}
              </a>
            </li>
            <li>
              <span className="font-semibold">Email: </span>
              <a href={`mailto:${office.email}`} className="hover:underline">
                {office.email}
              </a>
            </li>
          </ul>
        </article>
      ))}
    </div>
  );
}
