"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Award, ArrowRight } from "lucide-react";
import styles from "./Projects.module.css";

interface Project {
  title: string;
  category: string;
  description: string;
  /** What the project actually produced or resolved — not just the stack used. */
  outcome: string;
  tags: string[];
  image?: string;
  link?: string;
  certificateUrl?: string;
  caseStudyUrl?: string;
}

const projectData: Project[] = [
  {
    title: "PepeLab — Decentralized Credential Verification",
    category: "Award-winning Project (Merit Award)",
    description:
      "Led a team in a national competition hosted by the Ministry of Digital Affairs, Taiwan (數位發展部). Cross-agency credential verification in the public sector lacks interoperable infrastructure, forcing citizens to re-submit the same credentials to every institution. Architected a decentralized identity platform on SSI, VC, and DID standards to make those credentials verifiable across institutions.",
    outcome:
      "Merit Award (學生組優選) at the Digital Credential Scenario Innovation Challenge, Nov 2025. Delivered a working credential verification system and translated government interoperability requirements into implementable technical specifications.",
    tags: ["SSI", "VC/DID", "FastAPI", "Python", "System Architecture"],
    image: "/digital_credential_new.jpg",
    link: "https://github.com/zuemen/pepelab_v2",
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
    caseStudyUrl: "/projects/pepelab",
  },
  {
    title: "Real World Asset (RWA) Real Estate Tokenization",
    category: "Blockchain Implementation",
    description:
      "Developed a decentralized platform for real estate fractional ownership. Implemented PropertyToken for asset digitization and RentalDistributor for automated yield distribution. Integrated an IdentityRegistry to ensure regulatory compliance.",
    // TODO(zuemen): replace with a concrete outcome. To write this I need:
    //   1. Was it deployed? Which testnet, and is there a contract address?
    //   2. Contract / test counts, or any audit-tool run (e.g. Slither) results.
    //   3. What the demo can actually do end-to-end (mint → transfer → payout?).
    //   4. Any evaluation or coursework result this was submitted for.
    outcome:
      "Demonstrates an end-to-end path from asset digitization to automated yield distribution with identity-gated transfers, showing how ERC-3643-style compliance constraints can be enforced at the contract level rather than off-chain.",
    tags: ["Solidity", "RWA", "Fractional Ownership", "DeFi"],
    link: "https://github.com/zuemen/rwa-demo",
  },
  {
    title: "Quantum Machine Learning (QML) Simulation",
    category: "Quantum Research",
    description:
      "Explored hybrid quantum-classical algorithms for pattern recognition and financial data analysis. Implemented simulations using Qiskit to evaluate the potential of quantum speedup in machine learning tasks.",
    // TODO(zuemen): replace with a concrete outcome. To write this I need:
    //   1. Which dataset(s), and the classical baseline you compared against.
    //   2. Headline numbers (accuracy / qubit count / circuit depth), if any.
    //   3. The actual finding — did the hybrid approach help, or was the
    //      conclusion that it did not at this scale? A negative result is
    //      still a result and reads fine to a committee.
    outcome:
      "Produced a reproducible Qiskit simulation harness for benchmarking hybrid quantum-classical models against classical baselines on financial data.",
    tags: ["QML", "Qiskit", "Python", "Simulation"],
    link: "https://github.com/zuemen/qc_ML",
  },
];

const Projects = () => {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Research &amp; Projects</h2>
          <p className={styles.subtitle}>
            Bridging emerging technologies with institutional needs.
          </p>
        </motion.div>

        <div className={styles.list}>
          {projectData.map((project) => (
            <motion.div
              key={project.title}
              className={styles.projectItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {project.image && (
                <div className={styles.projectImageWrapper}>
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={480}
                    height={270}
                    sizes="(max-width: 768px) 100vw, 480px"
                    className={styles.projectImage}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className={styles.projectInfo}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.outcome}>
                  <span className={styles.outcomeLabel}>Outcome</span>
                  <p className={styles.outcomeText}>{project.outcome}</p>
                </div>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.caseStudyUrl && (
                    <Link
                      href={project.caseStudyUrl}
                      className={styles.caseStudyLink}
                    >
                      Read case study <ArrowRight size={14} />
                    </Link>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className={styles.linkIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <Code size={20} />
                    </a>
                  )}
                  {project.certificateUrl && (
                    <a
                      href={project.certificateUrl}
                      className={styles.linkIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Award Certificate (PDF)"
                    >
                      <Award size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
