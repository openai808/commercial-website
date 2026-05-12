import Image from "next/image";
import Link from "next/link";

/** Served from `/public/Our Impact Report.png` */
const IMPACT_IMAGE_SRC = "/Our%20Impact%20Report.png";

const textShadow =
  "drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]";

const minBand = "min-h-[min(88vw,440px)] md:min-h-[clamp(440px,52vw,600px)]";

export default function SustainabilityServicesCorporateBanner() {
  return (
    <section
      aria-labelledby="sustainability-corporate-heading"
      className="relative isolate w-full overflow-hidden"
    >
      <div className={`relative w-full ${minBand}`}>
        <Image
          src={IMPACT_IMAGE_SRC}
          alt="Sustainable high-rise architecture with integrated greenery"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />

        <div
          className={`relative z-10 flex w-full flex-col justify-center px-8 py-14 sm:px-10 md:absolute md:inset-y-0 md:left-0 md:h-full md:w-1/2 md:max-w-xl md:justify-center md:px-12 md:py-0 lg:pl-16 xl:pl-20 ${minBand} md:min-h-0`}
        >
          <div className={`w-full max-w-lg text-white ${textShadow}`}>
            <h2
              id="sustainability-corporate-heading"
              className="text-left text-3xl font-light leading-tight tracking-tight md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]"
            >
              Sustainability at REMAX/8
            </h2>
            <p className="mt-5 max-w-md text-left text-base font-normal leading-relaxed md:text-lg">
              Find out how we&apos;re progressing on our commitment to create a more sustainable
              future.
            </p>
            <Link
              href="/insights/sustainability"
              className={`group mt-8 inline-flex w-fit items-center gap-1.5 text-left text-sm font-bold uppercase tracking-[0.14em] text-white underline decoration-white underline-offset-[6px] ${textShadow}`}
            >
              Learn more
              <span
                className="translate-y-px text-base font-normal normal-case transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              >
                &gt;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
