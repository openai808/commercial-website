export type LeadershipImageTransform = {
  translateX?: number;
  translateY?: number;
  rotate?: number;
  scale?: number;
};

export type LeadershipMemberDetails = {
  license: string;
  bio: string;
  phone: string;
  email: string;
};

export type LeadershipMember = {
  id: string;
  name: string;
  role: string;
  /** Shifts this card into the second grid column on desktop (≥1101px). */
  offset?: true;
  /** Per-photo position/scale adjustment, e.g. to recenter a crop. */
  imageTransform?: LeadershipImageTransform;
  /** Bio/contact info shown in the agent detail modal. Not every member has this yet. */
  details?: LeadershipMemberDetails;
};

export type FeaturedLeader = {
  id: string;
  name: string;
  roleLabel: string;
  bio: [string, string];
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
    imageTransform: { translateX: 10, translateY: 35.3632, rotate: 0, scale: 2 },
    details: {
      license: "Under REBL No. 0026555",
      bio: "Joanna Cielo brings over a decade of industry experience to the table, specializing in commercial property leasing and sales. With a keen eye for market trends and a strategic approach, Joanna excels in guiding clients through the intricacies of commercial real estate transactions. Her commitment to client satisfaction and her depth of expertise make her a trusted partner in achieving their property goals.",
      phone: "+63 917 775 1780",
      email: "joannacielo.8realty@gmail.com",
    },
  },
  {
    id: "sandro-orena",
    name: "Sandro Oreña",
    role: "Junior Partner / Real Estate Agent",
    imageTransform: { translateX: -10, translateY: 61.3632, rotate: 0, scale: 2.3 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Sandro knows the Merville Park and South of Metro Manila markets inside out. He's helped clients close deals on houses and lots in Merville and condos in BGC, ensuring strong prices and smooth transactions. He helps sellers price competitively and attract the right buyers fast, avoiding delays and dealing with unserious prospects. For buyers, he filters out overpriced or unsuitable options and focuses only on properties that fit their needs and budget. Whether you're buying or selling, Sandro's marketing expertise and local know-how help you move forward with confidence and get the results you need.",
      phone: "+63 919 997 3504",
      email: "sorena.8realty@gmail.com",
    },
  },
  {
    id: "steph-co",
    name: "Steph Co",
    role: "Senior Partner / Real Estate Agent",
    imageTransform: { translateX: -4, translateY: 40.3632, rotate: 0, scale: 2.4 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Meet Steph, a realtor from RE/MAX 8 Philippines who also brings her creative charm as an artist into the mix. With an innate passion for making the perfect matches, she's your go-to companion in your journey of finding your dream home or investment property. Whether you're into spaces that already boast a distinct personality or you prefer a canvas to showcase your own style, Steph's got you covered!",
      phone: "+63 977 803 7908",
      email: "syapco.8realty@gmail.com",
    },
  },
  {
    id: "angela-baquiran",
    name: "Angela Baquiran",
    role: "Apprentice / Real Estate Agent",
    imageTransform: { translateX: 15, translateY: 27.3632, rotate: 0, scale: 2.4 },
    details: {
      license: "REBL No. 0028067",
      bio: "Angela is a dedicated RE/MAX 8 Philippines agent with a true passion for real estate. Apart from her extensive knowledge of the market, she is also an avid painter and art enthusiast. Angela places great importance on finding homes with character and showcasing the artistic elements of properties. As a trusted agent, she brings a fresh artistic outlook to the buying or selling process, ensuring that each property shines uniquely and stands out in the market. With Angela by your side, your real estate journey will become an unforgettable artistic adventure!",
      phone: "+63 945 447 3219",
      email: "baquiran.8realty@gmail.com",
    },
  },
  {
    id: "coby-suarez",
    name: "Coby Suarez",
    role: "Apprentice / Real Estate Agent",
    imageTransform: { translateX: 0, translateY: 29.3632, rotate: 0, scale: 1.3 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Coby Suarez believes real estate decisions should be grounded in facts—not sales pitches. If a property has flaws or downsides, he'll point them out. If something doesn't represent good value, he'll tell you. His role isn't to convince you to buy or sell—it's to help you make an informed decision. With a background in architecture, Coby brings a more discerning perspective to real estate, one that considers both the technical and design aspects of a property. He can evaluate everything from construction quality and layouts to the design choices that may shape its long-term value and livability. Whether you're searching for a home, selling a property, or building an investment portfolio, Coby's approach is straightforward: honest advice, thoughtful analysis, and a focus on finding the best value rather than simply closing the next transaction.",
      phone: "+63 917 147 2204",
      email: "jsuarez.8realty@gmail.com",
    },
  },
  {
    id: "cristina-morales",
    name: "Cristina Morales",
    role: "Associate / Real Estate Agent",
    imageTransform: { translateX: 21, translateY: 33.3632, rotate: 0, scale: 2 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Meet Cristina, your trusty property consultant and investment partner all rolled into one! Her mission? To deliver the hottest deals in the market straight to your doorstep. Sit back and soak up the benefits of your investment while Cristina works her magic, making the whole process as smooth as silk. Expect top-notch service and reliable advice when you team up with Cristina – she's got your back!",
      phone: "+63 917 808 4219",
      email: "cmorales.8realty@gmail.com",
    },
  },
  {
    id: "lisa-gatuslao",
    name: "Lisa Gatuslao",
    role: "Apprentice / Real Estate Agent",
    imageTransform: { translateX: -6, translateY: 20.3632, rotate: 0, scale: 1.1 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Lisa Gatuslao is a dedicated real estate agent at REMAX 8 Philippines, committed to helping clients navigate the property market with confidence and clarity. Her commitment to growth, excellence, and mastery in real estate—Lisa brings fresh energy, sharpened skills, and a client-first mindset to every transaction. Whether you're buying your first home, selling a property, or looking for the right investment opportunity, Lisa's approach is grounded in honesty, integrity, and a genuine desire to help you make informed decisions. She takes the time to understand your unique needs and works tirelessly to find the best fit—not just the fastest deal.",
      phone: "+63 917 508 5506",
      email: "lisagatuslao.8realty@gmail.com",
    },
  },
  {
    id: "martina-babia",
    name: "Martina Babia",
    role: "Apprentice / Real Estate Agent",
    imageTransform: { translateX: 6, translateY: -15.3632, rotate: 0, scale: 1.4 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Martina Babia is a committed and dynamic real estate professional at RE/MAX 8. With a strong focus on delivering exceptional service, she helps clients find their dream homes and secure outstanding property investments. Martina's dedication, market expertise, and client-first approach make her a trusted partner in achieving real estate goals.",
      phone: "+63 917 177 5568",
      email: "mbabia.8realty@gmail.com",
    },
  },
  {
    id: "nicolo-quieng",
    name: "Nicolo Quieng",
    role: "Associate / Licensed Real Estate Broker",
    imageTransform: { translateX: -6, translateY: 20.3632, rotate: 0, scale: 1.5 },
    details: {
      license: "REBL No. 0003415",
      bio: "Nicolo Quieng is a seasoned real estate broker dedicated to helping clients find the perfect investment opportunities in the Philippines' thriving property market. With years of experience in buying, selling, and leasing residential and commercial properties, he provides expert guidance, market insights, and personalized solutions tailored to each client's needs. Passionate about integrity and excellence, Nicolo ensures smooth and secure transactions, making real estate investments hassle-free and rewarding.",
      phone: "+63 917 888 0526",
      email: "nicolo.8realty@gmail.com",
    },
  },
  {
    id: "patrick-meris",
    name: "Patrick Meris",
    role: "Associate / Licensed Real Estate Broker",
    imageTransform: { translateX: 0, translateY: 48.3632, rotate: 0, scale: 2 },
    details: {
      license: "Under REBL No. 0026555",
      bio: "Patrick Meris is a dynamic force in the real estate industry, bringing with him years of invaluable experience and a relentless go-getter attitude. With a passion for connecting clients with their ideal investments or dream homes, Patrick's dedication knows no bounds.",
      phone: "+63 917 529 0096",
      email: "pmeris.8realty@gmail.com",
    },
  },
  {
    id: "jay-duran",
    name: "Jay Duran",
    role: "Apprentice / Real Estate Agent",
    offset: true,
    imageTransform: { translateX: -2, translateY: 18.3632, rotate: 0, scale: 1.1 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "A medical practitioner turned real estate professional, Jay brings the same precision and care assisting clients find their perfect home. Behind that high-spirited, easygoing charm is a sharp and serious negotiator ready to close deals. Specializing in residential luxury homes, Jay combines market expertise with genuine concern, guiding clients in every step of the way through life's biggest investment.",
      phone: "+63 999 882 4851",
      email: "jayduran.8realty@gmail.com",
    },
  },
  {
    id: "karl-mendoza",
    name: "Karl Mendoza",
    role: "Associate / Licensed Real Estate Broker",
    imageTransform: { translateX: -1, translateY: 20.3632, rotate: 0, scale: 1.3 },
    details: {
      license: "REBL No. 0036712",
      bio: "Karl Mendoza is a licensed Real Estate Broker with REMAX 8 Philippines, specializing in luxury residential properties and investment opportunities. Backed by a strong foundation in sales, finance, and client relations, he is committed to providing personalized service, strategic guidance, and a seamless real estate experience. Karl believes every property decision is an opportunity to build long-term value and lasting relationships.",
      phone: "+63 915 267 0628",
      email: "kmendoza.8realty@gmail.com",
    },
  },
  {
    id: "philip-pardilla",
    name: "Philip Pardilla",
    role: "Junior Partner / Real Estate Agent",
    imageTransform: { translateX: 4, translateY: 15.3632, rotate: 0, scale: 1.7 },
    details: {
      license: "Under REBL No. 0028067",
      bio: "Philip Pardilla is a dedicated realtor passionate about helping clients find their first home. With a keen eye for detail and a commitment to personalized service, Philip ensures a smooth and enjoyable home-buying experience for every client.",
      phone: "+63 917 178 8262",
      email: "philippardilla.8realty@gmail.com",
    },
  },
];

