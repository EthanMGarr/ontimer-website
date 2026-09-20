import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const slugs = ["christmas", "new-years-day", "halloween", "thanksgiving", "summer"];

for (const slug of slugs) {
  const htmlPath = join(root, ".next", "server", "app", "days-until", `${slug}.html`);
  const html = readFileSync(htmlPath, "utf8");
  const canonical = `https://www.ontimer.app/days-until/${slug}`;

  if (!/class="until-answer">\d+/.test(html)) throw new Error(`${slug}: numeric answer missing from initial HTML`);
  if (html.includes('class="until-answer">—')) throw new Error(`${slug}: placeholder answer leaked into initial HTML`);
  if (!/class="until-target">[^<]+, \d{4}</.test(html)) throw new Error(`${slug}: target date missing from initial HTML`);
  for (const label of ["full weeks", "extra days", "approx. hours"]) {
    if (!html.includes(`<span>${label}</span>`)) throw new Error(`${slug}: ${label} missing from initial HTML`);
  }
  if (!html.includes(`<meta property="og:url" content="${canonical}"`)) throw new Error(`${slug}: Open Graph URL is not canonical`);
  if (!/<title>[^<]*Countdown \d{4}: Days Until/.test(html)) throw new Error(`${slug}: countdown title missing`);
  if (!html.includes('<meta property="og:description" content="') || !html.includes(' countdown: ')) throw new Error(`${slug}: countdown Open Graph description missing`);
  if (!html.includes('<meta name="twitter:description" content="') || !html.includes(' days to go.')) throw new Error(`${slug}: countdown Twitter description missing`);
  if (!html.includes('Countdown & Days Until Calculator') && !html.includes('Countdown \\u0026 Days Until Calculator')) throw new Error(`${slug}: countdown structured-data name missing`);
  if (!html.includes('"@type":"BreadcrumbList"')) throw new Error(`${slug}: BreadcrumbList structured data missing`);
}

const directoryHtml = readFileSync(join(root, ".next", "server", "app", "time-calculators.html"), "utf8");
if (directoryHtml.includes("Time Calculators | OnTimer | OnTimer")) throw new Error("time-calculators: duplicated brand in title");

const calculatorSource = readFileSync(join(root, "src", "app", "days-until", "UntilCalculator.tsx"), "utf8");
for (const expected of ["Choose an event", "Name your event", "until-custom-event", "Name your event to continue", "Choose a date to see your countdown", "Turn these into {label || \"event\"} alarms!", "OnTimer is free. Turn calendar events into automatic alarms", "data-calendar-secondary-acquisition", "Get Automatic Alarms", "Works with Google Calendar, Apple Calendar, and Microsoft 365."]) {
  if (!calculatorSource.includes(expected)) throw new Error(`post-calendar focal copy missing: ${expected}`);
}
if (!calculatorSource.includes('eventId === "custom"')) throw new Error("custom event name input must be conditional on the Something else choice");
if (!calculatorSource.includes('disabled={!hasEventChoice}')) throw new Error("date input must wait for an explicit event choice");
if (!calculatorSource.includes('useState(initialDate || "")')) throw new Error("generic Days Until must not fabricate a default date");
if (!calculatorSource.includes('setDateValue(option.nextDate ? formatDateInput(option.nextDate(new Date())) : "")')) throw new Error("personal event choices must clear any automatic holiday date");
if (!calculatorSource.includes("initialNow && !hydrated ? parseUtcDate(dateValue) : parseLocalDate(dateValue)")) throw new Error("event countdown hydration must use the server-stable UTC target before switching to local time");
if (!calculatorSource.includes("setHydrated(true)")) throw new Error("event countdown must switch to the visitor's local time after hydration");
if (!calculatorSource.includes('timeZone: "UTC"')) throw new Error("event target-date label must remain stable across server and browser time zones");
for (const retired of ["Add free alarms.", "Google Calendar opened in a new tab", "Your calendar file is ready.", "free to download", "Free download on the App Store"]) {
  if (calculatorSource.includes(retired)) throw new Error(`retired post-calendar narration returned: ${retired}`);
}
if ((calculatorSource.match(/setCalendarHandoff\(/g) ?? []).length < 4) throw new Error("both calendar actions must maintain the OnTimer handoff state");

const genericPageSource = readFileSync(join(root, "src", "app", "days-until", "page.tsx"), "utf8");
if (!genericPageSource.includes("Choose an event and date.")) throw new Error("generic Days Until page must lead directly into the task");
const untilCss = readFileSync(join(root, "src", "app", "days-until", "until.css"), "utf8");
if (!untilCss.includes(".until-page:not(.until-page--event) .until-hero__art { display: none; }")) throw new Error("generic mobile hero art must not displace the calculator");

console.log("until SSR checks passed");
