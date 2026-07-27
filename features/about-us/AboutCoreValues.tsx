import type { ComponentType } from "react";
import Image from "next/image";

type CoreValue = {
  title: string;
  description: string;
  imageSrc: string;
  icon: ComponentType<{ className?: string }>;
  iconImageSrc?: string;
  badgeWidth: number;
  badgeHeight: number;
};

const BADGE_BLOB_VIEWBOX = "0 0 295.207 256";
const BADGE_BLOB_PATH =
  "M258.3063063063063,63.884684684684686C281.1392480172973,103.41421503423423 281.1392480172973,152.1245237045045 258.3063063063063,191.6540540540541C235.47124196324324,231.18725913369371 193.28348662774778,255.53873873873874 147.62919364036034,255.53873873873874L147.57801356684686,255.53873873873874C101.92372057945946,255.53873873873874 59.73596524396396,231.18725913369371 36.9009009009009,191.6540540540541C14.06795918990991,152.1245237045045 14.06795918990991,103.41421503423423 36.9009009009009,63.884684684684686C59.73596524396396,24.351479605045046 101.92372057945946,0 147.57801356684686,0L147.62919364036034,0C193.28348662774778,0 235.47124196324324,24.351479605045046 258.3063063063063,63.884684684684686Z";

function IconCollaboration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  );
}

function IconIntegrity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconExcellence({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.5l2.9 6.26L21 9.77l-5 4.87 1.8 6.86L12 17.77 6.2 21.5 8 14.64 3 9.77l6.1-1.01L12 2.5z" />
    </svg>
  );
}

const CORE_VALUES: CoreValue[] = [
  {
    title: "Integrity",
    description:
      "We uphold the highest standards of ethics, transparency, and honesty in all our interactions. We prioritize the trust and confidence of our clients and stakeholders, ensuring that every decision and action is guided by integrity.",
    imageSrc: "/images/core-value-integrity.jpg",
    icon: IconIntegrity,
    iconImageSrc: "/images/core-values/integrity.png",
    badgeWidth: 167.727,
    badgeHeight: 145.451,
  },
  {
    title: "Collaboration",
    description:
      "We foster a culture of collaboration, teamwork, and mutual respect. We believe in the power of collective wisdom and the strength that comes from working together. By nurturing relationships with clients, partners, and colleagues, we create an environment where collaboration thrives and success is shared.",
    imageSrc: "/images/core-value-collaboration.jpg",
    icon: IconCollaboration,
    iconImageSrc: "/images/core-values/collaboration.png",
    badgeWidth: 167.727,
    badgeHeight: 145.451,
  },
  {
    title: "Excellence",
    description:
      "We are committed to delivering excellence in everything we do. We strive for continuous improvement, embracing innovation, and leveraging our expertise to provide exceptional service, exceed expectations, and achieve outstanding results for our clients.",
    imageSrc: "/images/core-value-excellence.jpg",
    icon: IconExcellence,
    badgeWidth: 167.727,
    badgeHeight: 145.451,
  },
];

export default function AboutCoreValues() {
  return (
    <section
      className="bg-[#f7f8fb] pb-16 pt-14 text-[#000759] md:pb-20 md:pt-20"
      aria-labelledby="about-core-values-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mx-auto flex flex-col items-center">
          <h2
            id="about-core-values-heading"
            className="text-center font-montserrat text-[15.95px] font-semibold uppercase tracking-[0.2em] text-[#0c2749] sm:text-[17.95px] lg:text-[20.4742px]"
          >
            Core Values
          </h2>
          <div className="mt-3 h-[3px] w-[82.3894px] bg-red-600" aria-hidden />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-10 md:gap-16">
          {CORE_VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.title}
                className="h-auto w-full max-w-[349.35px] shrink-0 overflow-hidden rounded-none rounded-b-[28px] bg-white shadow-lg md:h-[584.402px] md:w-[349.35px]"
              >
                <div className="relative h-[220px] w-full">
                  <Image
                    src={value.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[#0c2749]/55" aria-hidden />
                  <h3 className="absolute inset-0 flex items-center justify-center text-center text-[26.6667px] font-semibold uppercase tracking-[0.1em] text-white">
                    {value.title}
                  </h3>
                  <div
                    className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2"
                    style={{ width: value.badgeWidth, height: value.badgeHeight }}
                  >
                    <svg
                      viewBox={BADGE_BLOB_VIEWBOX}
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d={BADGE_BLOB_PATH}
                        fill="#0c2749"
                        stroke="#ffffff"
                        strokeWidth={6}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {value.iconImageSrc ? (
                        <div className="relative h-1/2 w-1/2">
                          <Image
                            src={value.iconImageSrc}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="200px"
                          />
                        </div>
                      ) : (
                        <Icon className="h-1/2 w-1/2 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 px-6 pb-8 pt-[100px] text-center">
                  <div className="mx-auto flex items-center justify-center gap-1.5" aria-hidden>
                    <span className="h-[3px] w-8 bg-red-600" />
                    <span className="h-[3px] w-2.5 bg-red-600" />
                    <span className="h-[3px] w-1.5 bg-red-600" />
                  </div>
                  <p className="mt-4 text-[14.6667px] leading-relaxed text-[#2a3a5c]">
                    {value.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
