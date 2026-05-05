"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type BlogPost = {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Colliers among Best Companies to Work for in Asia in 2022",
    category: "A globally recognized employer",
    excerpt:
      "See how high-performing teams and market leadership create long-term value in Philippine real estate.",
    href: "/insights/colliers-best-companies-asia-2022",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Metro Manila office rents hold steady despite new supply",
    category: "Office market outlook",
    excerpt:
      "Tenant flight-to-quality continues while landlords focus on retention, fit-out support, and smarter lease terms.",
    href: "/insights/metro-manila-office-rents",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Industrial demand rises in major growth corridors",
    category: "Industrial trends",
    excerpt:
      "Warehousing and logistics operators are prioritizing scalable hubs near transport and consumption centers.",
    href: "/insights/industrial-demand-growth-corridors",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hospitality assets draw renewed investor interest",
    category: "Investment pulse",
    excerpt:
      "Tourism recovery supports stronger occupancy assumptions and a more active hotel transaction pipeline.",
    href: "/insights/hospitality-assets-investor-interest",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Retail expansion strategy shifts toward neighborhood formats",
    category: "Retail intelligence",
    excerpt:
      "Brands are diversifying footprints through right-sized stores and convenience-led customer experiences.",
    href: "/insights/retail-expansion-neighborhood-formats",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomeBlogSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleSliderScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }

    setScrollProgress(slider.scrollLeft / maxScroll);
  }, []);

  return (
    <section className="bg-[#f5f6f8] py-14 md:py-20">
      <div className="mx-auto w-full max-w-full px-6 sm:px-8 lg:px-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] md:text-xs">
          Market-leading real estate expertise
        </p>
        <h2 className="mt-3 font-serif text-2xl font-normal leading-snug tracking-tight text-[#243768] md:text-4xl md:leading-tight">
          See how we accelerate success
        </h2>

        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          className="mt-8 flex h-[22rem] w-full snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-[24rem] md:cursor-pointer md:snap-none"
        >
          {BLOG_POSTS.map((post) => (
            <article
              key={post.title}
              className="group relative min-w-[85vw] snap-start flex-none overflow-hidden transition-all duration-700 ease-out md:min-w-[64px] md:flex-[1] md:hover:flex-[5]"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 85vw, 20vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 overflow-hidden px-4 pb-4 pt-16 text-white md:px-6 md:pb-6">
                <div className="md:hidden">
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/90">
                    {post.category}
                  </p>
                </div>

                <div className="hidden max-w-0 translate-x-6 opacity-0 transition-all duration-500 ease-out group-hover:max-w-xl group-hover:translate-x-0 group-hover:opacity-100 md:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-lg leading-tight md:text-3xl">{post.title}</h3>
                  <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/90 md:text-sm">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.href}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white md:text-sm"
                  >
                    Read article
                    <span aria-hidden="true" className="h-px w-6 bg-white" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 h-4 md:hidden">
          <div className="relative h-2 w-full overflow-hidden bg-[#d7def3]">
            <span
              className="absolute left-0 top-0 h-full bg-[#2459d3] transition-transform duration-150 ease-out"
              style={{
                width: "22%",
                transform: `translateX(${scrollProgress * (100 - 22)}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
