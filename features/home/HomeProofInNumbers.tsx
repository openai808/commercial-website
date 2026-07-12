"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type ProofStat = {
  value: string;
  label: string;
};

type HomeProofInNumbersProps = {
  stats?: ProofStat[];
};

const DEFAULT_STATS: ProofStat[] = [
  { value: "$80,000,000", label: "Worth of deals transacted" },
  { value: "$700,000,000", label: "Value of active listings" },
  { value: "500", label: "Real estate projects" },
  { value: "1,304", label: "Closed deals in cumulative years" },
];

const DIGIT_ROWS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const REEL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

function DigitReel({
  digit,
  active,
  delayMs,
}: {
  digit: string;
  active: boolean;
  delayMs: number;
}) {
  const target = Number(digit);

  return (
    <span
      className="relative inline-block h-[1em] w-[0.62em] overflow-hidden tabular-nums"
      aria-hidden
    >
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-[transform,opacity] duration-[1400ms] motion-reduce:transition-none"
        style={{
          transform: `translateY(${active ? -target : 0}em) scale(${active ? 1 : 0.98})`,
          opacity: active ? 1 : 0.8,
          transitionTimingFunction: REEL_EASING,
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {DIGIT_ROWS.map((row) => (
          <span key={row} className="h-[1em] leading-[1em]">
            {row}
          </span>
        ))}
      </span>
    </span>
  );
}

function AnimatedStatValue({ value }: { value: string }) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{value}</span>
      <span ref={wrapperRef} aria-hidden className="inline-flex items-end">
        {[...value].map((char, i) => {
          const delayMs = i * 90;
          const isDigit = /\d/.test(char);

          return (
            <span
              key={i}
              className={`inline-block h-[1em] leading-[1em] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                revealed
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-[10px] scale-[0.98] opacity-0"
              }`}
              style={{ transitionDelay: `${delayMs}ms` }}
            >
              {isDigit ? (
                <DigitReel digit={char} active={revealed} delayMs={delayMs} />
              ) : (
                char
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
}

export default function HomeProofInNumbers({
  stats = DEFAULT_STATS,
}: HomeProofInNumbersProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineInView, setLineInView] = useState(false);

  useLayoutEffect(() => {
    const el = lineRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full bg-white pt-16 pb-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center sm:px-8 lg:px-12">
        <p className="font-montserrat text-[12px] font-normal uppercase tracking-[0.28em] text-[#243768] sm:text-[13.5px] lg:text-[15.4px]">
          Proof in numbers
        </p>
        <div
          ref={lineRef}
          className={`mt-4 h-[3px] w-12 origin-bottom bg-red-600 transition-all duration-700 ease-out ${
            lineInView
              ? "translate-y-0 scale-y-100 opacity-100"
              : "translate-y-3 scale-y-0 opacity-0"
          }`}
          aria-hidden
        />

        <dl className="mt-16 grid w-full grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 md:gap-y-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dd className="font-montserrat text-[20px] font-extrabold tracking-normal text-[rgb(12,39,73)] sm:text-[26px] md:text-[30px] lg:text-[34.4px]">
                <AnimatedStatValue value={stat.value} />
              </dd>
              <dt className="font-gotham mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:text-[11px] lg:text-[12.5px]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
