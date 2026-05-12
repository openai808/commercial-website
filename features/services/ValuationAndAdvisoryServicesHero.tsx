import Image from "next/image";

export default function ValuationAndAdvisoryServicesHero() {
  return (
    <section aria-labelledby="valuation-advisory-title" className="w-full">
      <div className="relative flex min-h-[280px] flex-col items-center justify-center px-5 py-24 text-center text-white md:min-h-[320px] md:px-8 md:py-28">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80"
          alt="Modern glass towers reaching toward the sky"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a2d5c]/88" aria-hidden />
        <div className="relative mx-auto max-w-4xl">
          <h1
            id="valuation-advisory-title"
            className="text-4xl font-extralight leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Valuation and Advisory Services
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-light leading-relaxed text-white/95 md:text-lg md:leading-relaxed">
            Professional property development and investment advice, providing
            solutions to your real estate and business needs, accelerating your
            success and working as your trusted advisors.
          </p>
        </div>
      </div>
    </section>
  );
}
