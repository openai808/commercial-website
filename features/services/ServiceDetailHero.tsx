"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type ServiceDetailHeroProps = {
  title: string;
  tagline: string;
  imageSrc?: string;
  /** Substring of `title` the red underline should align under (e.g. "epres" in "Representation"). Falls back to a fixed-width bar when omitted or not found. */
  underlineTarget?: string;
};

export default function ServiceDetailHero({
  title,
  tagline,
  imageSrc = "/images/section3.jpg",
  underlineTarget,
}: ServiceDetailHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);
  const [underlineRect, setUnderlineRect] = useState<{ left: number; width: number } | null>(null);

  const matchIndex = underlineTarget ? title.indexOf(underlineTarget) : -1;
  const titleParts =
    matchIndex === -1 || !underlineTarget
      ? null
      : {
          before: title.slice(0, matchIndex),
          match: underlineTarget,
          after: title.slice(matchIndex + underlineTarget.length),
        };

  useLayoutEffect(() => {
    if (!titleParts || !containerRef.current || !targetRef.current) {
      setUnderlineRect(null);
      return;
    }

    const measure = () => {
      if (!containerRef.current || !targetRef.current) return;
      const containerBox = containerRef.current.getBoundingClientRect();
      const targetBox = targetRef.current.getBoundingClientRect();
      setUnderlineRect({
        left: targetBox.left - containerBox.left,
        width: targetBox.width,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [title, underlineTarget]);

  return (
    <section aria-labelledby="service-detail-hero-title" className="w-full">
      <div className="relative flex h-[220px] flex-col items-center justify-center px-6 py-8 text-center text-white sm:h-[260px] md:h-[300px] md:px-16 md:py-10">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0c2749]/85 via-[#0c2749]/55 to-[#0c2749]/30"
          aria-hidden
        />
        <div ref={containerRef} className="relative mx-auto flex max-w-2xl flex-col items-center">
          <h1
            id="service-detail-hero-title"
            className="whitespace-nowrap text-[clamp(1.75rem,4vw,47.95px)] font-extralight uppercase leading-tight tracking-[0.25em]"
          >
            {titleParts ? (
              <>
                {titleParts.before}
                <span ref={targetRef}>{titleParts.match}</span>
                {titleParts.after}
              </>
            ) : (
              title
            )}
          </h1>
          <div
            className={underlineRect ? "mt-8 h-[3px] self-start bg-red-600" : "mt-8 h-[3px] w-16 bg-red-600"}
            style={underlineRect ? { marginLeft: underlineRect.left, width: underlineRect.width } : undefined}
            aria-hidden
          />
          <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-white/95 md:text-base md:leading-relaxed">
            {tagline.split("\n").map((line, i, arr) => (
              <span key={line}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
