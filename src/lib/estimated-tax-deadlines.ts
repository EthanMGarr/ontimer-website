import { SAVED_CALENDAR_APP_STORE_URL } from "./app-store-links";

export interface EstimatedTaxDeadline {
  id: "q1" | "q2" | "q3" | "q4";
  taxYear: number;
  scheduleStatus: "official" | "projected";
  installment: string;
  label: string;
  date: string;
  displayDate: string;
  period: string;
}
export interface EstimatedTaxReminderLead {
  id: "one_month" | "two_weeks" | "one_week" | "one_day" | "due_date";
  label: string;
  shortLabel: string;
  daysBefore?: number;
  monthsBefore?: number;
}

export interface EstimatedTaxReminderEvent {
  deadline: EstimatedTaxDeadline;
  reminder: EstimatedTaxReminderLead;
  start: Date;
}

export const ESTIMATED_TAX_REMINDER_LEADS: EstimatedTaxReminderLead[] = [
  { id: "one_month", label: "1 month before", shortLabel: "Start preparing", monthsBefore: 1 },
  { id: "two_weeks", label: "2 weeks before", shortLabel: "Preparation check-in", daysBefore: 14 },
  { id: "one_week", label: "1 week before", shortLabel: "Calculate and schedule", daysBefore: 7 },
  { id: "one_day", label: "1 day before", shortLabel: "Payment due tomorrow", daysBefore: 1 },
  { id: "due_date", label: "On the due date", shortLabel: "Final due-date backstop", daysBefore: 0 },
];

export const ESTIMATED_TAX_DEADLINES_2026: EstimatedTaxDeadline[] = [
  {
    id: "q1",
    taxYear: 2026,
    scheduleStatus: "official",
    installment: "First payment",
    label: "2026 estimated tax — first payment due",
    date: "2026-04-15",
    displayDate: "April 15, 2026",
    period: "Income earned January 1–March 31",
  },
  {
    id: "q2",
    taxYear: 2026,
    scheduleStatus: "official",
    installment: "Second payment",
    label: "2026 estimated tax — second payment due",
    date: "2026-06-15",
    displayDate: "June 15, 2026",
    period: "Income earned April 1–May 31",
  },
  {
    id: "q3",
    taxYear: 2026,
    scheduleStatus: "official",
    installment: "Third payment",
    label: "2026 estimated tax — third payment due",
    date: "2026-09-15",
    displayDate: "September 15, 2026",
    period: "Income earned June 1–August 31",
  },
  {
    id: "q4",
    taxYear: 2026,
    scheduleStatus: "official",
    installment: "Fourth payment",
    label: "2026 estimated tax — fourth payment due",
    date: "2027-01-15",
    displayDate: "January 15, 2027",
    period: "Income earned September 1–December 31",
  },
];

export const ESTIMATED_TAX_DEADLINES_2027: EstimatedTaxDeadline[] = [
  {
    id: "q1",
    taxYear: 2027,
    scheduleStatus: "projected",
    installment: "First payment",
    label: "2027 estimated tax — first payment due",
    date: "2027-04-15",
    displayDate: "April 15, 2027",
    period: "Income earned January 1–March 31",
  },
  {
    id: "q2",
    taxYear: 2027,
    scheduleStatus: "projected",
    installment: "Second payment",
    label: "2027 estimated tax — second payment due",
    date: "2027-06-15",
    displayDate: "June 15, 2027",
    period: "Income earned April 1–May 31",
  },
  {
    id: "q3",
    taxYear: 2027,
    scheduleStatus: "projected",
    installment: "Third payment",
    label: "2027 estimated tax — third payment due",
    date: "2027-09-15",
    displayDate: "September 15, 2027",
    period: "Income earned June 1–August 31",
  },
  {
    id: "q4",
    taxYear: 2027,
    scheduleStatus: "projected",
    installment: "Fourth payment",
    label: "2027 estimated tax — fourth payment due",
    date: "2028-01-18",
    displayDate: "January 18, 2028",
    period: "Income earned September 1–December 31",
  },
];

