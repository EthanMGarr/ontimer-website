import assert from "node:assert/strict";
import { ticketmasterProviderEnabled } from "../ticketmaster-config";
import { ticketmasterDateTime } from "../ticketmaster-date-time";

assert.equal(
  ticketmasterDateTime(new Date("2026-09-20T12:34:56.789Z")),
  "2026-09-20T12:34:56Z",
);
assert.match(ticketmasterDateTime(new Date()), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);

for (const value of ["0", "false", "FALSE", "off", " disabled "]) {
  assert.equal(ticketmasterProviderEnabled(value), false, `${JSON.stringify(value)} should disable Ticketmaster`);
}
for (const value of [undefined, "", "1", "true", "enabled"]) {
  assert.equal(ticketmasterProviderEnabled(value), true, `${JSON.stringify(value)} should leave Ticketmaster enabled`);
}

console.log("ticketmaster-date-time tests passed");
