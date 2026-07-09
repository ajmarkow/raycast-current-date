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

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number;
  second: number;
  weekday: number; // 0-6, Sunday-based
}

// Minimal strftime supporting the common devhints.io/strftime directives.
export function strftime(format: string, parts: DateParts): string {
  const hour12 = parts.hour % 12 === 0 ? 12 : parts.hour % 12;

  const directives: Record<string, string> = {
    "%Y": String(parts.year),
    "%y": pad(parts.year % 100),
    "%m": pad(parts.month),
    "%-m": String(parts.month),
    "%d": pad(parts.day),
    "%-d": String(parts.day),
    "%H": pad(parts.hour),
    "%-H": String(parts.hour),
    "%I": pad(hour12),
    "%-I": String(hour12),
    "%M": pad(parts.minute),
    "%-M": String(parts.minute),
    "%S": pad(parts.second),
    "%-S": String(parts.second),
    "%p": parts.hour < 12 ? "AM" : "PM",
    "%A": WEEKDAYS[parts.weekday],
    "%a": WEEKDAYS[parts.weekday].slice(0, 3),
    "%B": MONTHS[parts.month - 1],
    "%b": MONTHS[parts.month - 1].slice(0, 3),
    "%%": "%",
  };

  return format.replace(/%-?[A-Za-z%]/g, (token) => directives[token] ?? token);
}
