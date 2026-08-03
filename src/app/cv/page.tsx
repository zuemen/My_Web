import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum Vitae of Ting-Yi Chu (Zuemen) — Research Assistant at NCCU MIS. Experience in quantum computing, blockchain, and secure digital identity.",
};

const skills = [
  { category: "Programming", value: "Python, Java, JavaScript, SQL" },
  {
    category: "Backend & Systems",
    value: "FastAPI, REST APIs, System Architecture, Database Design",
  },
  {
    category: "Artificial Intelligence & Quantum",
    value:
      "Machine Learning, PyTorch, LLM Applications, Agentic AI, Quantum Computing, Quantum Machine Learning",
  },
  { category: "Quantum Tools", value: "Qiskit, Quantum Algorithms" },
  {
    category: "Blockchain & Security",
    value:
      "Self-Sovereign Identity (SSI), Decentralized Identifiers (DID), Verifiable Credentials (VC)",
  },
  { category: "DevOps & Tools", value: "Git, GitHub, Linux" },
  {
    category: "Information Systems",
    value: "Business Process Analysis, System Integration, Data Management",
  },
];

export default function CVPage() {
  return (
    <main id="main-content" className={styles.main}>
      <article className={styles.cv}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <h1 className={styles.name}>Ting-Yi Chu</h1>
          <p className={styles.contact}>
            <span>Taipei, Taiwan</span>
            <span className={styles.sep}>|</span>
            <a href="mailto:112306007@g.nccu.edu.tw">
              112306007@g.nccu.edu.tw
            </a>
            <span className={styles.sep}>|</span>
            <a href="https://zuemen.net" target="_blank" rel="noopener noreferrer">
              zuemen.net
            </a>
            <span className={styles.sep}>|</span>
            <a href="https://github.com/zuemen" target="_blank" rel="noopener noreferrer">
              github.com/zuemen
            </a>
          </p>
        </header>

        {/* ── Professional Summary ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className={styles.body}>
            Management Information Systems student at National Chengchi
            University with a strong interest in artificial intelligence,
            quantum computing, information systems, and secure digital identity
            technologies. Experienced in backend development, system
            integration, and research support across AI, quantum computing,
            blockchain, and security-related projects. Proven leadership as
            Team Leader in a national digital credential innovation competition,
            translating user needs into technical solutions and coordinating
            system development. Eager to apply emerging technologies to
            practical, real-world systems.
          </p>
        </section>

        {/* ── Education ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.entryHeader}>
            <span className={styles.entryTitle}>
              National Chengchi University, Taipei, Taiwan
            </span>
            <span className={styles.entryPeriod}>Sep 2023 – Present</span>
          </div>
          <p className={styles.entrySubtitle}>
            B.B.A. in Management Information Systems
          </p>
          <p className={styles.entrySubtitle}>
            Artificial Intelligence Interdisciplinary Micro-Program
          </p>
        </section>

        {/* ── Experience ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.entryHeader}>
            <span className={styles.entryTitle}>Research Assistant</span>
          </div>
          <p className={styles.entrySubtitle}>Research Projects</p>
          <ul className={styles.projectList}>
            <li>AI + Quantum Computing (AI+QC) Research and Development Program</li>
            <li>Smart Contract Security and Auditing Mechanism Research</li>
          </ul>
          <ul className={styles.bulletList}>
            <li>
              Supported literature reviews, research analysis, and
              documentation for AI, quantum computing, and security-related
              research.
            </li>
            <li>
              Assisted with AI + Quantum Computing (AI+QC) project
              implementation, technical coordination, and research support.
            </li>
            <li>
              Contributed to system development, testing, maintenance, and
              technical documentation.
            </li>
          </ul>
        </section>

        {/* ── Leadership & Awards ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Leadership &amp; Awards</h2>
          <div className={styles.entryHeader}>
            <span className={styles.entryTitle}>
              Digital Credential Scenario Innovation Challenge &mdash; Merit Award
            </span>
          </div>
          <p className={styles.entrySubtitle}>
            Team Leader | Hosted by the Ministry of Digital Affairs, Taiwan
          </p>
          <ul className={styles.bulletList}>
            <li>
              Led a team to design a practical digital identity scenario with
              real-world public-sector application potential.
            </li>
            <li>
              Designed the overall system architecture for a decentralized
              identity platform based on SSI, VC, and DID standards.
            </li>
            <li>
              Coordinated backend development and frontend integration to
              deliver a secure and coherent user experience.
            </li>
            <li>
              Guided the project from requirements analysis and technology
              selection to final implementation.
            </li>
            <li>
              Translated complex government and interoperability requirements
              into clear technical specifications.
            </li>
            <li>
              <strong>Project:</strong> Decentralized identity credential
              verification system (SSI / VC / DID)
            </li>
            <li>
              <strong>Repository:</strong>{" "}
              <a
                href="https://github.com/zuemen/pepelab_v2"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                github.com/zuemen/pepelab_v2
              </a>
            </li>
          </ul>
        </section>

        {/* ── Technical Skills ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <div className={styles.skillsTable}>
            {skills.map(({ category, value }) => (
              <div key={category} className={styles.skillRow}>
                <span className={styles.skillCat}>{category}</span>
                <span className={styles.skillDivider} aria-hidden="true" />
                <span className={styles.skillVal}>{value}</span>
              </div>
            ))}
          </div>
        </section>

      </article>
    </main>
  );
}
