import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import vm from "node:vm";
import { createAnalyticsBootstrapScript, isWebsiteAnalyticsEnabled, WEBSITE_GA_MEASUREMENT_ID } from "../analytics-config";

const legacyMeasurementId = ["G", "XYPHC191FY"].join("-");
const iosStreamId = ["1322290", "5854"].join("");

type Harness = ReturnType<typeof createHarness>;

function createHarness(pathname: string, cookie = "ontimer_region=other") {
  const commands: unknown[][] = [];
  const scripts: Array<{ id?: string; src?: string; async?: boolean }> = [];
  const listeners = new Map<string, Array<(event: { detail?: string }) => void>>();
  const document = {
    cookie,
    head: { appendChild: (tag: { id?: string; src?: string; async?: boolean }) => scripts.push(tag) },
    createElement: () => ({}),
    getElementById: (id: string) => scripts.find((script) => script.id === id) ?? null,
  };
  const window = {
    location: { pathname },
    addEventListener(name: string, listener: (event: { detail?: string }) => void) {
      listeners.set(name, [...(listeners.get(name) ?? []), listener]);
    },
  } as Record<string, unknown>;
  const context = vm.createContext({ window, document, decodeURIComponent, encodeURIComponent, Date });
  const run = () => {
    vm.runInContext(createAnalyticsBootstrapScript(["/private"]), context);
    const dataLayer = (window.dataLayer ?? []) as Array<IArguments>;
    commands.splice(0, commands.length, ...dataLayer.map((entry) => Array.from(entry)));
  };
  const grantConsent = () => {
    document.cookie = "ontimer_region=regulated; ontimer_consent=granted";
    for (const listener of listeners.get("ontimer-consent") ?? []) listener({ detail: "granted" });
    const dataLayer = (window.dataLayer ?? []) as Array<IArguments>;
    commands.splice(0, commands.length, ...dataLayer.map((entry) => Array.from(entry)));
  };
  return { commands, context, document, grantConsent, listeners, run, scripts, window };
}

function assertSingleInitialization(harness: Harness) {
  assert.equal(harness.commands.filter(([command]) => command === "js").length, 1);
  const configs = harness.commands.filter(([command]) => command === "config");
  assert.equal(configs.length, 1, "one config call is the one initial page-view path");
  assert.equal(configs[0]?.[1], WEBSITE_GA_MEASUREMENT_ID);
  assert.equal(harness.scripts.length, 1);
  assert.equal(harness.scripts[0]?.src, `https://www.googletagmanager.com/gtag/js?id=${WEBSITE_GA_MEASUREMENT_ID}`);
}

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory() && entry.name === "__tests__") return [];
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
}

assert.equal(WEBSITE_GA_MEASUREMENT_ID, "G-9TLWB0XZVE");
assert.equal(isWebsiteAnalyticsEnabled("production"), true);
assert.equal(isWebsiteAnalyticsEnabled("development"), false);
assert.equal(isWebsiteAnalyticsEnabled(undefined), false);

const normal = createHarness("/");
normal.run();
normal.run();
assertSingleInitialization(normal);

const regulated = createHarness("/", "ontimer_region=regulated");
regulated.run();
assert.equal(regulated.commands.length, 0);
assert.equal(regulated.scripts.length, 0);
regulated.grantConsent();
regulated.grantConsent();
assertSingleInitialization(regulated);

const analyticsFree = createHarness("/private/schedule");
analyticsFree.run();
assert.equal(analyticsFree.commands.length, 0);
assert.equal(analyticsFree.scripts.length, 0);

const deployableFiles = sourceFiles(resolve("src"));
const deployableSource = deployableFiles.map((path) => readFileSync(path, "utf8")).join("\n");
assert.equal(deployableSource.includes(legacyMeasurementId), false, "legacy ID must not exist in deployable source");
assert.equal(deployableSource.includes(iosStreamId), false, "the website must not reuse the iOS stream ID");
assert.equal(deployableSource.includes("NEXT_PUBLIC_GA_MEASUREMENT_ID"), false, "deployment must not override the web stream ID");
assert.equal(deployableSource.match(/window\.gtag\("event", eventName/g)?.length, 1, "the central event dispatcher emits each requested custom event once");

console.log("analytics cutover tests passed");
