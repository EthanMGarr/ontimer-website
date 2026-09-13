export type UntilEvent = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
  dateRule: string;
  planningNote: string;
  relatedSlugs: string[];
  nextDate: (from: Date) => Date;
};

function localStart(year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, day, 0, 0, 0, 0);
}

function nextAnnualDate(from: Date, monthIndex: number, day: number): Date {
  const thisYear = localStart(from.getFullYear(), monthIndex, day);
  return thisYear >= localStart(from.getFullYear(), from.getMonth(), from.getDate())
    ? thisYear
    : localStart(from.getFullYear() + 1, monthIndex, day);
}

function nthWeekday(year: number, monthIndex: number, weekday: number, occurrence: number): Date {
  const first = localStart(year, monthIndex, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return localStart(year, monthIndex, 1 + offset + (occurrence - 1) * 7);
}

function nextThanksgiving(from: Date): Date {
  const today = localStart(from.getFullYear(), from.getMonth(), from.getDate());
  const thisYear = nthWeekday(from.getFullYear(), 10, 4, 4);
  return thisYear >= today ? thisYear : nthWeekday(from.getFullYear() + 1, 10, 4, 4);
}

function lastWeekday(year: number, monthIndex: number, weekday: number): Date {
  const last = localStart(year, monthIndex + 1, 0);
  return localStart(year, monthIndex, last.getDate() - ((last.getDay() - weekday + 7) % 7));
}

function nextCalculatedAnnual(from: Date, calculate: (year: number) => Date): Date {
  const today = localStart(from.getFullYear(), from.getMonth(), from.getDate());
  const thisYear = calculate(from.getFullYear());
  return thisYear >= today ? thisYear : calculate(from.getFullYear() + 1);
}

function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return localStart(year, month - 1, day);
}

export const UNTIL_EVENTS: UntilEvent[] = [
  {
    slug: "christmas",
    name: "Christmas",
    shortName: "Christmas",
    description: "We can’t wait either! See how many days are left until Christmas, then add Christmas Day and a few helpful reminders to your calendar.",
    image: "/images/countdowns/christmas.png",
    imageAlt: "A decorated Christmas tree with wrapped presents",
    dateRule: "Christmas Day is always December 25, although the day of the week changes each year.",
    planningNote: "Thirty days is useful for travel, gifts, or shipping deadlines; ten days gives you a final planning window; and one day is a simple prompt for anything that must be ready before Christmas morning.",
    relatedSlugs: ["new-years-day", "thanksgiving"],
    nextDate: (from) => nextAnnualDate(from, 11, 25),
  },
  {
    slug: "new-years-day",
    name: "New Year’s Day",
    shortName: "New Year’s Day",
    description: "Ready for a fresh start? Count down to January 1, then put New Year’s Day and a few helpful reminders on your calendar.",
    image: "/images/countdowns/new-years-day.png",
    imageAlt: "A midnight clock with fireworks and confetti",
    dateRule: "New Year’s Day is always January 1, immediately after New Year’s Eve.",
    planningNote: "A 30-day reminder can start travel or celebration planning, ten days can catch reservations and supplies, and one day gives you time to prepare before midnight and January 1 arrive.",
    relatedSlugs: ["christmas", "thanksgiving"],
    nextDate: (from) => nextAnnualDate(from, 0, 1),
  },
  {
    slug: "halloween",
    name: "Halloween",
    shortName: "Halloween",
    description: "Costumes at the ready! See how many days are left until Halloween, then add October 31 and a few reminders to your calendar.",
    image: "/images/countdowns/halloween.png",
    imageAlt: "A cheerful jack-o’-lantern beneath a crescent moon",
    dateRule: "Halloween is always October 31, although the day of the week changes each year.",
    planningNote: "Thirty days gives you time for costumes and plans, ten days is useful for final purchases or invitations, and one day helps you remember last-minute decorating and trick-or-treat preparation.",
    relatedSlugs: ["thanksgiving", "christmas"],
    nextDate: (from) => nextAnnualDate(from, 9, 31),
  },
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    shortName: "Thanksgiving",
    description: "Bring on the pie! Count down to Thanksgiving, then add the big day and a few planning reminders to your calendar.",
    image: "/images/countdowns/thanksgiving.png",
    imageAlt: "A fall harvest arrangement with a pumpkin, corn, and colorful leaves",
    dateRule: "In the United States, Thanksgiving falls on the fourth Thursday in November, so its date changes each year.",
    planningNote: "Thirty days works well for travel and guest plans, ten days can cover shopping and meal coordination, and one day is a practical prompt for preparation that cannot wait until Thanksgiving morning.",
    relatedSlugs: ["christmas", "new-years-day"],
    nextDate: nextThanksgiving,
  },
  {
    slug: "summer",
    name: "the first day of summer",
    shortName: "Summer",
    description: "Sunshine is on the way! Count down to June 21, then add the first day of summer and a few reminders to your calendar.",
    image: "/images/countdowns/summer.png",
    imageAlt: "A bright sun, ocean wave, and beach umbrella",
    dateRule: "This calculator uses June 21 as the first day of summer and rolls forward to the next June 21 after that date passes.",
    planningNote: "A 30-day reminder can start trip or activity planning, ten days helps with reservations and supplies, and one day gives you a final prompt before the season begins.",
    relatedSlugs: ["new-years-day", "christmas"],
    nextDate: (from) => nextAnnualDate(from, 5, 21),
  },
];

