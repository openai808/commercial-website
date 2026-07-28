import type { LeadershipMember } from "@/lib/people/leadershipTeam";
import AgentCard from "./AgentCard";

type AboutLeadershipGridProps = {
  members: LeadershipMember[];
};

export default function AboutLeadershipGrid({
  members,
}: AboutLeadershipGridProps) {
  return (
    <section
      className="bg-white pt-[110px] pb-[130px]"
      aria-labelledby="about-leadership-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2
          id="about-leadership-heading"
          className="mx-auto max-w-3xl text-center text-[clamp(26px,3vw,38px)] font-normal uppercase leading-[1.35] tracking-[0.10em] text-[#0B1B45]"
        >
          The Powerhouse Behind
          <br />
          <strong className="font-bold tracking-[0.12em]">Remax 8</strong>
        </h2>
        <div
          className="mx-auto mt-[14px] h-[3px] w-[80px] bg-[#EE1C25]"
          aria-hidden
        />

        <ul className="mt-[80px] grid grid-cols-2 gap-x-[16px] gap-y-[24px] min-[621px]:grid-cols-3 min-[621px]:gap-x-[22px] min-[621px]:gap-y-[36px] min-[1101px]:grid-cols-5">
          {members.map((member) => (
            <AgentCard key={member.id} member={member} />
          ))}
        </ul>
      </div>
    </section>
  );
}
