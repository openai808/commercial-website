import type { Metadata } from "next";
import Link from "next/link";
import LegalPageHero from "@/features/legal/LegalPageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for the RE/MAX Commercial 8 Philippines website, governed by the laws of the Republic of the Philippines.",
};

const LAST_UPDATED = "July 3, 2026";

export default function TermsOfUsePage() {
  return (
    <main className="bg-white text-[#000759]">
      <LegalPageHero
        title="Terms of Use"
        description="Please read these terms carefully before using the RE/MAX Commercial 8 Philippines website."
        lastUpdated={LAST_UPDATED}
      />

      <section className="mx-auto max-w-[900px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#000759] prose-p:text-[#2a3a5c] prose-a:text-[#23408e] prose-a:no-underline hover:prose-a:underline prose-li:text-[#2a3a5c] prose-strong:text-[#000759]">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using this website (the &ldquo;Site&rdquo;), you
            agree to be bound by these Terms of Use. If you do not agree with
            any part of these terms, please do not use the Site. RE/MAX
            Commercial 8 Philippines may revise these Terms of Use at any time
            as described in Section 12 below.
          </p>

          <h2>2. About This Website</h2>
          <p>
            RE/MAX Commercial 8 Philippines operates this Site as a marketing
            and listings platform to help users discover commercial and
            residential real estate opportunities and connect with
            Professional Regulation Commission (PRC)-licensed real estate
            brokers and salespersons. RE/MAX Commercial 8 Philippines is not
            itself a party to, and assumes no liability for, any property
            transaction that may result from your use of the Site. Any offer,
            reservation, sale, lease, or other transaction is between you and
            the relevant property developer, seller, lessor, or their duly
            licensed broker or salesperson.
          </p>

          <h2>3. Eligibility &amp; Acceptable Use</h2>
          <p>
            You agree to use the Site only for lawful purposes and in a
            manner consistent with these Terms of Use. You must not:
          </p>
          <ul>
            <li>
              Scrape, harvest, or extract listings or other content from the
              Site using automated means without prior written consent;
            </li>
            <li>
              Impersonate any person or entity, or misrepresent your
              affiliation with any person or entity;
            </li>
            <li>
              Interfere with or disrupt the Site, its servers, or networks
              connected to the Site; or
            </li>
            <li>
              Use the Site in any way that violates applicable Philippine
              law, including but not limited to the Cybercrime Prevention Act
              of 2012 (Republic Act No. 10175).
            </li>
          </ul>

          <h2>4. Property Listings &amp; Real Estate Services Disclaimer</h2>
          <p>
            Real estate brokerage and sales activity in the Philippines is
            regulated under the Real Estate Service Act of the Philippines
            (Republic Act No. 9646). Any transaction facilitated through this
            Site is performed by PRC-licensed real estate brokers or
            salespersons affiliated with RE/MAX Commercial 8 Philippines.
          </p>
          <p>
            Property listings, prices, floor areas, availability, images, and
            other details displayed on the Site are supplied by developers,
            sellers, lessors, or their brokers and are provided &ldquo;as
            is,&rdquo; without warranty of accuracy or completeness. Listings
            are subject to change, prior sale, lease, or withdrawal without
            notice. You are responsible for independently verifying all
            listing details, including a project&rsquo;s registration with
            the Department of Human Settlements and Urban Development
            (DHUSD, formerly HLURB) where applicable, and for conducting your
            own due diligence — including title verification and, where
            appropriate, professional legal and tax advice — before entering
            into any transaction.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, and
            the RE/MAX name and marks, is owned by RE/MAX Commercial 8
            Philippines or its licensors and is protected under the
            Intellectual Property Code of the Philippines (Republic Act No.
            8293). You may not reproduce, distribute, or create derivative
            works from any Site content without prior written permission.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            The Site may link to third-party websites operated by property
            developers or partners. RE/MAX Commercial 8 Philippines does not
            control and is not responsible for the content, availability, or
            practices of any third-party website.
          </p>

          <h2>7. Inquiries &amp; Communications</h2>
          <p>
            When you submit an inquiry, contact, or application form on the
            Site, your personal data is collected and processed in
            accordance with our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>, which forms
            part of these Terms of Use.
          </p>

          <h2>8. Disclaimer of Warranties &amp; Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, the Site is provided on
            an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis,
            without warranties of any kind, whether express or implied.
            RE/MAX Commercial 8 Philippines shall not be liable for any
            indirect, incidental, or consequential damages arising from your
            use of the Site or reliance on any listing information, except as
            required under the Civil Code of the Philippines or other
            applicable law.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold RE/MAX Commercial 8 Philippines,
            its officers, employees, and affiliated brokers harmless from
            any claim or demand arising out of your misuse of the Site or
            violation of these Terms of Use.
          </p>

          <h2>10. Suspension &amp; Termination of Access</h2>
          <p>
            RE/MAX Commercial 8 Philippines may suspend or terminate your
            access to the Site at any time, without notice, for conduct that
            violates these Terms of Use or is otherwise harmful to the Site
            or other users.
          </p>

          <h2>11. Governing Law &amp; Venue</h2>
          <p>
            These Terms of Use are governed by the laws of the Republic of
            the Philippines. Any dispute arising from or relating to these
            Terms of Use or your use of the Site shall be submitted to the
            exclusive jurisdiction of the proper courts of Makati City. Where
            applicable, electronic communications and consent given through
            the Site are recognized under the Electronic Commerce Act of 2000
            (Republic Act No. 8792).
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            RE/MAX Commercial 8 Philippines may update these Terms of Use from
            time to time. The &ldquo;Last updated&rdquo; date at the top of
            this page indicates when these terms were last revised. Continued
            use of the Site after changes take effect constitutes acceptance
            of the revised terms.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about these Terms of Use, please contact us
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
