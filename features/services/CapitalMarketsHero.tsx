export default function CapitalMarketsHero() {
  return (
    <section aria-labelledby="capital-markets-title" className="w-full">
      <div
        className="flex min-h-[230px] items-center justify-center bg-[#233d83] bg-cover bg-center bg-no-repeat px-6 py-10 text-center text-white md:min-h-[250px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(35, 61, 131, 0.82), rgba(35, 61, 131, 0.82)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <h1
            id="capital-markets-title"
            className="text-3xl font-light leading-tight md:text-4xl"
          >
            Capital Markets &amp; Investment Services
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">
            Seeing beyond the bricks and mortar to analyze how property acquisition,
            ownership, and disposition can accelerate the success of our clients&apos;
            financial portfolio.
          </p>
        </div>
      </div>
    </section>
  );
}
