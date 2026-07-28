import Image from "next/image";

type AboutHeroProps = {
  title: string;
};

export default function AboutHero({ title }: AboutHeroProps) {
  return (
    <section className="relative flex min-h-[420px] items-center overflow-hidden min-[861px]:min-h-[600px]">
      <Image
        src="/images/hero/hero-handshake.png"
        alt=""
        fill
        preload
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/[0.28]" aria-hidden />
      <div className="relative text-center mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <h1 className="text-[clamp(28px,4.4vw,56px)] font-bold leading-[1.15] text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
