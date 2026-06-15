import Link from "next/link";

type LearnMoreCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
};

const CARDS: LearnMoreCard[] = [
  {
    id: "careers",
    label: "Careers",
    title: "Join Our Team",
    description:
      "Learn more about how you can be a part of a global powerhouse with the freedom of entrepreneurship.",
    href: "/careers",
  },
  {
    id: "about",
    label: "About RE/MAX",
    title: "Learn More",
    description:
      "With more than 140,000 professionals in over 110 countries and territories, RE/MAX is a global leader in residential and commercial real estate, powered by entrepreneurship and a network built for growth.",
    href: "/",
  },
];

function ReadMoreLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#000759] transition-colors hover:text-[#23408e]"
    >
      <span
        aria-hidden
        className="h-px w-8 bg-[#000759] transition-colors group-hover:bg-[#23408e]"
      />
      Read More
    </Link>
  );
}

function LearnMoreCard({ card }: { card: LearnMoreCard }) {
  return (
    <article>
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#000759]/55">
        {card.label}
      </p>
      <h3 className="mt-3 font-serif text-xl font-normal leading-snug text-[#000759] md:text-2xl">
        {card.title}
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#000759]/75 md:text-base">
        {card.description}
      </p>
      <ReadMoreLink href={card.href} />
    </article>
  );
}

export default function PeopleAndOfficesLearnMore() {
  return (
    <section
      aria-labelledby="people-offices-learn-more-heading"
      className="w-full bg-white text-[#000759]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-8 md:pb-16 lg:px-12">
        <h2
          id="people-offices-learn-more-heading"
          className="font-serif text-2xl font-normal leading-snug tracking-tight md:text-4xl md:leading-tight"
        >
          Learn More About RE/MAX
        </h2>

        <div className="mt-10 grid gap-10 border-t border-[#d9dce5] pt-10 md:mt-12 md:grid-cols-2 md:gap-12 md:pt-12 lg:gap-16">
          {CARDS.map((card) => (
            <LearnMoreCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
