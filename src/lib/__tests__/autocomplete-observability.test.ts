import assert from "node:assert/strict";
import {
  AUTOCOMPLETE_DIAGNOSTICS_END_AT,
  autocompleteDiagnosticsEnabled,
  autocompleteSourcePath,
  hashAutocompleteSession,
} from "../autocomplete-observability";

const session = "018f4d40-5840-7ddf-bd5c-1f5ca12a284f";
const hash = hashAutocompleteSession(session);

assert.equal(hash?.length, 16);
assert.equal(hash, hashAutocompleteSession(session));
assert.notEqual(hash, session);
assert.equal(hashAutocompleteSession("too-short"), undefined);
assert.equal(hashAutocompleteSession("contains spaces and an address"), undefined);
assert.equal(
  autocompleteSourcePath("https://www.ontimer.app/airport-time-to-leave-calculator?address=private"),
  "/airport-time-to-leave-calculator"
);
assert.equal(autocompleteSourcePath("not a URL"), undefined);
assert.equal(autocompleteDiagnosticsEnabled(AUTOCOMPLETE_DIAGNOSTICS_END_AT - 1), true);
assert.equal(autocompleteDiagnosticsEnabled(AUTOCOMPLETE_DIAGNOSTICS_END_AT), false);

console.log("autocomplete observability tests passed");
