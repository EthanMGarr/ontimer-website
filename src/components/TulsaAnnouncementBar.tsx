import Link from "next/link";
import styles from "./KTVUAnnouncementBar.module.css";

const TULSA_CALCULATOR_URL =
  "/airport-time-to-leave/tulsa-tul?utm_source=ontimer_home&utm_medium=site_banner&utm_campaign=tulsa_tv_interview_2026&utm_content=tul_airport_calculator";

export const TULSA_ANNOUNCEMENT_START_MS = Date.parse("2026-11-16T05:00:00Z");
export const TULSA_ANNOUNCEMENT_END_MS = Date.parse("2026-11-21T05:00:00Z");

export function isTulsaAnnouncementActive(now = Date.now()): boolean {
  return now >= TULSA_ANNOUNCEMENT_START_MS && now < TULSA_ANNOUNCEMENT_END_MS;
}

export function TulsaAnnouncementBar() {
  return (
    <aside className={styles.banner} aria-label="Tulsa airport calculator announcement">
      <Link className={styles.link} href={TULSA_CALCULATOR_URL}>
        <span>Welcome FOX23 Tulsa viewers: Calculate when to leave for TUL →</span>
      </Link>
    </aside>
  );
}
