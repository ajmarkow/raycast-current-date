import { getPreferenceValues } from "@raycast/api";
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

// Raycast preferences can't make one dropdown's options depend on another
// preference's value, so IANA and UTC offset are separate preferences and
// timezoneType picks which one is actually used.
export function getSelectedTimezone(prefs: Preferences): string {
  return prefs.timezoneType === "utc" ? prefs.utcOffset : prefs.ianaTimezone;
}

// Resolves the wall-clock date/time fields for the user's preferred timezone.
// IANA zones use Intl (handles DST); UTC offsets are fixed, so we shift the
// instant manually and read its UTC fields.
export function getZonedParts(now: Date, prefs: Preferences): DateParts {
  if (prefs.timezoneType === "utc") {
    const shifted = new Date(now.getTime() + parseUtcOffsetHours(prefs.utcOffset) * 3600_000);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
      hour: shifted.getUTCHours(),
      minute: shifted.getUTCMinutes(),
      second: shifted.getUTCSeconds(),
      weekday: shifted.getUTCDay(),
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
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const weekdayName = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
    weekday: weekdays.indexOf(weekdayName),
  };
}

export function getPreferences(): Preferences {
  return getPreferenceValues<Preferences>();
}
