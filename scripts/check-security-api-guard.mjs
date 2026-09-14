import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const route = await readFile(new URL("../src/app/api/security-wait/route.ts", import.meta.url), "utf8");
const guardPosition = route.indexOf("guardGoogleApiRequest(request, SECURITY_RATE_LIMIT)");
const providerPosition = route.indexOf("securityService.estimate(input)");

assert.ok(route.includes("process.env.TSA_WAIT_TIMES_API_KEY"), "licensed key must remain server-side");
assert.ok(route.includes("perIpLimit"), "security endpoint must retain per-IP limiting");
assert.ok(route.includes("globalLimit"), "security endpoint must retain global limiting");
assert.ok(guardPosition >= 0 && guardPosition < providerPosition, "request guard must run before any provider estimate");
assert.ok(route.includes('status: guard.reason === "rate_limited" ? 429 : 403'), "guard failures must be rejected");

console.log("security API cost guard checks passed");
