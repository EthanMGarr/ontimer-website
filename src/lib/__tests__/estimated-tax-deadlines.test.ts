import assert from "node:assert/strict";
import {
  buildEstimatedTaxIcs,
  ESTIMATED_TAX_DEADLINES_2026,
  ESTIMATED_TAX_DEADLINES_2027,
  ESTIMATED_TAX_DEADLINES_2028,
  ESTIMATED_TAX_REMINDER_LEADS,
  getActiveEstimatedTaxSchedule,
  getUpcomingEstimatedTaxReminderEvents,
  reminderStart,
} from "../estimated-tax-deadlines";

assert.deepEqual(
  ESTIMATED_TAX_DEADLINES_2026.map(({ date }) => date),
  ["2026-04-15", "2026-06-15", "2026-09-15", "2027-01-15"],
  "the official 2026 calendar-year schedule should retain all four IRS dates",
);

assert.deepEqual(
  ESTIMATED_TAX_DEADLINES_2027.map(({ date }) => date),
  ["2027-04-15", "2027-06-15", "2027-09-15", "2028-01-18"],
  "the projected 2027 calendar-year schedule should retain all four reviewed dates",
);
assert.deepEqual(
  ESTIMATED_TAX_DEADLINES_2028.map(({ date }) => date),
  ["2028-04-17", "2028-06-15", "2028-09-15", "2029-01-16"],
  "the projected 2028 rollover should apply the standard weekend-and-holiday rules",
);

assert.equal(ESTIMATED_TAX_REMINDER_LEADS.length, 5, "the preset should contain five useful lead times");
const firstMonthReminder = reminderStart(ESTIMATED_TAX_DEADLINES_2027[0], ESTIMATED_TAX_REMINDER_LEADS[0], "09:00");
assert.equal(firstMonthReminder.getFullYear(), 2027);
assert.equal(firstMonthReminder.getMonth(), 2, "one month before April should be March");
assert.equal(firstMonthReminder.getDate(), 15);

const beforeSchedule = new Date(2027, 0, 1, 0, 0, 0);
const calendar = buildEstimatedTaxIcs(ESTIMATED_TAX_DEADLINES_2027, ESTIMATED_TAX_REMINDER_LEADS, "09:00", beforeSchedule);
assert.equal((calendar.match(/BEGIN:VEVENT/g) ?? []).length, 20, "the bundle should contain five reminders for four deadlines");
assert.match(calendar, /DTSTART:20270315T090000\r\n/, "the preset should stay at 9:00 AM in the importing calendar's local time");
assert.match(calendar, /1 month before reminder/);
assert.match(calendar, /IRS guidance: https:\/\/www\.irs\.gov\/faqs\/estimated-tax/);
assert.match(calendar, /automatic alarm with OnTimer/);

assert.equal(
  getUpcomingEstimatedTaxReminderEvents(
    ESTIMATED_TAX_DEADLINES_2027,
    ESTIMATED_TAX_REMINDER_LEADS,
    "09:00",
    new Date(2027, 3, 2, 12, 0, 0),
  ).length,
  18,
  "past lead reminders should be omitted while future reminders stay available",
);
assert.equal(
  getUpcomingEstimatedTaxReminderEvents(
    ESTIMATED_TAX_DEADLINES_2027,
    ESTIMATED_TAX_REMINDER_LEADS,
    "09:00",
    new Date(2027, 5, 15, 10, 0, 0),
  ).length,
  10,
  "a deadline should be omitted after its selected local reminder time passes",
);
assert.equal(
  getUpcomingEstimatedTaxReminderEvents(
    ESTIMATED_TAX_DEADLINES_2027,
    ESTIMATED_TAX_REMINDER_LEADS,
    "09:00",
    new Date(2028, 0, 18, 10, 0, 0),
  ).length,
  0,
  "the expired 2027 schedule should not create past events",
);
assert.equal(
  getUpcomingEstimatedTaxReminderEvents(
    ESTIMATED_TAX_DEADLINES_2028,
    ESTIMATED_TAX_REMINDER_LEADS,
    "09:00",
    new Date(2028, 0, 18, 10, 0, 0),
  ).length,
  20,
  "the projected 2028 rollover should remain useful after the 2027 schedule expires",
);
const remaining2026Schedule = getActiveEstimatedTaxSchedule(
  ESTIMATED_TAX_DEADLINES_2026,
  ESTIMATED_TAX_DEADLINES_2027,
  "09:00",
  new Date(2026, 10, 7, 9, 0, 0),
);
assert.equal(remaining2026Schedule.rolledForward, false);
assert.equal(remaining2026Schedule.deadlines[0].taxYear, 2026);
assert.equal(remaining2026Schedule.events.length, 5, "only five reminders for the final 2026 payment should remain");
assert.deepEqual(
  [...new Set(remaining2026Schedule.events.map(({ deadline }) => deadline.id))],
  ["q4"],
  "the expired first three 2026 installments should be omitted",
);

const rolled2026Schedule = getActiveEstimatedTaxSchedule(
  ESTIMATED_TAX_DEADLINES_2026,
  ESTIMATED_TAX_DEADLINES_2027,
  "09:00",
  new Date(2027, 0, 15, 10, 0, 0),
);
assert.equal(rolled2026Schedule.rolledForward, true);
assert.equal(rolled2026Schedule.deadlines[0].taxYear, 2027);

const rolledSchedule = getActiveEstimatedTaxSchedule(
  ESTIMATED_TAX_DEADLINES_2027,
  ESTIMATED_TAX_DEADLINES_2028,
  "09:00",
  new Date(2028, 0, 18, 10, 0, 0),
);
assert.equal(rolledSchedule.rolledForward, true);
assert.equal(rolledSchedule.deadlines[0].taxYear, 2028);
assert.equal(rolledSchedule.events.length, 20);

console.log("estimated-tax deadline tests passed");
