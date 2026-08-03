import type { Metadata } from "next";
import Philosophy from "@/components/Philosophy";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Zuemen Chu's research areas: Self-Sovereign Identity (SSI/VC/DID), Smart Contract Security, RWA Tokenization, and Quantum Finance.",
};

export default function ResearchPage() {
  return (
    <main id="main-content" className={styles.main}>
      <Philosophy />
      <section className={styles.areas}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Research Focus</h2>
          <div className={styles.grid}>
            {[
              {
                area: "Self-Sovereign Identity (SSI/DID)",
                desc: "Researching decentralized identity standards (W3C DID, Verifiable Credentials) and their application to cross-institution credential verification, where citizens today must repeatedly re-submit the same credentials to different agencies.",
              },
              {
                area: "Smart Contract Security",
                desc: "Studying auditing methodologies for Solidity contracts. Research spans static analysis tools (Slither), manual review patterns, and formal verification approaches.",
              },
              {
                area: "RWA Tokenization (ERC-3643)",
                desc: "Investigating regulatory-compliant tokenization of real-world assets. Focus on identity-gated ownership structures and legal compliance frameworks for institutional DeFi.",
              },
              {
                area: "Quantum Finance & QML",
                desc: "Exploring variational quantum algorithms (VQE, QAOA) for financial optimization. Investigating quantum speedup potential in machine learning tasks using Qiskit and PennyLane.",
              },
            ].map((item) => (
              <div key={item.area} className={styles.areaCard}>
                <h3 className={styles.areaTitle}>{item.area}</h3>
                <p className={styles.areaDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
