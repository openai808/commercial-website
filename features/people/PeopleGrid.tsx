import Image from "next/image";
import Link from "next/link";
import {
  getPersonAvatarUrl,
  getPersonDepartment,
  getPersonEmail,
  getPersonListingsHref,
  getPersonName,
  getPersonPhone,
  getPersonPosition,
} from "@/lib/people/personDisplay";
import type { PersonProfile } from "@/lib/people/types";

type PeopleGridProps = {
  people: PersonProfile[];
};

export default function PeopleGrid({ people }: PeopleGridProps) {
  if (people.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-[#4a5f9a]">
        No team members are listed right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}

function PersonCard({ person }: { person: PersonProfile }) {
  const name = getPersonName(person);
  if (!name) return null;

  const position = getPersonPosition(person);
  const department = getPersonDepartment(person);
  const phone = getPersonPhone(person);
  const email = getPersonEmail(person);
  const avatar = getPersonAvatarUrl(person);
  const listingsHref = getPersonListingsHref(person.id);

  return (
    <article className="flex flex-col overflow-hidden border border-[#d9dce5] bg-white">
      <div className="flex flex-1 gap-4 p-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#d9dce5] bg-white">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-tight text-[#000759]">
            {name}
          </h2>
          {position ? (
            <p className="mt-1 text-sm font-medium text-[#23408e]">{position}</p>
          ) : null}
          {department ? (
            <p className="mt-0.5 text-sm text-[#000759]/75">{department}</p>
          ) : null}
          <ul className="mt-3 space-y-1 text-sm text-[#000759]/85">
            {phone ? (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
                  {phone}
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <Link
        href={listingsHref}
        className="flex items-center justify-center bg-[#000759] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#001a8f]"
      >
        View listings
      </Link>
    </article>
  );
}
