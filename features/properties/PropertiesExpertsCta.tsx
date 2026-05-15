import Link from "next/link";

const EXPERTS_HREF = "/about-us/global-executive-leadership";

export default function PropertiesExpertsCta() {
  return (
    <div className="rounded-xl bg-[#23408e] px-6 py-8 text-center text-white md:py-10">
      <p className="mx-auto max-w-2xl text-sm leading-relaxed md:text-[15px] md:leading-7">
        Can&apos;t find what you are looking for? Many of our property listings are not on
        our website. For exclusive listings, please connect with an expert.
      </p>
      <Link
        href={EXPERTS_HREF}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#23408e] transition hover:bg-[#f0f4fa]"
      >
        View experts
      </Link>
    </div>
  );
}
