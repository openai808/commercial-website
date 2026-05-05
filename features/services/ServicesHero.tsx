export default function ServicesHero() {
  return (
    <section aria-labelledby="services-hero-title" className="w-full">
      <div
        className="flex h-[210px] md:h-[280px] items-center justify-center bg-[#233d83] bg-cover bg-center bg-no-repeat px-6 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29, 60, 151, 0.82), rgba(35, 61, 131, 0.86)), url('https://www.colliers.com/-/media/images/colliers/hero-images/homepage-hero/lp-services-people-table-fromabove-optimized.ashx?bid=9ad16a43a4b6425993f9e6b0ee0ef4cc&w=768&hash=8C2036C6CD4D8CA1DCA40DE4BA94F730')",
        }}
      >
        <h1
          id="services-hero-title"
          className="text-5xl font-light tracking-wide"
        >
          Our service lines
        </h1>
      </div>
    </section>
  );
}
