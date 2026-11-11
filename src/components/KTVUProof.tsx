import Link from "next/link";
import styles from "./KTVUProof.module.css";

const KTVU_STORY_URL = "https://www.ktvu.com/video/fmc-c62rzvs90bao7eq2";

interface KTVUProofProps {
  variant?: "homepage" | "airport";
  locale?: "en" | "es";
}

export function KTVUProof({ variant = "homepage", locale = "en" }: KTVUProofProps) {
  const copy = locale === "es" ? {
    source: "Presentado en KTVU FOX 2",
    heading: "“Una app que reduce el estrés de viajar en avión”",
    body: "KTVU habló con Ethan Garr, fundador de OnTimer, sobre la calculadora gratuita para aeropuertos y cómo encontrar una hora concreta para salir.",
    watch: "Ver el segmento de KTVU",
    press: "Prensa de OnTimer",
  } : {
    source: "Featured on KTVU FOX 2",
    heading: "“App relieving holiday airport stress”",
    body: "KTVU spoke with OnTimer founder Ethan Garr about the free airport calculator and finding a specific time to leave.",
    watch: "Watch the KTVU segment",
    press: "OnTimer press",
  };
  return (
    <section
      className={`${styles.section} ${variant === "airport" ? styles.airport : ""}`}
      aria-labelledby={`ktvu-proof-heading-${variant}`}
      data-ktvu-proof={variant}
    >
      <div className={styles.inner}>
        <div className={styles.source}>
          <span className={styles.liveMark} aria-hidden="true" />
          <span>{copy.source}</span>
        </div>
        <div className={styles.story}>
          <h2 id={`ktvu-proof-heading-${variant}`}>
            {copy.heading}
          </h2>
          <p>
            {copy.body}
          </p>
        </div>
        <div className={styles.links}>
          <a href={KTVU_STORY_URL} target="_blank" rel="external noopener noreferrer">
            {copy.watch} <span aria-hidden="true">↗</span>
          </a>
          <Link href="/press">{copy.press} <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
