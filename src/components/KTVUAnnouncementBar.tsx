import Link from "next/link";
import styles from "./KTVUAnnouncementBar.module.css";

const KTVU_HOMEPAGE_URL =
  "https://www.ontimer.app/KTVU?utm_source=ontimer_home&utm_medium=site_banner&utm_campaign=ktvu_interview";

/** Temporary homepage campaign banner. Remove this component after the KTVU segment. */
export function KTVUAnnouncementBar() {
  return (
    <aside className={styles.banner} aria-label="KTVU viewer announcement">
      <Link className={styles.link} href={KTVU_HOMEPAGE_URL}>
        <span>Watching KTVU? Calculate when to leave for SFO, OAK or SJC →</span>
      </Link>
    </aside>
  );
}
