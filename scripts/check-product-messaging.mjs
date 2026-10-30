import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const root = process.cwd();

function read(path) {
  return readFileSync(`${root}/${path}`, "utf8");
}

const requiredByFile = {
  "src/lib/product-facts.ts": [
    "PRODUCT_FACTS_VERSION",
    "customSounds",
    "eventControls",
    "earlyWarning",
    "timeToLeave",
    "timeToFly",
    "High Alert",
  ],
  "content/help/how-ontimer-alarms-work.md": [
    "Which Meetings Ring",
    "All Events in This Series",
    "iOS 26.1",
    "Time To Fly",
  ],
  "src/app/features/page.tsx": ["custom", "Event Cards", "Early Warning", "Time To Leave", "Time To Fly"],
  "src/app/compare/page.tsx": ["Methodology", "Last reviewed"],
};

const outlookFirstFiles = [
  "src/lib/product-facts.ts",
  "src/app/homepage2/page.tsx",
  "src/app/features/page.tsx",
  "src/components/Homepage2Footer.tsx",
  "src/lib/comparisons.ts",
  "public/llms.txt",
];

const failures = [];

for (const [path, phrases] of Object.entries(requiredByFile)) {
  const source = read(path);
  for (const phrase of phrases) {
    if (!source.includes(phrase)) failures.push(`${path} is missing required phrase: ${phrase}`);
  }
}

for (const path of outlookFirstFiles) {
  const source = read(path);
  if (!source.includes("Outlook")) failures.push(`${path} is missing customer-facing Outlook naming`);
  if (source.includes("Microsoft 365")) failures.push(`${path} presents Microsoft 365 as a customer-facing calendar name`);
}

const publicFiles = execFileSync(
  "rg",
  ["--files", "src/app", "src/components", "content", "-g", "*.tsx", "-g", "*.ts", "-g", "*.md"],
  { cwd: root, encoding: "utf8" }
).trim().split("\n").filter(Boolean);

publicFiles.push("public/llms.txt");

const forbidden = [
  /impossible to miss/i,
  /impossible to ignore/i,
  /can(?:not|['’]t) be (?:passively )?ignored/i,
  /doesn['’]t tolerate being ignored/i,
  /you can['’]t ignore/i,
  /alarms? (?:that )?(?:you )?can['’]t miss/i,
  /professionals can['’]t miss/i,
  /dismiss(?:ed)? or snooze/i,
  /snooze behavior/i,
  /Recurring Meeting Manager/,  // renamed to Which Meetings Ring in the iOS app
  /RELEASE_DATE/,  // placeholder: replace with the app release date before deploying
];

for (const path of publicFiles) {
  const source = read(path);
  for (const pattern of forbidden) {
    if (pattern.test(source)) failures.push(`${path} contains prohibited absolute claim: ${pattern}`);
  }
}

if (failures.length > 0) {
  console.error("Product messaging guardrails failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Product messaging guardrails passed.");
