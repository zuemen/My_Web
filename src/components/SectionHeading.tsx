"use client";

import { useState } from "react";
import SignedText, { fingerprint } from "./SignedText";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Heading level, so pages keep a sensible h1→h2→h3 order. */
  as?: "h1" | "h2";
  /** Full-width header above its content, instead of the left rail. */
  wide?: boolean;
}

/**
 * One section header for the whole site. News, Skills, Contact and Experience
 * each carried their own copy of a centred title plus a 40px accent bar —
 * four near-identical blocks that made every section read like the same
 * landing-page template. This replaces all of them.
 *
 * Page titles (as="h1") arrive as a hash and verify into the title once per
 * session, then show a quiet signature line under did:web:zuemen.net — the
 * site's one recurring nod to verifiable credentials. Section titles (h2) stay
 * plain.
 */
const SectionHeading = ({
  title,
  subtitle,
  as: Tag = "h2",
  wide = false,
}: SectionHeadingProps) => {
  const [verified, setVerified] = useState(false);
  const signed = Tag === "h1";

  return (
    <header className={`${styles.header} ${wide ? styles.wide : ""}`}>
      <Tag className={styles.title}>
        {signed ? (
          <SignedText text={title} trigger="view" onceKey={title} onVerified={() => setVerified(true)} />
        ) : (
          title
        )}
      </Tag>
      {signed && (
        <p className={`${styles.signature} ${verified ? styles.signatureOn : ""}`} aria-hidden="true">
          <span className={styles.check}>✓</span> signed · did:web:zuemen.net · 0x{fingerprint(title).slice(0, 8)}
        </p>
      )}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default SectionHeading;
