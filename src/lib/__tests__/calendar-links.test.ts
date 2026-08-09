import assert from "node:assert/strict";
import { buildGoogleCalendarLink } from "../calendar-links";

const start = new Date(2026, 7, 9, 8, 30, 0);
const link = new URL(buildGoogleCalendarLink({
  title: "Leave for BWI",
  start,
  details: "Calculated by OnTimer",
}));

assert.equal(link.origin, "https://calendar.google.com");
assert.equal(link.pathname, "/calendar/r/eventedit");
assert.equal(link.searchParams.get("text"), "Leave for BWI");
assert.equal(link.searchParams.get("dates"), "20260809T083000/20260809T084500");
assert.equal(link.searchParams.get("details"), "Calculated by OnTimer");
assert.equal(link.searchParams.has("location"), false);

const appointmentLink = new URL(buildGoogleCalendarLink({
  title: "Arrive at appointment",
  start,
  end: new Date(2026, 7, 9, 9, 0, 0),
  location: "123 Main St",
}));
assert.equal(appointmentLink.searchParams.get("location"), "123 Main St");
assert.equal(appointmentLink.searchParams.get("dates"), "20260809T083000/20260809T090000");

console.log("calendar link tests passed");
