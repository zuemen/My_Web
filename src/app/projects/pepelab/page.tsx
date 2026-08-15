import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Code, ExternalLink } from "lucide-react";
import PepeLabArchitecture from "@/components/PepeLabArchitecture";
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

const techStack = [
  "SSI",
  "W3C VC",
  "DID",
  "FHIR",
  "Selective disclosure",
  "FastAPI",
  "Python",
  "React",
  "Vite",
];

export default function PepeLabPage() {
  return (
    <main id="main-content" className={styles.main}>
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
          A decentralized credential verification system built on Self-Sovereign
          Identity standards, demonstrated on health records &mdash; the setting
          where re-submitting the same credential is most costly, and where the
          consequences of over-disclosing are most serious.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Problem</h2>
          <p className={styles.body}>
            Cross-institution digital credential verification in Taiwan&rsquo;s
            public sector lacks interoperable infrastructure; citizens must
            repeatedly submit the same credentials to different institutions.
            Health records make the cost concrete: a patient collecting
            medication, joining a study, or filing an insurance claim hands over
            far more of their record than any of those three actually needs.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Solution</h2>
          <p className={styles.body}>
            A three-party SSI system &mdash; hospital issuer, patient-held
            wallet, and verifier &mdash; in which the credential is issued once
            and each verifier receives only the fields its scope permits.
            Disclosure policies address individual fields by FHIR path, so
            &ldquo;medication pickup&rdquo; and &ldquo;research
            authorisation&rdquo; resolve to different subsets of the same
            credential, each gated behind its own minimum identity assurance
            level. The backend speaks the Ministry of Digital Affairs&rsquo;
            digital credential wallet sandbox protocol rather than a private
            scheme, so credentials stay interoperable outside the demo.
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>System Architecture</h2>
          <PepeLabArchitecture />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Demo</h2>
          <figure className={styles.demoFigure}>
            <Image
              src="/pepelab-demo.webp"
              alt="The verifier screen at the competition demo, offering three scenarios: medication pickup, research authorisation, and insurance application."
              width={880}
              height={572}
              sizes="(max-width: 768px) 100vw, 860px"
              className={styles.demoImage}
            />
            <figcaption className={styles.caption}>
              Scenario picker from the live demo. Each option requests a
              different subset of the same credential.
            </figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recognition</h2>
          <div className={styles.recognition}>
            <p className={styles.recognitionTitle}>
              Merit Award (<span lang="zh-Hant">學生組優選</span>)
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
