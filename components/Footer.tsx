import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/insights", label: "Insights" },
  { href: "/about-us", label: "About Us" },
];

const socialsItems = [
  {
    href: "https://www.linkedin.com/company/remax8philippines",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "https://www.facebook.com/remax8philippines",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/remax8philippinesofficial/",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.tiktok.com/@remax8philippines",
    label: "TikTok",
    icon: TikTokIcon,
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.325v21.351c0 .734.591 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.734 0 1.325-.59 1.325-1.324v-21.351c0-.734-.591-1.325-1.325-1.325z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38-.67.67-1.07 1.34-1.38 2.13-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.67 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.67-.67 1.07-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.67-1.34-1.07-2.13-1.38-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82c-.98-.86-1.53-2.1-1.53-3.42h-3.4v13.3a2.59 2.59 0 1 1-2.53-2.6c.24 0 .48.03.7.1V9.7a6 6 0 0 0-.7-.04A6.02 6.02 0 0 0 3.1 15.7 6.02 6.02 0 0 0 9.14 21.7a6.02 6.02 0 0 0 6.03-6.02V9.03a9.4 9.4 0 0 0 5.5 1.76V7.4a5.7 5.7 0 0 1-4.07-1.58z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: () => React.ReactElement;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white transition hover:opacity-80"
    >
      <Icon />
    </Link>
  );
}

/** Preserved for future re-introduction of the legal/copyright bar below the main footer. */
export function FooterLegalBar() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto flex flex-col md:flex-row md:justify-between gap-10 items-center px-12 py-8 text-sm">
      <nav aria-label="Footer policies">
        <ul className="flex flex-col sm:flex-row w-full justify-between items-center gap-4 sm:gap-12 md:gap-6">
          <li>
            <Link href="/cookie-policy" className="text-xs text-[#000759] hover:underline hover:text-[#000759]">
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy" className="text-xs text-[#000759] hover:underline hover:text-[#000759]">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms-of-use" className="text-xs text-[#000759] hover:underline hover:text-[#000759]">
              Terms of Use
            </Link>
          </li>
          <li>
            <Link href="/accessibility-statement" className="text-xs text-[#000759] hover:underline hover:text-[#000759]">
              Accessibility Statement
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-[#000759] text-xs">Copyright &copy; {year} RE/MAX 8 Commercial</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#000759]/15">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 lg:px-16">
        <div className="flex flex-col items-start gap-6">
          <Link href="/">
            <Image
              src="/logo_black.png"
              alt="RE/MAX"
              width={200}
              height={200}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <p className="font-gotham text-[length:clamp(10px,2vw,12px)] italic text-zinc-600">Beyond Real Estate.</p>
          <ul className="flex items-center gap-3">
            {socialsItems.map((item) => (
              <li key={item.label}>
                <SocialLink href={item.href} label={item.label} icon={item.icon} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-gotham text-[length:clamp(10px,2vw,12px)] font-bold uppercase tracking-wide text-[#000759]">
            Quick Links
          </h3>
          <ul className="mt-6 flex flex-col gap-3 md:gap-5">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-gotham text-[length:clamp(10px,2vw,12px)] uppercase tracking-wide text-[#000759] transition hover:font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-gotham text-[length:clamp(10px,2vw,12px)] font-bold uppercase tracking-wide text-[#000759]">
            Get in Touch
          </h3>
          <div className="font-gotham mt-6 flex flex-col gap-3 md:gap-5 text-[length:clamp(10px,2vw,12px)] text-[#000759]">
            <div>
              <p className="font-bold uppercase">Email</p>
              <Link href="mailto:inquire@remaxcommercial.com.ph" className="hover:underline">
                inquire@remaxcommercial.com.ph
              </Link>
            </div>
            <div>
              <p className="font-bold uppercase">Landline</p>
              <p>(02) 8924 0652</p>
            </div>
            <div>
              <p className="font-bold uppercase">Mobile</p>
              <p>0917 323 9921</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-gotham text-[length:clamp(10px,2vw,12px)] font-bold uppercase tracking-wide text-[#000759]">
            Office Address
          </h3>
          <p className="font-gotham mt-6 text-[length:clamp(10px,2vw,12px)] leading-relaxed text-[#000759]">
            Unit 2107 Alveo Park Triangle Tower, 32nd St and 11th Ave, Bonifacio Global City, Fort Bonifacio, Taguig
            City
          </p>
        </div>
      </div>
    </footer>
  );
}
