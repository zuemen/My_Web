"use client";

import { useLang } from "@/i18n/LanguageProvider";
import styles from "./Philosophy.module.css";

const Philosophy = () => {
  const { lang } = useLang();

  return (
    <section id="about" className={styles.philosophy}>
      <div className={styles.container}>
        <div
          className={styles.content}
        >
          {/* h1: this is the top-level heading of /research, the only page
              that renders Philosophy. */}
          <h1 className={styles.heading}>
            {lang === "en" ? "About Me & Research Philosophy" : "關於我與研究理念"}
          </h1>
          <div className={styles.textBlock}>
            {lang === "en" ? (
              <>
                <p>
                  I am a <strong>Management Information Systems</strong> student
                  at National Chengchi University (NCCU) working on{" "}
                  <strong>blockchain trust infrastructure</strong> &mdash;{" "}
                  <strong>Self-Sovereign Identity</strong>,{" "}
                  <strong>Smart Contract Security</strong>, and their
                  application in fintech.
                </p>
                <p>
                  My work bridges the gap between social institutional needs
                  and hard tech. Current research spans decentralized identity
                  standards (<strong>W3C DID</strong> and{" "}
                  <strong>Verifiable Credentials</strong>), auditing
                  methodologies for Solidity contracts, and the legal compliance
                  of <strong>ERC-3643</strong> in RWA tokenization. I also keep
                  an adjacent interest in{" "}
                  <strong>quantum finance and QML</strong>, explored through
                  coursework and my lab&rsquo;s AI+QC program.
                </p>
                <p>
                  I approach research with the belief that emerging technology
                  becomes transformative only when it intersects with real
                  institutional constraints &mdash; regulatory frameworks,
                  interoperability standards, and human-centered design.
                </p>
              </>
            ) : (
              <>
                <p>
                  我是國立政治大學<strong>資訊管理學系</strong>的學生，研究方向是
                  <strong>區塊鏈信任基礎建設</strong>——
                  <strong>自主權身分</strong>、<strong>智慧合約安全</strong>
                  ，以及它們在金融科技上的應用。
                </p>
                <p>
                  我的工作在社會制度需求與硬科技之間搭橋。目前的研究涵蓋去中心化身分標準（
                  <strong>W3C DID</strong> 與<strong>可驗證憑證</strong>
                  ）、Solidity 合約的稽核方法，以及 RWA 代幣化中{" "}
                  <strong>ERC-3643</strong>{" "}
                  的法遵設計。另外透過課程與實驗室的 AI+QC 計畫，延伸關注
                  <strong>量子金融與量子機器學習</strong>。
                </p>
                <p>
                  我相信新興技術只有在碰上真實的制度限制時才會真正產生改變——法規框架、互通標準，以及以人為本的設計。
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
