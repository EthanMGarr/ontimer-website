import Link from "next/link";
import styles from "./KTVUProof.module.css";

const KTVU_STORY_URL = "https://www.ktvu.com/video/fmc-c62rzvs90bao7eq2";

interface KTVUProofProps {
  variant?: "homepage" | "airport";
}

export function KTVUProof({ variant = "homepage" }: KTVUProofProps) {
  return (
    <section
      className={`${styles.section} ${variant === "airport" ? styles.airport : ""}`}
      aria-labelledby={`ktvu-proof-heading-${variant}`}
      data-ktvu-proof={variant}
    >
      <div className={styles.inner}>
        <div className={styles.source}>
          <span className={styles.liveMark} aria-hidden="true" />
          <span>Featured on KTVU FOX 2</span>
        </div>
        <div className={styles.story}>
          <h2 id={`ktvu-proof-heading-${variant}`}>
            “App relieving holiday airport stress”
          </h2>
          <p>
            KTVU spoke with OnTimer founder Ethan Garr about the free airport calculator and finding a specific time to leave.
          </p>
        </div>
        <div className={styles.links}>
          <a href={KTVU_STORY_URL} target="_blank" rel="external noopener noreferrer">
            Watch the KTVU segment <span aria-hidden="true">↗</span>
          </a>
          <Link href="/press">OnTimer press <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
