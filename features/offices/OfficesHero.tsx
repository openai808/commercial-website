export default function OfficesHero() {
  return (
    <section aria-labelledby="offices-hero-title" className="w-full">
      <div
        className="flex h-[210px] items-center justify-center bg-[#233d83] bg-cover bg-center bg-no-repeat px-6 text-center text-white md:h-[280px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29, 60, 151, 0.82), rgba(35, 61, 131, 0.86)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <h1
          id="offices-hero-title"
          className="text-5xl font-light tracking-wide"
        >
          Offices
        </h1>
      </div>
    </section>
  );
}
