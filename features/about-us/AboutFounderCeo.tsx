import Image from "next/image";
import type { FeaturedLeader } from "@/lib/people/leadershipTeam";

type AboutFounderCeoProps = {
  leader: FeaturedLeader;
};

const HEADING_ID = "founder-ceo-heading";

export default function AboutFounderCeo({ leader }: AboutFounderCeoProps) {
  return (
    <section className="bg-white pt-[90px] pb-[110px]" aria-labelledby={HEADING_ID}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center mb-[70px]">
          <span className="text-[15px] font-medium tracking-[0.22em] text-[#0B1B45]">
            LEADERSHIP
          </span>
          <div
            className="mx-auto mt-[14px] h-[3px] w-[80px] bg-[#EE1C25]"
            aria-hidden
          />
        </div>

        <div className="w-[80%] mx-auto grid grid-cols-1 gap-[34px] min-[861px]:grid-cols-[minmax(240px,300px)_1fr] min-[861px]:items-start min-[861px]:gap-[60px]">
          <figure className="relative h-full w-full overflow-hidden bg-[#C3CDD1] aspect-[3/4] max-[860px]:mx-auto max-[860px]:max-w-[320px]">
            <Image
              src={`/images/agents/${leader.id}.png`}
              alt={`${leader.name}, ${leader.roleLabel}`}
              fill
              className="object-cover object-center"
              sizes="(min-width: 861px) 300px, 320px"
            />
          </figure>

          <div>
            <p className="mb-[6px] text-[14px] font-medium uppercase tracking-[0.12em] text-[#2b2b2b]">
              {leader.roleLabel}
            </p>
            <h2
              id={HEADING_ID}
              className="text-[clamp(30px,3.4vw,42px)] font-extrabold uppercase tracking-[0.10em] text-[#0B1B45]"
            >
              {leader.name}
            </h2>
            <div
              className="mt-[14px] h-[3px] w-[120px] bg-[#EE1C25]"
              aria-hidden
            />
            <p className="whitespace-pre-line mt-[26px] text-[17px] leading-[1.6] font-light min-[861px]:text-[25px] min-[861px]:leading-[1.55] tracking-[0.03em] text-[#2b2b2b]">
              {leader.bio[0]}
            </p>
            <p className="whitespace-pre-line mt-[26px] text-[17px] leading-[1.6] font-light min-[861px]:text-[25px] min-[861px]:leading-[1.55] tracking-[0.03em] text-[#2b2b2b]">
              {leader.bio[1]}
            </p>
            <div
              className="mt-[22px] h-[3px] w-[60px] bg-[#EE1C25]"
              aria-hidden
            />
            <div
              className="mt-[10px] h-[3px] w-[28px] bg-[#EE1C25]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
