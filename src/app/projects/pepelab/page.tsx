import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Code,
  ExternalLink,
  MonitorPlay,
  Network,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "PepeLab — Decentralized Credential Verification",
  description:
    "A decentralized identity credential verification system built on SSI, VC, and DID standards for cross-institution credential exchange. Merit Award, Digital Credential Scenario Innovation Challenge (Ministry of Digital Affairs, Taiwan).",
};

const roleHighlights = [
  "Designed the overall system architecture for the SSI platform",
  "Oversaw integration of VC and DID standards",
  "Managed backend development and coordinated frontend integration",
  "Steered the project from requirement analysis and tech stack selection through to deployment",
  "Translated government interoperability requirements into technical specs",
];

const techStack = ["SSI", "VC", "DID", "FastAPI", "Python"];

export default function PepeLabPage() {
  return (
    <main className={styles.main}>
      <article className={styles.container}>
        <Link href="/projects" className={styles.backLink}>
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        <span className={styles.category}>
          Award-winning Project · Team Leader
        </span>
        <h1 className={styles.title}>
          PepeLab — Decentralized Credential Verification
        </h1>
        <p className={styles.lead}>
          A decentralized identity credential verification system built on
          Self-Sovereign Identity standards, enabling verifiable credential
          exchange across public-sector institutions.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Problem</h2>
          <p className={styles.body}>
            Cross-agency digital credential verification in Taiwan&rsquo;s
            public sector lacks interoperable infrastructure; citizens must
            repeatedly submit the same credentials to different institutions.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Solution</h2>
          <p className={styles.body}>
            A decentralized identity credential verification system built on
            SSI, VC, and DID standards, enabling verifiable cross-institution
            credential exchange.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            My Role <span className={styles.roleLabel}>— Team Leader</span>
          </h2>
          <ul className={styles.bulletList}>
            {roleHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* TODO(zuemen): replace this placeholder with the system architecture
            diagram. Drop the file in /public (e.g. /pepelab-architecture.png)
            and swap this block for a next/image <Image> with width/height and
            a descriptive alt. */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>System Architecture</h2>
          <div className={styles.placeholder}>
            <Network size={28} />
            <p className={styles.placeholderText}>
              Architecture diagram to be added.
            </p>
          </div>
        </section>

        {/* TODO(zuemen): replace this placeholder with the demo video or UI
            screenshots. For a video, prefer a poster image + <video> or an
            embedded link; for screenshots, reuse the <Image> pattern above. */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Demo</h2>
          <div className={styles.placeholder}>
            <MonitorPlay size={28} />
            <p className={styles.placeholderText}>
              Demo video / walkthrough screenshots to be added.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recognition</h2>
          <div className={styles.recognition}>
            <p className={styles.recognitionTitle}>
              Merit Award (學生組優選)
            </p>
            <p className={styles.recognitionMeta}>
              Digital Credential Scenario Innovation Challenge, hosted by the
              Ministry of Digital Affairs, Taiwan &mdash; Nov 2025
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tech Stack</h2>
          <div className={styles.tags}>
            {techStack.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Links</h2>
          <div className={styles.links}>
            <a
              href="https://github.com/zuemen/pepelab_v2"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              <Code size={16} /> github.com/zuemen/pepelab_v2
              <ExternalLink size={12} />
            </a>
            <a
              href="/awards/moda-digital-credential-2025-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              <Award size={16} /> Award certificate (PDF)
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
