import Image from "next/image";

export default function AboutIntroHero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-14 md:px-10 md:py-20"
      aria-labelledby="about-intro-hero-heading"
    >
      <Image
        src="/images/about-hero-skyline.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-[40px]">
        <p className="text-center font-montserrat text-[15.95px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] sm:text-[17.95px] lg:text-[20.4742px]">
          About
        </p>
        <div className="mx-auto mt-3 h-[3px] w-[82.3894px] bg-red-600" aria-hidden />

        <div className="mt-10 grid items-start gap-10 px-0 py-8 sm:px-4 md:mt-14 md:grid-cols-2 md:gap-5 md:px-[40px] md:py-12">
          <div className="px-0 sm:px-4 md:px-[40px]">
            <div className="relative h-24 w-full max-w-sm md:h-28">
              <Image
                src="/REMAX Commercial White.png"
                alt="RE/MAX 8 Commercial"
                fill
                className="object-contain object-left"
                sizes="(min-width: 768px) 384px, 80vw"
              />
            </div>
            <div className="mt-6 space-y-4 text-[9px] leading-relaxed text-white/70 sm:text-[10px] lg:text-[11px]">
              <p>
                RE/MAX 8 Realty is a distinguished part of the global RE/MAX
                network, which comprises the finest real estate experts
                spanning across 8,000 offices in more than 110 countries and
                territories. With a wealth of experience, comprehensive
                training, and cutting-edge tools, we are fully equipped to
                cater to all your real estate requirements.
              </p>
              <p>
                At Re/Max 8 Realty, we take pride in being the preferred
                destination for real estate professionals. With over 45
                years of acclaimed achievements and a global presence,
                RE/MAX has established itself as a brand synonymous with
                trustworthiness. You can rely on us to deliver exceptional
                results and guide you through your real estate endeavors.
              </p>
            </div>
          </div>

          <div className="relative mx-auto h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] md:h-[355.925px] md:w-[355.925px]">
            <Image
              src="/images/remax-pin-mark.png"
              alt=""
              fill
              className="object-contain"
              sizes="(min-width: 768px) 356px, (min-width: 640px) 240px, 180px"
            />
          </div>
        </div>

        <h2 id="about-intro-hero-heading" className="sr-only">
          Our mission and vision
        </h2>
        <div className="mt-10 grid w-full gap-10 sm:gap-6 md:w-[70%] md:mx-auto md:grid-cols-2 md:gap-16">
          <div className="flex items-start gap-4">
            <div className="relative mt-1 h-7 w-7 shrink-0">
              <Image
                src="/images/icon-mission.png"
                alt=""
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <div>
              <h3 className="font-canva-sans text-[17px] font-semibold uppercase tracking-[0.08em] text-white sm:text-[20px] md:text-[22.9px]">
                Our Mission
              </h3>
              <p className="mt-2 text-[8.6px] leading-relaxed text-white/70 sm:text-[9.5px] lg:text-[10.5px]">
                Redefining real estate through exceptional service and <br />
                empowering clients to achieve their goals.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="relative mt-1 h-7 w-7 shrink-0">
              <Image
                src="/images/icon-vision.png"
                alt=""
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <div>
              <h3 className="font-canva-sans text-[17px] font-semibold uppercase tracking-[0.08em] text-white sm:text-[20px] md:text-[22.9px]">
                Our Vision
              </h3>
              <p className="mt-2 text-[8.6px] leading-relaxed text-white/70 sm:text-[9.5px] lg:text-[10.5px]">
                Leading the industry by going &ldquo;Beyond Real
                Estate&rdquo; with <br /> innovative solutions, trust, and
                transformative <br /> experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
