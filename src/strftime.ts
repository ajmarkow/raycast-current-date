const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number;
  second: number;
  weekday: number; // 0-6, Sunday-based
  utcOffsetMinutes: number; // signed offset from UTC, e.g. +330 for UTC+5:30
}

// Minimal strftime supporting the common devhints.io/strftime directives.
export function strftime(format: string, parts: DateParts): string {
  const hour12 = parts.hour % 12 === 0 ? 12 : parts.hour % 12;

  const p = (n: number) => String(n).padStart(2, "0");
  const zSign = parts.utcOffsetMinutes >= 0 ? "+" : "-";
  const zAbs = Math.abs(parts.utcOffsetMinutes);
  const directives: Record<string, string> = {
    "%Y": String(parts.year),
    "%y": p(parts.year % 100),
    "%m": p(parts.month),
    "%-m": String(parts.month),
    "%d": p(parts.day),
    "%-d": String(parts.day),
    "%e": String(parts.day).padStart(2, " "),
    "%H": p(parts.hour),
    "%-H": String(parts.hour),
    "%I": p(hour12),
    "%-I": String(hour12),
    "%M": p(parts.minute),
    "%-M": String(parts.minute),
    "%S": p(parts.second),
    "%-S": String(parts.second),
    "%p": parts.hour < 12 ? "AM" : "PM",
    "%A": WEEKDAYS[parts.weekday],
    "%a": WEEKDAYS[parts.weekday].slice(0, 3),
    "%B": MONTHS[parts.month - 1],
    "%b": MONTHS[parts.month - 1].slice(0, 3),
    "%F": `${parts.year}-${p(parts.month)}-${p(parts.day)}`,
    "%T": `${p(parts.hour)}:${p(parts.minute)}:${p(parts.second)}`,
    "%R": `${p(parts.hour)}:${p(parts.minute)}`,
    "%z": `${zSign}${p(Math.floor(zAbs / 60))}${p(zAbs % 60)}`,
    "%%": "%",
  };

  return format.replace(/%-?[A-Za-z%]/g, (token) => directives[token] ?? token);
}
