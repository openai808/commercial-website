import Image from "next/image";
import Link from "next/link";

const SOCIAL_ICON_TINT_FILTER =
  "brightness(0) saturate(100%) invert(8%) sepia(98%) saturate(5567%) hue-rotate(244deg) brightness(67%) contrast(131%)";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/inverstor-relations", label: "Investor Relations" },
  { href: "/feedback", label: "Feedback" },
];

const socialsItems = [
  { href: "/linkedin", label: "About", img: "/logo-linkedin.png" },
  { href: "/twitter", label: "News", img: "/logo-twitter.svg" },
  { href: "/facebook", label: "Investor Relations", img: "/facebook.png" },
  { href: "/instagram", label: "Feedback", img: "/Instagram-logo-footer.png" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto flex w-full items-center border-b-1 border-[#000759] justify-between px-6 py-2 text-sm">
        <div className="mx-auto flex flex-col md:flex-row gap-12 w-full items-center justify-between px-7 py-7">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <Image
                src="/REMAX Commercial Logo.png"
                alt="RE/MAX"
                width={200}
                height={200}
                // className="h-8 w-auto sm:h-10 md:h-12"
                priority
              />
            </Link>

            <nav aria-label="Footer navigation">
              <ul className="flex flex-col sm:flex-row items-center gap-6 text-xl font-medium text-zinc-700 dark:text-zinc-300">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="relative pb-2 text-[#000759] font-medium
                      after:absolute after:left-0 after:-bottom-1
                      after:h-[2px] after:w-0 after:bg-[#000759]
                      after:transition-all after:duration-300
                      hover:after:w-full hover:font-bold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center">
            <ul className="flex items-center gap-8 text-xl font-medium text-zinc-700 dark:text-zinc-300">
              {socialsItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors text-[#000759] hover:underline hover:font-bold"
                  >
                    <Image
                      src={item.img}
                      alt={item.label}
                      width={20}
                      height={20}
                      // className="h-8 w-auto sm:h-10 md:h-12"
                      style={{ filter: SOCIAL_ICON_TINT_FILTER }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col md:flex-row md:justify-between gap-10 items-center px-12 py-8 text-sm">
        <nav aria-label="Footer policies">
          <ul className="flex flex-col sm:flex-row w-full justify-between items-center gap-4 sm:gap-12 md:gap-6">
            <li>
              <a href="#" className="hover:underline hover:text-[#000759]">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-[#000759]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-[#000759]">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-[#000759]">
                Accessibility Statement
              </a>
            </li>
          </ul>
        </nav>
        <p>Copyright &copy; {year} RE/MAX</p>
      </div>
    </footer>
  );
}
