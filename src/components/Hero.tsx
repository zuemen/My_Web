import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

const researchTags = [
  "Self-Sovereign Identity",
  "Smart Contract Security",
  "Blockchain & Fintech",
];

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundEffect} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.role}>
            Research Assistant · National Chengchi University MIS
          </p>
          <h1 className={styles.name}>
            <span>Zuemen Chu</span>
            <span className={styles.nameChinese} lang="zh-Hant">
              朱廷翊
            </span>
          </h1>
          <p className={styles.intro}>
            I work on the infrastructure that lets a credential be trusted
            without trusting whoever hands it to you &mdash; self-sovereign
            identity, and the contract security underneath it.
          </p>
          <div className={styles.tags} aria-label="Research areas">
            {researchTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.ctaGroup}>
            <Link href="/research" className={styles.primaryBtn}>
              See Research
            </Link>
            <Link href="/#contact" className={styles.secondaryBtn}>
              Contact
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.profileWrapper}>
            <Image
              src="/zuemen.jpg"
              alt="Profile photo of Zuemen Chu (朱廷翊)"
              width={300}
              height={450}
              priority
              sizes="(max-width: 640px) 250px, 300px"
              className={styles.profileImage}
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
