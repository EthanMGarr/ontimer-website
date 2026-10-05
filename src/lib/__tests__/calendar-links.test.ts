import assert from "node:assert/strict";
import { buildGoogleCalendarLink, buildIcsCalendarDataUri, ONTIMER_CALENDAR_DESCRIPTION } from "../calendar-links";

const start = new Date(2026, 7, 9, 8, 30, 0);
const recalculateUrl = "https://www.ontimer.app/airport-time-to-leave-calculator?v=1&k=dep&a=EWR&dep=2026-10-12T14%3A59%3A00Z&ft=dom&bag=0&m=parking";
const recalculateDescription = `Recalculate: ${recalculateUrl}\n${ONTIMER_CALENDAR_DESCRIPTION}`;
const link = new URL(buildGoogleCalendarLink({
  title: "Leave for EWR",
  start,
  details: recalculateDescription,
}));

assert.equal(link.origin, "https://calendar.google.com");
assert.equal(link.pathname, "/calendar/r/eventedit");
assert.equal(link.searchParams.get("text"), "Leave for EWR");
assert.equal(link.searchParams.get("dates"), "20260809T083000/20260809T084500");
assert.equal(link.searchParams.get("details"), recalculateDescription);
assert.match(link.searchParams.get("details") ?? "", /^Recalculate: https:\/\/www\.ontimer\.app\//);
assert.match(link.searchParams.get("details") ?? "", /\?v=1&k=dep&a=EWR&dep=/);
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
  details: recalculateDescription,
  location: "123 Main St; Suite 2",
}).replace("data:text/calendar;charset=utf-8,", ""));
assert.match(ics, /BEGIN:VCALENDAR\r\nVERSION:2\.0/);
assert.match(ics, /DTSTART:20260809T123000Z/);
assert.match(ics, /DTEND:20260809T130000Z/);
assert.match(ics, /SUMMARY:Arrive at Smith\\, Jones & Co\./);
assert.match(ics, /LOCATION:123 Main St\\; Suite 2/);
assert.match(ics, /DESCRIPTION:Recalculate: https:\/\/www\.ontimer\.app\/airport-time-to-leave-calculator\?v=1&k=dep&a=EWR&dep=/);
assert.match(ics, /&ft=dom&bag=0&m=parking\\nCalculated by OnTimer\\nTurn this calendar event into an automatic alarm: https:\/\/apps\.apple\.com/);
assert.match(ics, /ct=web_saved_calendar_event/);

console.log("calendar link tests passed");