export function getUntilEvent(slug: string): UntilEvent | undefined {
  return UNTIL_EVENTS.find((event) => event.slug === slug);
}

export function getUntilSearchSummary(event: UntilEvent, from: Date) {
  const target = event.nextDate(from);
  const days = calculateUntil(target, from).days;
  const date = target.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const datedEventName = event.slug === "christmas" ? "Christmas Day" : event.shortName;
  return {
    target,
    days,
    description: `There are ${days} days until ${datedEventName} on ${date}. Add ${event.shortName} plus 30-day, 10-day, and 1-day reminders to your calendar free.`,
  };
}

export type CountdownOption = {
  id: string;
  label: string;
  category: "Popular" | "Holidays" | "Seasons" | "Personal";
  nextDate?: (from: Date) => Date;
};

const annual = (monthIndex: number, day: number) => (from: Date) => nextAnnualDate(from, monthIndex, day);
const calculated = (fn: (year: number) => Date) => (from: Date) => nextCalculatedAnnual(from, fn);

/**
 * A deliberately curated selector catalog, informed by current countdown products,
 * holiday directories, and common life-event use cases. Inclusion here does not create
 * an indexable route; dedicated landing pages remain a separate quality decision.
 */
export const COUNTDOWN_OPTIONS: CountdownOption[] = [
  { id: "christmas", label: "Christmas", category: "Popular", nextDate: annual(11, 25) },
  { id: "new-years-day", label: "New Year’s Day", category: "Popular", nextDate: annual(0, 1) },
  { id: "halloween", label: "Halloween", category: "Popular", nextDate: annual(9, 31) },
  { id: "thanksgiving", label: "Thanksgiving", category: "Popular", nextDate: nextThanksgiving },
  { id: "birthday", label: "Birthday", category: "Popular" },
  { id: "wedding", label: "Wedding", category: "Popular" },
  { id: "vacation", label: "Vacation", category: "Popular" },
  { id: "fourth-of-july", label: "Fourth of July", category: "Popular", nextDate: annual(6, 4) },
  { id: "new-years-eve", label: "New Year’s Eve", category: "Holidays", nextDate: annual(11, 31) },
  { id: "christmas-eve", label: "Christmas Eve", category: "Holidays", nextDate: annual(11, 24) },
  { id: "valentines-day", label: "Valentine’s Day", category: "Holidays", nextDate: annual(1, 14) },
  { id: "easter", label: "Easter", category: "Holidays", nextDate: calculated(easterSunday) },
  { id: "mothers-day", label: "Mother’s Day", category: "Holidays", nextDate: calculated((year) => nthWeekday(year, 4, 0, 2)) },
  { id: "fathers-day", label: "Father’s Day", category: "Holidays", nextDate: calculated((year) => nthWeekday(year, 5, 0, 3)) },
  { id: "memorial-day", label: "Memorial Day", category: "Holidays", nextDate: calculated((year) => lastWeekday(year, 4, 1)) },
  { id: "labor-day", label: "Labor Day", category: "Holidays", nextDate: calculated((year) => nthWeekday(year, 8, 1, 1)) },
  { id: "black-friday", label: "Black Friday", category: "Holidays", nextDate: calculated((year) => { const date = nthWeekday(year, 10, 4, 4); date.setDate(date.getDate() + 1); return date; }) },
  { id: "cyber-monday", label: "Cyber Monday", category: "Holidays", nextDate: calculated((year) => { const date = nthWeekday(year, 10, 4, 4); date.setDate(date.getDate() + 4); return date; }) },
  { id: "st-patricks-day", label: "St. Patrick’s Day", category: "Holidays", nextDate: annual(2, 17) },
  { id: "earth-day", label: "Earth Day", category: "Holidays", nextDate: annual(3, 22) },
  { id: "juneteenth", label: "Juneteenth", category: "Holidays", nextDate: annual(5, 19) },
  { id: "veterans-day", label: "Veterans Day", category: "Holidays", nextDate: annual(10, 11) },
  { id: "april-fools-day", label: "April Fools’ Day", category: "Holidays", nextDate: annual(3, 1) },
  { id: "cinco-de-mayo", label: "Cinco de Mayo", category: "Holidays", nextDate: annual(4, 5) },
  { id: "presidents-day", label: "Presidents’ Day", category: "Holidays", nextDate: calculated((year) => nthWeekday(year, 1, 1, 3)) },
  { id: "mlk-day", label: "Martin Luther King Jr. Day", category: "Holidays", nextDate: calculated((year) => nthWeekday(year, 0, 1, 3)) },
  { id: "hanukkah", label: "Hanukkah (choose date)", category: "Holidays" },
  { id: "diwali", label: "Diwali (choose date)", category: "Holidays" },
  { id: "lunar-new-year", label: "Lunar New Year (choose date)", category: "Holidays" },
  { id: "summer", label: "The first day of summer", category: "Seasons", nextDate: annual(5, 21) },
  { id: "spring", label: "The first day of spring", category: "Seasons", nextDate: annual(2, 20) },
  { id: "fall", label: "The first day of fall", category: "Seasons", nextDate: annual(8, 22) },
  { id: "winter", label: "The first day of winter", category: "Seasons", nextDate: annual(11, 21) },
  { id: "anniversary", label: "Anniversary", category: "Personal" },
  { id: "baby-due-date", label: "Baby’s due date", category: "Personal" },
  { id: "graduation", label: "Graduation", category: "Personal" },
  { id: "retirement", label: "Retirement", category: "Personal" },
  { id: "exam", label: "Exam", category: "Personal" },
  { id: "concert", label: "Concert", category: "Personal" },
  { id: "trip", label: "Trip", category: "Personal" },
  { id: "school-starts", label: "The first day of school", category: "Personal" },
  { id: "school-ends", label: "The last day of school", category: "Personal" },
  { id: "moving-day", label: "Moving day", category: "Personal" },
  { id: "product-launch", label: "Product launch", category: "Personal" },
  { id: "deadline", label: "Deadline", category: "Personal" },
  { id: "family-reunion", label: "Family reunion", category: "Personal" },
  { id: "cruise", label: "Cruise", category: "Personal" },
  { id: "flight", label: "Flight", category: "Personal" },
  { id: "new-job", label: "The first day of a new job", category: "Personal" },
  { id: "custom", label: "Something else", category: "Personal" },
];

export function getCountdownOption(id: string): CountdownOption | undefined {
  return COUNTDOWN_OPTIONS.find((option) => option.id === id);
}

export type UntilBreakdown = {
  totalMilliseconds: number;
  days: number;
  hours: number;
  minutes: number;
  weeks: number;
  averageMonths: number;
};

export function calculateUntil(target: Date, from: Date): UntilBreakdown {
  const totalMilliseconds = Math.max(0, target.getTime() - from.getTime());
  const totalHours = totalMilliseconds / 3_600_000;
  const days = Math.ceil(totalHours / 24);
  return {
    totalMilliseconds,
    days,
    hours: Math.floor((totalMilliseconds / 3_600_000) % 24),
    minutes: Math.floor((totalMilliseconds / 60_000) % 60),
    weeks: totalHours / 24 / 7,
    averageMonths: totalHours / 24 / 30.436875,
  };
}

export function formatDateInput(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