export const FEATURED_LEADERS: FeaturedLeader[] = [
  {
    id: "brad-zafe",
    name: "Brad Zafe",
    roleLabel: "Founder and CEO",
    bio: [
      `Brad Zafe is a real estate broker, President, and
      founder of RE/MAX 8 Philippines, who's been
      rockin' the industry for nearly 7 years!`,
      `With his expertise, Brad has successfully closed
      deals on a diverse range of properties, including
      luxurious residences and commercial complexes.
      He is committed to guiding you seamlessly
      through your real estate journey.`,
    ],
  },
  {
    id: "reymond-cielo",
    name: "Reymond Cielo",
    roleLabel: "Head of Commercial Team",
    bio: [
      `Mon Cielo is a seasoned professional with
      over a decade of experience in the real estate
      industry. With a keen focus on commercial
      property, Mon has honed his expertise in both
      leasing and selling commercial properties.`,
      `His extensive knowledge and dedication to
       his craft make him a trusted advisor for 
       clients seeking to navigate the complexities
      of commercial real estate transactions.`,
    ],
  },
];

export function getLeadershipTeam(): LeadershipMember[] {
  return LEADERSHIP_TEAM;
}

export function getFeaturedLeaders(): FeaturedLeader[] {
  return FEATURED_LEADERS;
}
