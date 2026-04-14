"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Award, Globe, Code } from 'lucide-react';
import styles from './Projects.module.css';

const projectData = [
  {
    title: "Digital Credential Scenario Innovation Challenge",
    category: "Award-winning Project (Merit Award)",
    description: "Led a team in a national competition hosted by the Ministry of Digital Affairs, Taiwan (數位發展部). Architected a decentralized identity (SSI) framework using VC and DID standards, specifically designed for FHIR-based medical data exchange. Ensured secure and seamless interoperability for patient-centric health records.",
    tags: ["SSI", "FHIR", "Medical Data", "VC/DID", "System Architecture"],
    image: "/digital_credential_new.jpg",
    link: "https://github.com/zuemen/pepelab_v2"
  },
  {
    title: "Real World Asset (RWA) Real Estate Tokenization",
    category: "Blockchain Implementation",
    description: "Developed a decentralized platform for real estate fractional ownership. Implemented PropertyToken for asset digitization and RentalDistributor for automated yield distribution. Integrated an IdentityRegistry to ensure regulatory compliance.",
    tags: ["Solidity", "RWA", "Fractional Ownership", "DeFi"],
    link: "https://github.com/zuemen/rwa-demo"
  },
  {
    title: "Quantum Machine Learning (QML) Simulation",
    category: "Quantum Research",
    description: "Explored hybrid quantum-classical algorithms for pattern recognition and financial data analysis. Implemented simulations using Qiskit to evaluate the potential of quantum speedup in machine learning tasks.",
    tags: ["QML", "Qiskit", "Python", "Simulation"],
    link: "https://github.com/zuemen/qc_ML"
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
          <p className={styles.subtitle}>Bridging emerging technologies with institutional needs.</p>
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
