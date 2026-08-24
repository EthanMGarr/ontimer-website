import assert from "node:assert/strict";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "../calendar-links";

const start = new Date(2026, 7, 9, 8, 30, 0);
const link = new URL(buildGoogleCalendarLink({
  title: "Leave for BWI",
  start,
  details: ONTIMER_CALENDAR_DESCRIPTION,
}));

assert.equal(link.origin, "https://calendar.google.com");
assert.equal(link.pathname, "/calendar/r/eventedit");
assert.equal(link.searchParams.get("text"), "Leave for BWI");
assert.equal(link.searchParams.get("dates"), "20260809T083000/20260809T084500");
assert.equal(link.searchParams.get("details"), ONTIMER_CALENDAR_DESCRIPTION);
assert.equal(link.searchParams.has("location"), false);

const appointmentLink = new URL(buildGoogleCalendarLink({
  title: "Arrive at appointment",
  start,
  end: new Date(2026, 7, 9, 9, 0, 0),
  location: "123 Main St",
}));
assert.equal(appointmentLink.searchParams.get("location"), "123 Main St");
assert.equal(appointmentLink.searchParams.get("dates"), "20260809T083000/20260809T090000");

const ics = decodeURIComponent(buildIcsCalendarDataUri({
  title: "Arrive at Smith, Jones & Co.",
  start,
  end: new Date(2026, 7, 9, 9, 0, 0),
  details: ONTIMER_CALENDAR_DESCRIPTION,
  location: "123 Main St; Suite 2",
}).replace("data:text/calendar;charset=utf-8,", ""));
assert.match(ics, /BEGIN:VCALENDAR\r\nVERSION:2\.0/);
assert.match(ics, /DTSTART:20260809T123000Z/);
assert.match(ics, /DTEND:20260809T130000Z/);
assert.match(ics, /SUMMARY:Arrive at Smith\\, Jones & Co\./);
assert.match(ics, /LOCATION:123 Main St\\; Suite 2/);
assert.match(ics, /DESCRIPTION:Calculated by OnTimer\\nGet the free iOS app: https:\/\/apps\.apple\.com/);

console.log("calendar link tests passed");
