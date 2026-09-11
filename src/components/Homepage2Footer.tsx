import Image from "next/image";
import Link from "next/link";

const columns = [
  { title: "OnTimer", links: [["How it works", "/homepage2#how-it-works"], ["Features", "/features"], ["Frequently asked questions", "/faq"], ["Android waitlist", "/android"]] },
  { title: "Plan your time", links: [["Leave-time calculator", "/what-time-should-i-leave"], ["Airport time to leave", "/airport-time-to-leave-calculator"], ["Cruise terminal calculators", "/cruise-terminal-time-calculators"], ["Wake-up calculator", "/wake-up-time-calculator"], ["Browse all calculators", "/time-calculators"]] },
  { title: "Medication schedules", links: [["Personal medication schedule", "/medication-schedule"], ["Caregiver schedule", "/caregiver-medication-schedule"], ["Provider schedule", "/provider-medication-schedule"], ["Veterinary schedule", "/veterinary-medication-schedule"]] },
  { title: "Learn and support", links: [["Why notifications fail", "/why-calendar-notifications-fail"], ["Notifications vs alarms", "/calendar-notifications-vs-alarms"], ["The Last 5 Minutes Problem", "/last-5-minutes-problem"], ["Help center", "/help"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
] as const;

export function Homepage2Footer() {
  return (
    <footer className="hp2-footer">
      <div className="hp2-footer__lead"><Image src="/images/homepage2/ontimer-wordmark.png" alt="OnTimer" width={238} height={158} /><p>Calendars organize time. OnTimer protects it.</p></div>
      <div className="hp2-footer__index">
        {columns.map((column) => <section key={column.title}><h2>{column.title}</h2><ul>{column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></section>)}
      </div>
      <div className="hp2-footer__meta"><span>© {new Date().getFullYear()} OnTimer</span><a href="mailto:support@ontimer.app">support@ontimer.app</a></div>
    </footer>
  );
}
