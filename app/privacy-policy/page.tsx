import type { Metadata } from "next";
import LegalPageHero from "@/features/legal/LegalPageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for the RE/MAX Commercial Philippines website, in compliance with the Data Privacy Act of 2012 (RA 10173).",
};

const LAST_UPDATED = "July 3, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-[#000759]">
      <LegalPageHero
        title="Privacy Policy"
        description="How RE/MAX Commercial Philippines collects, uses, and protects your personal data."
        lastUpdated={LAST_UPDATED}
      />

      <section className="mx-auto max-w-[900px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#000759] prose-p:text-[#2a3a5c] prose-a:text-[#23408e] prose-a:no-underline hover:prose-a:underline prose-li:text-[#2a3a5c] prose-strong:text-[#000759]">
          <h2>1. Introduction &amp; Scope</h2>
          <p>
            RE/MAX Commercial Philippines (&ldquo;RE/MAX,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
            committed to protecting your personal data in compliance with the
            Data Privacy Act of 2012 (Republic Act No. 10173), its
            Implementing Rules and Regulations, and the issuances of the
            National Privacy Commission (NPC). This Privacy Policy explains
            how we collect, use, disclose, and protect personal data
            submitted through this website (the &ldquo;Site&rdquo;).
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following categories of personal data:</p>
          <ul>
            <li>
              <strong>Inquiry &amp; contact information</strong> — name,
              email address, phone number, and message content submitted
              through our contact and property inquiry forms;
            </li>
            <li>
              <strong>Career application information</strong> — name, email,
              phone number, and resume/CV or other application materials
              submitted through our careers pages;
            </li>
            <li>
              <strong>Technical &amp; usage data</strong> — information such
              as browser type and pages visited, collected automatically
              through cookies and similar technologies.
            </li>
          </ul>

          <h2>3. How We Collect It</h2>
          <p>
            We collect personal data directly from you when you fill out a
            form on the Site (such as a property inquiry, contact form, or
            job application), and automatically through standard site
            analytics and cookies as you browse the Site.
          </p>

          <h2>4. Purpose &amp; Legal Basis for Processing</h2>
          <p>We process your personal data to:</p>
          <ul>
            <li>
              Respond to your inquiry and connect you with the relevant
              PRC-licensed real estate broker or salesperson (necessary to
              take steps at your request prior to entering into a
              transaction);
            </li>
            <li>Evaluate and process career applications you submit;</li>
            <li>
              Send you marketing communications, but only where you have
              given your separate, optional consent via the marketing
              checkbox on our forms;
            </li>
            <li>
              Comply with legal or regulatory obligations under Philippine
              law.
            </li>
          </ul>

          <h2>5. Sharing &amp; Disclosure</h2>
          <p>
            We share personal data internally with the RE/MAX Commercial
            Philippines broker or office handling your inquiry, and, where
            necessary to act on your inquiry, with the relevant property
            developer, seller, or lessor. We do not sell your personal data
            to third parties. We may disclose personal data where required
            by law, court order, or a lawful request from a government
            authority.
          </p>

          <h2>6. Data Storage, Retention &amp; Security</h2>
          <p>
            We implement reasonable organizational, physical, and technical
            security measures to protect personal data, consistent with NPC
            Circular 16-01 on Personal Data Security. Personal data is
            retained only for as long as necessary to fulfill the purpose for
            which it was collected, or as required by applicable law.
          </p>

          <h2>7. Cookies</h2>
          <p>
            The Site uses essential and analytics cookies to operate and
            improve your browsing experience. You may control or disable
            cookies through your browser settings; note that some parts of
            the Site may not function properly if cookies are disabled.
          </p>

          <h2>8. Your Rights as a Data Subject</h2>
          <p>
            Under Sections 16 and 18 of the Data Privacy Act of 2012, you
            have the right to:
          </p>
          <ul>
            <li>Be informed that your personal data is being processed;</li>
            <li>Access your personal data that we hold;</li>
            <li>
              Object to the processing of your personal data, including
              processing for marketing purposes;
            </li>
            <li>Correct or rectify inaccurate personal data;</li>
            <li>
              Request erasure or blocking of your personal data where it is
              incomplete, outdated, unlawfully obtained, or no longer
              necessary for the purpose it was collected;
            </li>
            <li>Data portability, where technically feasible;</li>
            <li>
              Be indemnified for damages sustained due to inaccurate,
              incomplete, outdated, false, unlawfully obtained, or
              unauthorized use of your personal data; and
            </li>
            <li>
              File a complaint with the National Privacy Commission (NPC).
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the
            details in Section 10 below.
          </p>

          <h2>9. Children&rsquo;s Privacy</h2>
          <p>
            The Site is not directed at children, and we do not knowingly
            collect personal data from minors. If you believe a minor has
            provided us with personal data, please contact us so we can
            remove it.
          </p>

          <h2>10. How to Reach Us / Data Protection Contact</h2>
          <p>
            For questions, concerns, or requests regarding this Privacy
            Policy or your personal data, please contact us at{" "}
            <a href="mailto:metro.manila@remaxcommercial.ph">
              metro.manila@remaxcommercial.ph
            </a>
            . You may also file a complaint directly with the National
            Privacy Commission at{" "}
            <a
              href="https://www.privacy.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.privacy.gov.ph
            </a>
            .
          </p>

          <h2>11. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The
            &ldquo;Last updated&rdquo; date at the top of this page indicates
            when this policy was last revised. Continued use of the Site
            after changes take effect constitutes acknowledgment of the
            revised policy.
          </p>
        </div>
      </section>
    </main>
  );
}
