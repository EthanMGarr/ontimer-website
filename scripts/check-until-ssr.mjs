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
  if (!html.includes('<meta property="og:description" content="There are ')) throw new Error(`${slug}: event-specific Open Graph description missing`);
  if (!html.includes('<meta name="twitter:description" content="There are ')) throw new Error(`${slug}: event-specific Twitter description missing`);
  if (!html.includes('"@type":"BreadcrumbList"')) throw new Error(`${slug}: BreadcrumbList structured data missing`);
}

const directoryHtml = readFileSync(join(root, ".next", "server", "app", "time-calculators.html"), "utf8");
if (directoryHtml.includes("Time Calculators | OnTimer | OnTimer")) throw new Error("time-calculators: duplicated brand in title");

const calculatorSource = readFileSync(join(root, "src", "app", "days-until", "UntilCalculator.tsx"), "utf8");
for (const expected of ["Turn these into {label || \"event\"} alarms!", "OnTimer is free to download and turns your calendar events into automatic alarms", "data-calendar-secondary-acquisition", "Get Automatic Alarms", "Free download on the App Store"]) {
  if (!calculatorSource.includes(expected)) throw new Error(`post-calendar focal copy missing: ${expected}`);
}
for (const retired of ["Add free alarms.", "Google Calendar opened in a new tab", "Your calendar file is ready."]) {
  if (calculatorSource.includes(retired)) throw new Error(`retired post-calendar narration returned: ${retired}`);
}
if ((calculatorSource.match(/setCalendarHandoff\(/g) ?? []).length < 4) throw new Error("both calendar actions must maintain the OnTimer handoff state");

console.log("until SSR checks passed");
