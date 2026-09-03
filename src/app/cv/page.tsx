import type { Metadata } from "next";
import { awards, formatAwardDate } from "@/data/awards";
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
          <p className={styles.entrySubtitle}>
            FinTech Specialization Program &mdash; admitted Fall 2026 (115-1);
            competitive admission, cohort expanded due to application volume
          </p>
        </section>

        {/* ── Experience ──
            Mirrors /experience — keep the two in step when either changes.
            Confidentiality: the Cathay entry carries unit, project name and
            dates only. Do not add scope or any technical detail. */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>

          <div className={styles.entryHeader}>
            <span className={styles.entryTitle}>
              Cathay Financial Holdings &mdash; Blockchain Intern
            </span>
            <span className={styles.entryPeriod}>Sep 2026 – Jun 2027</span>
          </div>
          <p className={styles.entrySubtitle}>
            Blockchain Technology Development Division, Digital Architecture
            Development Department | Taipei
          </p>
          <ul className={styles.projectList}>
            <li>Hot Wallet Research Project</li>
          </ul>

          <div className={`${styles.entryHeader} ${styles.entrySpaced}`}>
            <span className={styles.entryTitle}>
              National Chengchi University, MIS &mdash; Research Assistant
            </span>
            <span className={styles.entryPeriod}>May 2025 – Dec 2026</span>
          </div>
          <p className={styles.entrySubtitle}>
            Advisor: Prof. Feng-Yuan Chuang (
            <span lang="zh-Hant">莊豐源</span>)
          </p>
          <ul className={styles.projectList}>
            <li>Smart Contract Security and Auditing Mechanism Research</li>
            <li>AI + Quantum Computing (AI+QC) Research and Development Program</li>
          </ul>
          <ul className={styles.bulletList}>
            <li>
              Supported literature reviews, research analysis, and
              documentation for AI, quantum computing, and security-related
              research.
            </li>
            <li>
              Contributed to system development, testing, maintenance, and
              technical documentation.
            </li>
          </ul>

          <div className={`${styles.entryHeader} ${styles.entrySpaced}`}>
            <span className={styles.entryTitle}>
              Taiwan Association for Blockchain Ecosystem Innovation (TABEI)
              &mdash; Intern
            </span>
            <span className={styles.entryPeriod}>2026</span>
          </div>
          <p className={styles.entrySubtitle}>
            <span lang="zh-Hant">臺灣區塊鏈愛好者協會</span> | Taipei
          </p>
          <ul className={styles.projectList}>
            <li>Trustworthy AI Hackathon 2026 &mdash; Organizing Team</li>
          </ul>
          <ul className={styles.bulletList}>
            <li>
              Led planning and operations for the three-day event (Aug 29&ndash;31,
              2026) at N24 Taipei Ark, held under the guidance of the National
              Development Council as part of its policy research program on
              trustworthy AI, privacy computing and trust technology.
            </li>
            <li>
              Ran the intake and selection pipeline: 50 teams applied, 20
              advanced to the final round through written review, competing for
              a USD 12,000+ prize pool across six industry challenge tracks
              derived from one expert and two industry roundtables.
            </li>
            <li>
              Coordinated two pre-event workshops, team matchmaking, the
              participant handbook, and submission and judging rules for a panel
              of nine judges.
            </li>
            <li>
              Built and shipped the official event website (
              <a
                href="https://hackathon.chain.tw/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                hackathon.chain.tw
              </a>
              ).
            </li>
            <li>
              <strong>Outcome:</strong> Human ID took first place (USD 5,000);
              GLEIF co-presented a Trustworthy AI Governance Innovation Award.
              Selected work continues to the 11th Blockchain Enthusiasts Annual
              Conference and the annual policy white paper (
              <a
                href="https://abmedia.io/https-abmedia-io-trustworthy-ai-hackathon-winners"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                coverage
              </a>
              ).
            </li>
          </ul>
        </section>

        {/* ── Leadership & Awards ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Leadership &amp; Awards</h2>

          {awards.map((award) => (
            <div key={award.slug} className={styles.awardRow}>
              <div className={styles.entryHeader}>
                <span className={styles.entryTitle}>
                  {award.title}
                  {award.result ? ` — ${award.result}` : ""}
                </span>
                <span className={styles.entryPeriod}>
                  {formatAwardDate(award.date)}
                </span>
              </div>
              <p className={styles.entrySubtitle}>
                {award.role ? `${award.role} | ` : ""}
                {award.issuer}
                {award.certificateUrl && (
                  <>
                    {" | "}
                    <a
                      href={award.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineLink}
                    >
                      Certificate (PDF)
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}

          <div className={`${styles.entryHeader} ${styles.entrySpaced}`}>
            <span className={styles.entryTitle}>
              Digital Credential Scenario Innovation Challenge &mdash; project
              detail
            </span>
          </div>
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