export const ESTIMATED_TAX_DEADLINES_2028: EstimatedTaxDeadline[] = [
  {
    id: "q1",
    taxYear: 2028,
    scheduleStatus: "projected",
    installment: "First payment",
    label: "2028 estimated tax — first payment due",
    date: "2028-04-17",
    displayDate: "April 17, 2028",
    period: "Income earned January 1–March 31",
  },
  {
    id: "q2",
    taxYear: 2028,
    scheduleStatus: "projected",
    installment: "Second payment",
    label: "2028 estimated tax — second payment due",
    date: "2028-06-15",
    displayDate: "June 15, 2028",
    period: "Income earned April 1–May 31",
  },
  {
    id: "q3",
    taxYear: 2028,
    scheduleStatus: "projected",
    installment: "Third payment",
    label: "2028 estimated tax — third payment due",
    date: "2028-09-15",
    displayDate: "September 15, 2028",
    period: "Income earned June 1–August 31",
  },
  {
    id: "q4",
    taxYear: 2028,
    scheduleStatus: "projected",
    installment: "Fourth payment",
    label: "2028 estimated tax — fourth payment due",
    date: "2029-01-16",
    displayDate: "January 16, 2029",
    period: "Income earned September 1–December 31",
  },
];

const IRS_SOURCE_URL = "https://www.irs.gov/faqs/estimated-tax";

export function deadlineStart(deadline: EstimatedTaxDeadline, time: string): Date {
  const [year, month, day] = deadline.date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, 0);
}

export function reminderStart(
  deadline: EstimatedTaxDeadline,
  reminder: EstimatedTaxReminderLead,
  time: string,
): Date {
  const date = deadlineStart(deadline, time);
  if (reminder.monthsBefore) date.setMonth(date.getMonth() - reminder.monthsBefore);
  if (reminder.daysBefore) date.setDate(date.getDate() - reminder.daysBefore);
  return date;
}

function formatUtcIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function formatFloatingIcsDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function getUpcomingEstimatedTaxReminderEvents(
  deadlines: EstimatedTaxDeadline[],
  reminders: EstimatedTaxReminderLead[],
  time: string,
  now: Date = new Date(),
): EstimatedTaxReminderEvent[] {
  return deadlines.flatMap((deadline) => reminders.flatMap((reminder) => {
    const start = reminderStart(deadline, reminder, time);
    return start >= now ? [{ deadline, reminder, start }] : [];
  }));
}

export function getActiveEstimatedTaxSchedule(
  primaryDeadlines: EstimatedTaxDeadline[],
  rolloverDeadlines: EstimatedTaxDeadline[],
  time: string,
  now: Date = new Date(),
) {
  const currentEvents = getUpcomingEstimatedTaxReminderEvents(
    primaryDeadlines,
    ESTIMATED_TAX_REMINDER_LEADS,
    time,
    now,
  );
  if (currentEvents.length > 0) {
    return { deadlines: primaryDeadlines, events: currentEvents, rolledForward: false };
  }
  return {
    deadlines: rolloverDeadlines,
    events: getUpcomingEstimatedTaxReminderEvents(
      rolloverDeadlines,
      ESTIMATED_TAX_REMINDER_LEADS,
      time,
      now,
    ),
    rolledForward: true,
  };
}

export function buildEstimatedTaxIcs(
  deadlines: EstimatedTaxDeadline[],
  reminders: EstimatedTaxReminderLead[],
  time: string,
  now: Date = new Date(),
): string {
  const events = getUpcomingEstimatedTaxReminderEvents(deadlines, reminders, time, now).flatMap(({ deadline, reminder, start }) => {
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const title = `${reminder.shortLabel}: ${deadline.installment.toLowerCase()} (${deadline.displayDate})`;
    const description = [
      `${reminder.label} reminder for the ${deadline.scheduleStatus} ${deadline.displayDate} estimated tax payment deadline.`,
      deadline.scheduleStatus === "official"
        ? "Confirm that the standard schedule applies to you before paying; special rules or relief may change your deadline."
        : `Confirm the deadline before paying because the IRS may update its ${deadline.taxYear} guidance.`,
      `IRS guidance: ${IRS_SOURCE_URL}`,
      `Turn this calendar event into an automatic alarm with OnTimer: ${SAVED_CALENDAR_APP_STORE_URL}`,
    ].join("\n\n");
    return [
      "BEGIN:VEVENT",
      `UID:estimated-tax-${deadline.taxYear}-${deadline.id}-${reminder.id}@ontimer.app`,
      `DTSTAMP:${formatUtcIcsDate(new Date("2026-11-07T12:00:00Z"))}`,
      `DTSTART:${formatFloatingIcsDate(start)}`,
      `DTEND:${formatFloatingIcsDate(end)}`,
      `SUMMARY:${escapeIcsText(title)}`,
      `DESCRIPTION:${escapeIcsText(description)}`,
      "END:VEVENT",
    ];
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OnTimer//Estimated Tax Deadlines//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}
