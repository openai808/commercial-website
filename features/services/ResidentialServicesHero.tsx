import Image from "next/image";

export default function ResidentialServicesHero() {
  return (
    <section aria-labelledby="residential-services-title" className="w-full">
      <div className="relative flex min-h-[280px] flex-col items-center justify-center px-5 py-24 text-center text-white md:min-h-[320px] md:px-8 md:py-28">
        <Image
          src="/images/residential-services-hero.png"
          alt="Modern residential building with landscaped trees"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a2d5c]/88" aria-hidden />
        <div className="relative mx-auto max-w-4xl">
          <h1
            id="residential-services-title"
            className="text-4xl font-extralight leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Residential Services
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-light leading-relaxed text-white/95 md:text-lg md:leading-relaxed">
            Our team of specialists&apos; experience and expertise across all facets of
            residential is unparalleled.
          </p>
        </div>
      </div>
    </section>
  );
}
