import Image from "next/image";

export default function IndustrialServicesHero() {
  return (
    <section aria-labelledby="industrial-services-title" className="w-full">
      <div className="relative flex min-h-[280px] flex-col items-center justify-center px-5 py-24 text-center text-white md:min-h-[320px] md:px-8 md:py-28">
        <Image
          src="/images/industrial-services-hero.png"
          alt="Documents and property materials with a small architectural model, representing industrial real estate services"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a2d5c]/88" aria-hidden />
        <div className="relative mx-auto max-w-4xl">
          <h1
            id="industrial-services-title"
            className="text-4xl font-extralight leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Industrial Services
          </h1>
        </div>
      </div>
    </section>
  );
}
