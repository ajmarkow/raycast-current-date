import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";

const ZONES: { flag: string; label: string; timeZone: string }[] = [
  { flag: "🇬🇧", label: "UK", timeZone: "Europe/London" },
  { flag: "🇳🇱🇩🇪🇳🇴🇩🇰🇵🇱", label: "Central Europe", timeZone: "Europe/Berlin" },
  { flag: "🇷🇺", label: "Moscow", timeZone: "Europe/Moscow" },
  { flag: "🇮🇳", label: "India", timeZone: "Asia/Kolkata" },
];

function formatTime(now: Date, timeZone: string) {
  return now.toLocaleString(undefined, { timeZone, timeStyle: "short" });
}

export default function Command() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const subtitle = ZONES.map((zone) => `${zone.flag} ${formatTime(now, zone.timeZone)}`).join("   ");

  return (
    <List>
      {ZONES.map((zone) => (
        <List.Item
          key={zone.timeZone}
          icon={zone.flag}
          title={zone.label}
          subtitle={formatTime(now, zone.timeZone)}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy to Clipboard" content={subtitle} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
