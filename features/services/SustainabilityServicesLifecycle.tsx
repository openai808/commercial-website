import Image from "next/image";
import Link from "next/link";

export default function SustainabilityServicesLifecycle() {
  return (
    <section
      id="sustainability-lifecycle"
      className="border-t border-[#e8ebf2] bg-white py-12 text-[#1f2d57] md:py-16"
      aria-labelledby="sustainability-lifecycle-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <nav
          aria-label="Sustainability services shortcuts"
          className="mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#23408e] md:mb-12"
        >
          <Link href="/services" className="hover:text-[#1a2d5c] hover:underline">
            Our services
          </Link>
          <span className="select-none text-[#c9ceda]" aria-hidden>
            |
          </span>
          <Link href="/contact-us" className="hover:text-[#1a2d5c] hover:underline">
            Contact an expert
          </Link>
        </nav>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative aspect-[5/4] w-full min-h-[240px] overflow-hidden bg-[#eef0f5] md:min-h-[320px]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Two colleagues reviewing information together on a tablet in an office"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="text-left">
            <h2
              id="sustainability-lifecycle-heading"
              className="text-2xl font-extralight leading-snug tracking-tight text-[#23408e] md:text-3xl lg:text-[2rem] lg:leading-tight"
            >
              Services that cover the full lifecycle of your sustainability strategy.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#3c4a76] md:text-lg md:leading-relaxed">
              We have the expertise to guide you through every stage of developing and
              implementing a comprehensive sustainability strategy for your real estate
              assets. Our team of specialists can help you establish measurable goals,
              integrate sustainable practices into your operations, and track your progress
              towards achieving your sustainability objectives. By leveraging our industry
              knowledge and data-driven insights, we empower you to enhance the long-term
              value of your portfolio while minimizing environmental impact and promoting
              responsible business practices.
            </p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex rounded-full bg-[#23408e] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1d3575]"
            >
              Connect with an expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
