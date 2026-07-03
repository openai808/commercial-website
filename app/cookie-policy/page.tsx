import type { Metadata } from "next";
import Link from "next/link";
import LegalPageHero from "@/features/legal/LegalPageHero";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for the RE/MAX Commercial 8 Philippines website, explaining what cookies are used and how to manage them.",
};

const LAST_UPDATED = "July 3, 2026";

export default function CookiePolicyPage() {
  return (
    <main className="bg-white text-[#000759]">
      <LegalPageHero
        title="Cookie Policy"
        description="How RE/MAX Commercial 8 Philippines uses cookies and similar technologies on this website."
        lastUpdated={LAST_UPDATED}
      />

      <section className="mx-auto max-w-[900px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#000759] prose-p:text-[#2a3a5c] prose-a:text-[#23408e] prose-a:no-underline hover:prose-a:underline prose-li:text-[#2a3a5c] prose-strong:text-[#000759]">
          <h2>1. Introduction</h2>
          <p>
            This Cookie Policy explains what cookies are, how RE/MAX
            Commercial 8 Philippines (&ldquo;RE/MAX,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses them on this website
            (the &ldquo;Site&rdquo;), and how you can manage your
            preferences. This policy should be read alongside our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>2. What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your device when you visit
            a website. They are widely used to make websites work, work more
            efficiently, and to provide information to the site owner about
            how the site is used.
          </p>

          <h2>3. Types of Cookies We Use</h2>
          <ul>
            <li>
              <strong>Essential cookies</strong> — necessary for the Site to
              function properly, such as remembering your cookie preferences
              and enabling core features. These cannot be disabled.
            </li>
            <li>
              <strong>Analytics cookies</strong> — help us understand how
              visitors interact with the Site, such as pages visited and time
              spent, so we can improve its performance and content.
            </li>
            <li>
              <strong>Functionality cookies</strong> — remember choices you
              make on the Site to provide a more personalized experience.
            </li>
          </ul>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies may be placed by third-party services we use, such
            as analytics or mapping providers. These third parties may use
            cookies in accordance with their own privacy policies, over which
            RE/MAX has no control.
          </p>

          <h2>5. Managing Cookies</h2>
          <p>
            Most browsers allow you to control cookies through their
            settings, including blocking or deleting cookies. Please note
            that disabling certain cookies may affect the functionality and
            your experience of the Site.
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. The
            &ldquo;Last updated&rdquo; date at the top of this page indicates
            when this policy was last revised. Continued use of the Site
            after changes take effect constitutes acknowledgment of the
            revised policy.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions about this Cookie Policy, please contact us
            at{" "}
            <a href="mailto:info@remaxcommercial.com.ph">
              info@remaxcommercial.com.ph
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
