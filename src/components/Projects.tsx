"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Award, Globe, Code } from 'lucide-react';
import styles from './Projects.module.css';

const projectData = [
  {
    title: "Real World Asset (RWA) Real Estate Tokenization",
    category: "Blockchain Implementation",
    description: "Developed a decentralized platform for real estate fractional ownership. Implemented PropertyToken for asset digitization and RentalDistributor for automated yield distribution. Integrated an IdentityRegistry to ensure regulatory compliance and whitelisting for investors.",
    tags: ["Solidity", "RWA", "Fractional Ownership", "DeFi"],
    link: "https://github.com/zuemen/rwa-demo"
  },
  {
    title: "Digital Credential Scenario Innovation Challenge",
    category: "Award-winning Project (Merit Award)",
    description: "Led a team in a national competition hosted by the Ministry of Digital Affairs. Architected the overall system framework for a decentralized identity (SSI) platform, overseeing the integration of VC and DID standards. Managed backend development and coordinated frontend synchronization to ensure a cohesive and secure user experience.",
    tags: ["SSI", "Verifiable Credentials", "DID", "System Architecture", "Leadership"],
    image: "/award_ceremony.jpg",
    link: "https://github.com/zuemen/pepelab_v2"
  },
  {
    title: "Quantum Computing & AI Research (AI+QC)",
    category: "Research Assistant @ NCCU",
    description: "Contributing to the AI + Quantum Computing Research and Development Program. Assisting with research support, literature review for quantum-classical hybrid systems, and providing technical/administrative assistance in project implementation and documentation.",
    tags: ["Quantum Algorithms", "Qiskit", "Research", "AI+QC"],
    image: "/working.jpg"
  },
  {
    title: "Smart Contract Security & Auditing Research",
    category: "Research Assistant @ NCCU",
    description: "Conducting in-depth research on smart contract security and auditing mechanisms. Supported system development, maintenance, and documentation for secure decentralized auditing frameworks.",
    tags: ["Solidity", "Blockchain Security", "Smart Contracts", "Auditing"]
  }
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
          <h2 className="glow-text">RESEARCH & COMPETITIONS</h2>
          <p className={styles.subtitle}>Bringing technical specifications into cross-institution interoperability.</p>
        </motion.div>

        <div className={styles.list}>
          {projectData.map((project, index) => (
            <motion.div 
              key={index}
              className={styles.projectItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {project.image && (
                <div className={styles.projectImageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.projectImage} />
                </div>
              )}
              <div className={styles.projectInfo}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.link && (
                    <a href={project.link} className={styles.linkIcon} target="_blank" rel="noopener noreferrer"><Code size={20} /></a>
                  )}
                  <a href="#" className={styles.linkIcon}><Award size={20} /></a>
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
