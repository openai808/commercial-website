import Image from "next/image";

export default function ServicesHero() {
  return (
    <section aria-labelledby="services-hero-title" className="w-full">
      <div className="relative flex min-h-[260px] items-center justify-center px-6 py-16 text-center text-white md:min-h-[340px] md:py-20">
        <Image
          src="/images/services-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0c2749]/85 via-[#0c2749]/55 to-[#0c2749]/30"
          aria-hidden
        />
        <div className="relative flex flex-col items-center">
          <h1
            id="services-hero-title"
            className="text-4xl font-extralight uppercase tracking-[0.3em] md:text-5xl lg:text-6xl"
          >
            Services
          </h1>
          <div className="mt-6 h-[3px] w-16 bg-red-600" aria-hidden />
        </div>
      </div>
    </section>
  );
}
