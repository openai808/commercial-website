import Image from "next/image";
import type { FeaturedLeader } from "@/lib/people/leadershipTeam";

type ResolvedFeaturedLeader = FeaturedLeader & { avatarUrl: string };

type AboutFeaturedLeadersProps = {
  leaders: ResolvedFeaturedLeader[];
};

export default function AboutFeaturedLeaders({
  leaders,
}: AboutFeaturedLeadersProps) {
  return (
    <div>
      {leaders.map((leader, index) => {
        const isDark = index % 2 === 1;
        const imageFirst = index % 2 === 0;

        return (
          <section
            key={leader.id}
            className={
              isDark
                ? "bg-[#000759] py-14 text-white md:py-20"
                : "bg-white py-14 text-[#000759] md:py-20"
            }
            aria-labelledby={`featured-leader-${leader.id}-heading`}
          >
            <div className="mx-auto max-w-[1400px] px-6 md:px-10">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div
                  className={`relative mx-auto h-72 w-full max-w-sm md:h-96 ${
                    imageFirst ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={leader.avatarUrl}
                    alt={leader.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
                <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe]">
                    {leader.roleLabel}
                  </p>
                  <h3
                    id={`featured-leader-${leader.id}-heading`}
                    className="mt-2 font-serif text-2xl font-normal md:text-4xl"
                  >
                    {leader.name}
                  </h3>
                  <div className="mt-4 h-[3px] w-12 bg-red-600" aria-hidden />
                  <p
                    className={`mt-5 max-w-xl text-sm leading-relaxed md:text-base ${
                      isDark ? "text-white/80" : "text-[#2a3a5c]"
                    }`}
                  >
                    {leader.bio}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
