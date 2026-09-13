import Image from "next/image";
import Link from "next/link";
import { ANDROID_WAITLIST_URL } from "@/lib/constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const columns = [
  { title: "OnTimer", links: [["How it works", "/#how-it-works"], ["Features", "/features"], ["Frequently asked questions", "/faq"], ["Android waitlist", ANDROID_WAITLIST_URL]] },
  { title: "Plan your time", links: [["Time-to-Leave Calculator", "/what-time-should-i-leave"], ["Airport Time-to-Leave Calculator", "/airport-time-to-leave-calculator"], ["Cruise Time-to-Leave Calculator", "/cruise-terminal-time-calculators"], ["Wake-Up Time Calculator", "/wake-up-time-calculator"], ["Browse all calculators", "/time-calculators"]] },
  { title: "Medication schedules", links: [["Personal Medication Schedule", "/medication-schedule"], ["Caregiver Medication Schedule", "/caregiver-medication-schedule"], ["Pet Medication Schedule", "/veterinary-medication-schedule"]] },
  { title: "Learn and support", links: [["Calendar Alarm App", "/calendar-alarm-app"], ["Meeting Reminder App", "/meeting-reminder-app"], ["Persistent Calendar Reminders", "/persistent-calendar-reminders"], ["Time To Leave Reminders", "/time-to-leave-reminders"], ["Why notifications fail", "/why-calendar-notifications-fail"], ["Notifications vs alarms", "/calendar-notifications-vs-alarms"], ["The Last 5 Minutes Problem", "/last-5-minutes-problem"], ["Help center", "/help"], ["Privacy", "/OnTimer_Privacy_Policy.html"], ["Terms", "/OnTimer_Terms_of_Service.html"]] },
] as const;

export function Homepage2Footer() {
  return (
    <footer className="hp2-footer">
      <div className="hp2-footer__lead">
        <Image src="/images/homepage2/ontimer-wordmark.png" alt="OnTimer" width={238} height={158} />
        <p>
          OnTimer is an iPhone calendar alarm app that turns events from Google Calendar,
          Apple Calendar, and Microsoft 365 into automatic, persistent alarms, so you know
          when to join, leave, or act.
        </p>
      </div>
      <div className="hp2-footer__index">
        {columns.map((column) => <section key={column.title}><h2>{column.title}</h2><ul>{column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></section>)}
      </div>
      <div className="hp2-footer__meta"><span>© {new Date().getFullYear()} OnTimer</span><LanguageSwitcher compact /><a href="mailto:support@ontimer.app">support@ontimer.app</a></div>
    </footer>
  );
}
