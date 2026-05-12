import Image from "next/image";
import Link from "next/link";

export default function OccupierServicesMission() {
  return (
    <section
      id="mission"
      className="scroll-mt-24"
      aria-labelledby="occupier-mission-heading"
    >
      <div className="relative min-h-[320px] w-full md:min-h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
          alt="Team collaborating around a laptop in a modern office"
          fill
          className="object-cover object-[65%_center] md:object-[70%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1f2d57]/72" aria-hidden />

        <div className="relative flex min-h-[320px] w-full flex-col justify-center py-14 md:min-h-[380px] md:py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-lg text-left text-white">
              <h2
                id="occupier-mission-heading"
                className="text-3xl font-light tracking-tight md:text-4xl lg:text-[2.75rem]"
              >
                Our mission
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/95 md:text-lg">
                Maximise the power of your space and accelerate your growth with the most
                collaborative and enterprising Occupier Services platform.
              </p>
              <Link
                href="/contact-us"
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white hover:text-white/90"
              >
                Learn more
                <span className="-mt-px text-sm font-bold leading-none" aria-hidden>
                  &gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
