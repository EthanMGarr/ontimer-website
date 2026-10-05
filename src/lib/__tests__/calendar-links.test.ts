import assert from "node:assert/strict";
import {
  buildDepartureAirportPlanCalendarDescription,
  buildGoogleCalendarLink,
  buildIcsCalendarDataUri,
  buildPickupAirportPlanCalendarDescription,
} from "../calendar-links";

const start = new Date(2026, 7, 9, 8, 30, 0);
const recalculateUrl = "https://www.ontimer.app/airport-time-to-leave-calculator?v=1&k=dep&a=EWR&dep=2026-10-12T14%3A59%3A00Z&ft=dom&bag=0&m=parking";
const recalculateDescription = buildDepartureAirportPlanCalendarDescription(recalculateUrl);
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
assert.match(link.searchParams.get("details") ?? "", /^Calculated by OnTimer - Never be late\n\nRecalculate Leave Time: https:\/\/www\.ontimer\.app\//);
assert.match(link.searchParams.get("details") ?? "", /\?v=1&k=dep&a=EWR&dep=/);
assert.equal(link.searchParams.has("location"), false);
assert.equal(
  buildDepartureAirportPlanCalendarDescription(recalculateUrl, "es"),
  `Creado con OnTimer - No llegues tarde\n\nRecalcular hora de salida: ${recalculateUrl}\n\nRecibe alarmas automáticas para los eventos de tu calendario: https://www.ontimer.app`,
);

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
assert.match(ics, /DESCRIPTION:Calculated by OnTimer - Never be late\\n\\nRecalculate Leave Time: https:\/\/www\.ontimer\.app\/airport-time-to-leave-calculator\?v=1&k=dep&a=EWR&dep=/);
assert.match(ics, /&ft=dom&bag=0&m=parking\\n\\nTurn this calendar event into an automatic alarm: https:\/\/apps\.apple\.com/);
assert.match(ics, /ct=web_saved_calendar_event/);

const pickupUrl = "https://www.ontimer.app/airport-pickup-time-calculator?v=1&k=pick&a=LAX&land=2026-11-03T07%3A05%3A00Z&ft=dom&bag=0&meet=inside";
const pickupDescription = buildPickupAirportPlanCalendarDescription(
  pickupUrl,
  "Picking up your passenger.",
);
assert.equal(
  pickupDescription,
  `Calculated by OnTimer - Never be late\n\nRecalculate Pickup Time: ${pickupUrl}\n\nPicking up your passenger.\n\nTurn this calendar event into an automatic alarm: https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601?pt=118607861&ct=web_saved_calendar_event&mt=8`,
);

console.log("calendar link tests passed");
