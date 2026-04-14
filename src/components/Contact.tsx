"use client";

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  const contactLinks = [
    {
      name: "GitHub",
      icon: <Github size={24} />,
      url: "https://github.com/zuemen",
      label: "@zuemen"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/%E5%BB%B7%E7%BF%8A-%E6%9C%B1-95838538a/",
      label: "廷翊 (Andy) 朱"
    },
    {
      name: "Email",
      icon: <Mail size={24} />,
      url: "mailto:112306007@g.nccu.edu.tw",
      label: "112306007@g.nccu.edu.tw"
    }
  ];

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="glow-text">GET IN TOUCH</h2>
          <div className={styles.line}></div>
          <p className={styles.subtitle}>Open for research collaborations and technical discussions.</p>
        </motion.div>

        <div className={styles.grid}>
          {contactLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {link.icon}
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{link.name}</span>
                <span className={styles.label}>{link.label}</span>
              </div>
              <ExternalLink size={16} className={styles.arrow} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
