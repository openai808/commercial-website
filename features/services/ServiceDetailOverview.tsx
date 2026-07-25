import Image from "next/image";

type ServiceDetailOverviewProps = {
  heading: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

const END_CROP = "polygon(0% 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)";

function DashedUnderline({
  className = "",
  sizes = [49.3, 13, 6.4],
  gap = 6.1,
  reverse = false,
  cropEnd = false,
}: {
  className?: string;
  sizes?: [number, number, number];
  gap?: number;
  reverse?: boolean;
  cropEnd?: boolean;
}) {
  return (
    <div
      className={`flex items-center ${
        reverse ? "flex-row-reverse" : "flex-row"
      } ${className}`}
      style={{ gap }}
      aria-hidden
    >
      <span
        className="h-[3px] bg-red-600"
        style={{ width: sizes[0], clipPath: cropEnd ? END_CROP : undefined }}
      />
      <span className="h-[3px] bg-red-600" style={{ width: sizes[1] }} />
      <span className="h-[3px] bg-red-600" style={{ width: sizes[2] }} />
    </div>
  );
}

function SolidLine({
  className = "",
  width = 270,
  cropEnd = false,
}: {
  className?: string;
  width?: number;
  cropEnd?: boolean;
}) {
  return (
    <div
      className={`h-[3px] bg-red-600 ${className}`}
      style={{ width, clipPath: cropEnd ? END_CROP : undefined }}
      aria-hidden
    />
  );
}

export default function ServiceDetailOverview({
  heading,
  body,
  imageSrc,
  imageAlt = "",
}: ServiceDetailOverviewProps) {
  if (imageSrc) {
    return (
      <section
        aria-labelledby="service-detail-overview-heading"
        className="w-full bg-white px-6 py-16 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start text-left">
            <p className="font-gotham text-[12px] font-normal uppercase tracking-[0.32em] text-[#0c2749] sm:text-[13.5px] lg:text-[15.4px]">
              Overview
            </p>
            <DashedUnderline className="mt-4" />
            <div className="ml-5">
              <h2
                id="service-detail-overview-heading"
                className="font-gotham-condensed mt-8 text-[24px] font-extrabold uppercase leading-[1.1] tracking-tight text-[#0c2749] sm:text-[28px] md:text-[32px]"
              >
                {heading}
              </h2>
              <p className="font-gotham mt-6 text-[14px] font-normal leading-relaxed text-slate-600 md:text-[15px]">
                {body}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div
              className="relative aspect-[3/2] w-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 83%, 87% 100%, 0% 100%)",
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
            <div className="mr-[13%] flex flex-col gap-2">
              <DashedUnderline
                className="mt-6 self-end mr-6"
                sizes={[100, 21.5, 12.5]}
                gap={6.3}
                reverse
                cropEnd
              />
              <SolidLine className="mt-2 self-end mr-12" width={190} cropEnd />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="service-detail-overview-heading"
      className="w-full bg-white px-6 py-16 text-center md:py-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="font-gotham text-[12px] font-normal uppercase tracking-[0.32em] text-[#0c2749] sm:text-[13.5px] lg:text-[15.4px]">
          Overview
        </p>
        <DashedUnderline className="mt-4" />
        <h2
          id="service-detail-overview-heading"
          className="font-gotham-condensed mt-8 text-[24px] font-extrabold uppercase leading-[1.1] tracking-tight text-[#0c2749] sm:text-[28px] md:text-[32px]"
        >
          {heading}
        </h2>
        <p className="font-gotham mt-6 text-[14px] font-normal leading-relaxed text-slate-600 md:text-[15px]">
          {body}
        </p>
      </div>
    </section>
  );
}
