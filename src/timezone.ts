import { DateParts } from "./strftime";

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

// Converts a timeZoneName:'shortOffset' string (e.g. "GMT+5:30", "GMT-8") to signed minutes.
function parseShortOffsetToMinutes(tz: string): number {
  if (!tz || tz === "UTC" || tz === "GMT") return 0;
  const m = /^GMT([+-])(\d{1,2})(?::(\d{2}))?$/.exec(tz);
  if (!m) return 0;
  const sign = m[1] === "+" ? 1 : -1;
  return sign * (Number(m[2]) * 60 + Number(m[3] ?? "0"));
}

// Resolves the wall-clock date/time fields for the user's preferred timezone.
// IANA zones use Intl (handles DST); UTC offsets are fixed, so we shift the
// instant manually and read its UTC fields.
export function getZonedParts(now: Date, prefs: Preferences): DateParts {
  if (prefs.timezoneType === "utc") {
    const offsetHours = parseUtcOffsetHours(prefs.utcOffset);
    const shifted = new Date(now.getTime() + offsetHours * 3600_000);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
      hour: shifted.getUTCHours(),
      minute: shifted.getUTCMinutes(),
      second: shifted.getUTCSeconds(),
      weekday: shifted.getUTCDay(),
      utcOffsetMinutes: offsetHours * 60,
    };
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: prefs.ianaTimezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "short",
    timeZoneName: "shortOffset",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const weekdayName = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value ?? "";

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
    weekday: weekdays.indexOf(weekdayName),
    utcOffsetMinutes: parseShortOffsetToMinutes(tzName),
  };
}
