const pad = (value: number) => String(value).padStart(2, "0");

export function getDefaultAirportEventTime(now = new Date()) {
  const eventTime = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  const remainder = eventTime.getMinutes() % 15;

  if (remainder !== 0) {
    eventTime.setMinutes(eventTime.getMinutes() + (15 - remainder), 0, 0);
  }

  return {
    date: `${eventTime.getFullYear()}-${pad(eventTime.getMonth() + 1)}-${pad(eventTime.getDate())}`,
    time: `${pad(eventTime.getHours())}:${pad(eventTime.getMinutes())}`,
  };
}
