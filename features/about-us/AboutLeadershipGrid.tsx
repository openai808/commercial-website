import Image from "next/image";
import type { LeadershipMember } from "@/lib/people/leadershipTeam";

type ResolvedLeadershipMember = LeadershipMember & { avatarUrl: string };

type AboutLeadershipGridProps = {
  members: ResolvedLeadershipMember[];
};

export default function AboutLeadershipGrid({
  members,
}: AboutLeadershipGridProps) {
  return (
    <section
      className="bg-white py-14 text-[#000759] md:py-20"
      aria-labelledby="about-leadership-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2
          id="about-leadership-heading"
          className="mx-auto max-w-2xl text-center font-serif text-2xl font-normal uppercase leading-snug tracking-tight md:text-4xl"
        >
          The Powerhouse Behind REMAX 8
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-12 bg-red-600" aria-hidden />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex flex-col overflow-hidden border border-[#d9dce5] bg-white"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col items-center px-4 pb-6 pt-4 text-center">
                <h3 className="text-sm font-bold uppercase tracking-[0.04em] text-[#000759]">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs leading-snug text-[#4a5f9a]">
                  {member.role}
                </p>
              </div>
              {/* TODO: link to /about-us/global-executive-leadership#<slug> once a per-person bio destination ships */}
              <span className="flex items-center justify-center bg-[#000759] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Read More
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
