import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import UntilCalculator from "./UntilCalculator";
import { COUNTDOWN_OPTIONS, UNTIL_EVENTS } from "@/lib/until";
import "./until.css";

export const metadata: Metadata = {
  title: "Days Until Calculator",
  description: "Use this free calculator to find how many days, full weeks, extra days and approximate hours remain until any date, then add it to your calendar.",
  alternates: { canonical: "https://www.ontimer.app/days-until" },
};

export default function DaysUntilPage() {
  const groups = ["Popular", "Holidays", "Seasons", "Personal"] as const;
  const publishedEvents = new Map(UNTIL_EVENTS.map((event) => [event.slug, event]));

  return (
    <main className="until-page">
      <header className="until-hero">
        <div className="until-shell until-hero__grid">
          <div><h1>How many days until?</h1><p>Choose an event and date. We’ll count the days and help you add useful calendar reminders.</p></div>
          <Image className="until-hero__art" src="/images/countdowns/generic.png" alt="A cheerful calendar and clock" width={1254} height={1254} priority />
        </div>
      </header>

      <UntilCalculator />

      <section className="until-copy"><div className="until-shell">
        <h2>Popular countdowns</h2>
        <p>Start with a recurring date. Each published countdown rolls forward to its next occurrence automatically.</p>
        <div className="until-directory">{UNTIL_EVENTS.map((event) => <Link key={event.slug} href={`/days-until/${event.slug}`}><span>{event.shortName} countdown</span><span aria-hidden="true">→</span></Link>)}</div>
      </div></section>

      <section className="until-guide"><div className="until-shell">
        <h2>How the days-until calculator works</h2>
        <h3>What does the calculator count?</h3>
        <p>The main answer counts the number of calendar-day boundaries between your current local date and the date you choose. Today is not counted as a full day remaining. For example, if your event is tomorrow, the answer is one day.</p>
        <h3>How are weeks, extra days, and hours calculated?</h3>
        <p>Full weeks are groups of seven days. Extra days are what remain after those complete weeks, so 103 days is 14 full weeks and 5 extra days. Approximate hours use the actual time between now and midnight at the start of the target date. That number changes throughout the day, while the calendar-day answer stays the same until your local date changes.</p>
        <h3>What happens with recurring holidays?</h3>
        <p>For holidays with a fixed date, such as Christmas on December 25, the calculator selects the next occurrence. Once this year’s date has passed, it rolls forward to the following year. Holidays that move according to a calendar rule use their next calculated date. When a holiday depends on a religious or regional calendar that is not built into the calculator, you choose the date yourself.</p>
        <h3>Do time zones change the answer?</h3>
        <p>Your local time zone determines when today ends and the target date begins. Two people in different time zones can therefore see different hourly totals—and briefly different day totals—while counting down to the same printed date.</p>
        <h3>How do calendar milestones work?</h3>
        <p>You can add the target event by itself or include reminders 30 days, 10 days, and 1 day beforehand. The reminder bundle creates standard calendar events that Apple Calendar and Outlook can open; Google Calendar can import the same file on a computer. Choose only the milestones that give you a useful moment to plan or act.</p>
      </div></section>

      <section className="until-ideas"><div className="until-shell">
        <h2>50 things worth counting down to</h2>
        <p>Published countdowns are linked below. The other ideas stay as suggestions until there is a genuinely useful page for them.</p>
        <div className="until-ideas-grid">{groups.map((group) => <section key={group}><h3>{group}</h3><ul>{COUNTDOWN_OPTIONS.filter((option) => option.category === group).map((option) => { const published = publishedEvents.get(option.id); return <li key={option.id}>{published ? <Link href={`/days-until/${published.slug}`}>{option.label}</Link> : option.label}</li>; })}</ul></section>)}</div>
      </div></section>
    </main>
  );
}
