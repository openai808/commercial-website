export type LeadershipMember = {
  id: string;
  name: string;
  role: string;
};

export type FeaturedLeader = {
  id: string;
  name: string;
  roleLabel: string;
  bio: string;
};

/**
 * Static leadership roster and featured bios, sourced from the company's
 * approved leadership page marketing copy. Not backed by `profiles_directory` —
 * that table has no bio field and exists to power property-listing agent
 * cards, not curated leadership marketing content.
 */
export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: "joanna-cielo",
    name: "Joanna Cielo",
    role: "Junior Partner / Licensed Real Estate Broker",
  },
  {
    id: "sandro-orena",
    name: "Sandro Oreña",
    role: "Junior Partner / Real Estate Agent",
  },
  {
    id: "steph-co",
    name: "Steph Co",
    role: "Senior Partner / Real Estate Agent",
  },
  {
    id: "angela-baquiran",
    name: "Angela Baquiran",
    role: "Apprentice / Real Estate Agent",
  },
  {
    id: "coby-suarez",
    name: "Coby Suarez",
    role: "Apprentice / Real Estate Agent",
  },
  {
    id: "cristina-morales",
    name: "Cristina Morales",
    role: "Associate / Real Estate Agent",
  },
  {
    id: "lisa-gatuslao",
    name: "Lisa Gatuslao",
    role: "Apprentice / Real Estate Agent",
  },
  {
    id: "martina-babia",
    name: "Martina Babia",
    role: "Apprentice / Real Estate Agent",
  },
  {
    id: "nicolo-quieng",
    name: "Nicolo Quieng",
    role: "Associate / Licensed Real Estate Broker",
  },
  {
    id: "patrick-meris",
    name: "Patrick Meris",
    role: "Associate / Licensed Real Estate Broker",
  },
  {
    id: "jay-duran",
    name: "Jay Duran",
    role: "Apprentice / Real Estate Agent",
  },
  {
    id: "karl-mendoza",
    name: "Karl Mendoza",
    role: "Associate / Licensed Real Estate Broker",
  },
  {
    id: "philip-pardilla",
    name: "Philip Pardilla",
    role: "Junior Partner / Real Estate Agent",
  },
];

export const FEATURED_LEADERS: FeaturedLeader[] = [
  {
    id: "brad-zafe",
    name: "Brad Zafe",
    roleLabel: "Founder and CEO",
    bio: "Brad Zafe is a real estate broker, President, and founder of RE/MAX 8 Philippines, who's been rockin' the industry for nearly 7 years! With his expertise, Brad has successfully closed deals on a diverse range of properties, including luxurious residences and commercial complexes. He is committed to guiding you seamlessly through your real estate journey.",
  },
  {
    id: "reymond-cielo",
    name: "Reymond Cielo",
    roleLabel: "Head of Commercial Team",
    bio: "Mon Cielo is a seasoned professional with over a decade of experience in the real estate industry. With a keen focus on commercial property, Mon has honed his expertise in both leasing and selling commercial properties. His extensive knowledge and dedication to his craft make him a trusted advisor for clients seeking to navigate the complexities of commercial real estate transactions.",
  },
];

export function getLeadershipTeam(): LeadershipMember[] {
  return LEADERSHIP_TEAM;
}

export function getFeaturedLeaders(): FeaturedLeader[] {
  return FEATURED_LEADERS;
}
