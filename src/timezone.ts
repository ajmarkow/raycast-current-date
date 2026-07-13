export interface Preferences {
  timezoneType: "iana" | "utc";
  ianaTimezone: string;
  utcOffset: string;
  dateFormat: string;
}

function parseUtcOffsetHours(offset: string): number {
  const match = /^UTC([+-]\d{1,2})$/.exec(offset);
  return match ? Number(match[1]) : 0;
}

// Returns the zone's UTC offset in minutes at the given instant.
// IANA zones are resolved via Intl so DST is handled correctly.
export function getZoneOffsetMinutes(now: Date, prefs: Preferences): number {
  if (prefs.timezoneType === "utc") {
    return parseUtcOffsetHours(prefs.utcOffset) * 60;
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: prefs.ianaTimezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const wallClockUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));

  return Math.round((wallClockUtc - now.getTime()) / 60_000);
}
