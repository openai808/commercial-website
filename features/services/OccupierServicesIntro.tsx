import Image from "next/image";
import Link from "next/link";

const SECTION_LINKS = [
  "Our Services",
  "Tools & Tech",
  "Insights",
  "Mission",
  "News",
  "Leadership",
  "Contact Us",
];

export default function OccupierServicesIntro() {
  return (
    <section className="w-full bg-[#f3f3f3] text-[#1f2d57]">
      <div className="relative flex min-h-[250px] items-center justify-center px-6 py-12 text-center text-white md:min-h-[270px]">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80"
          alt="Occupier services hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#233d83]/80" />
        <div className="mx-auto max-w-3xl">
          <h1 className="relative text-4xl font-light tracking-tight md:text-5xl">
            Occupier Services
          </h1>
          <p className="relative mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-white/95 md:text-3xl">
            Maximise the power of your space with our expert real estate advisory
            solutions
          </p>
        </div>
      </div>

      <div className="border-b border-[#d9dce5] bg-white">
        <nav
          aria-label="Occupier services sections"
          className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-2 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1f2d57] md:gap-4"
        >
          {SECTION_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="border-r border-[#c9ceda] px-2 last:border-r-0 hover:text-[#23408e]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
        <div className="grid gap-9 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <h2 className="max-w-md text-3xl font-light leading-tight text-[#27386e] md:text-4xl">
              Transform Your Portfolio Strategy for Tomorrow&apos;s Success
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#3c4a76] md:text-lg">
              We help clients align their real estate strategy with core business,
              resulting in optimised real estate assets and increased productivity.
            </p>
          </div>

          <Link
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="group relative block min-h-[220px] overflow-hidden"
            aria-label="Watch Occupier Services video"
          >
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80"
              alt="Office collaboration video preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#233d83]/24" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#23408e] text-2xl text-white shadow-lg">
                ▶
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-12 grid gap-9 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="relative min-h-[250px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
              alt="Business meeting in a bright office"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-white/20" />
          </div>

          <div>
            <h3 className="text-3xl font-light leading-tight text-[#27386e] md:text-4xl">
              Aligning real estate strategy with business goals to accelerate success
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#3c4a76] md:text-lg">
              We are committed to maximising the potential of real estate for our
              clients. Whether you&apos;re looking to reimagine your workplace, find the
              perfect space, maximise return on investments or elevate the built
              environment, we have the right tools, technology and global and local
              expertise to deliver on your business objectives. We also create
              tailored programs to accelerate our clients&apos; sustainability and ESG
              initiatives and support diversity, equity and inclusion goals.
            </p>
            <Link
              href="/contact-us"
              className="mt-6 inline-flex items-center rounded-full bg-[#23408e] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1d3575]"
            >
              Connect with an expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
