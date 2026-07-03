import type { Metadata } from "next";
import LegalPageHero from "@/features/legal/LegalPageHero";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility Statement for the RE/MAX Commercial Philippines website, describing our commitment to accessible design and how to report barriers.",
};

const LAST_UPDATED = "July 3, 2026";

export default function AccessibilityStatementPage() {
  return (
    <main className="bg-white text-[#000759]">
      <LegalPageHero
        title="Accessibility Statement"
        description="Our commitment to making this website usable by everyone, including people with disabilities."
        lastUpdated={LAST_UPDATED}
      />

      <section className="mx-auto max-w-[900px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#000759] prose-p:text-[#2a3a5c] prose-a:text-[#23408e] prose-a:no-underline hover:prose-a:underline prose-li:text-[#2a3a5c] prose-strong:text-[#000759]">
          <h2>1. Our Commitment</h2>
          <p>
            RE/MAX Commercial Philippines (&ldquo;RE/MAX,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
            committed to ensuring digital accessibility for people with
            disabilities. We are continually improving the user experience
            for everyone and applying the relevant accessibility standards to
            this website (the &ldquo;Site&rdquo;).
          </p>

          <h2>2. Conformance Status</h2>
          <p>
            We aim for this Site to conform to the{" "}
            <strong>Web Content Accessibility Guidelines (WCAG) 2.1,
            Level AA</strong>. These guidelines explain how to make web
            content more accessible for people with disabilities and more
            user-friendly for everyone. Conformance with WCAG 2.1 is an
            ongoing effort; some parts of the Site may not yet fully meet
            this standard.
          </p>

          <h2>3. Accessibility Features</h2>
          <ul>
            <li>Semantic HTML landmarks and headings for navigation by screen readers.</li>
            <li>Descriptive alternative text for meaningful images.</li>
            <li>Keyboard-operable navigation, including the site menu and interactive components.</li>
            <li>Visible focus indicators on interactive elements.</li>
            <li>Support for reduced-motion preferences set at the operating system level.</li>
            <li>Labeled form fields with programmatic error identification.</li>
          </ul>

          <h2>4. Known Limitations</h2>
          <p>
            Despite our efforts, some content or functionality on the Site
            may not yet be fully accessible. Known limitations include
            content provided by third parties and pages that have not yet
            been reviewed. We are actively working to identify and address
            these issues.
          </p>

          <h2>5. Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of this Site. If
            you encounter an accessibility barrier or have suggestions for
            improvement, please contact us at{" "}
            <a href="mailto:metro.manila@remaxcommercial.ph">
              metro.manila@remaxcommercial.ph
            </a>
            . We try to respond to accessibility feedback within a reasonable
            timeframe.
          </p>

          <h2>6. Technical Specifications</h2>
          <p>
            This Site is built with modern web technologies and relies on
            HTML, CSS, and JavaScript, along with WAI-ARIA where semantic
            HTML alone is insufficient. Accessibility of this Site depends
            on the compatibility of your browser and any assistive
            technologies you use.
          </p>

          <h2>7. Updates to This Statement</h2>
          <p>
            We may update this Accessibility Statement as we continue to
            improve the Site. The &ldquo;Last updated&rdquo; date at the top
            of this page indicates when this statement was last revised.
          </p>
        </div>
      </section>
    </main>
  );
}
