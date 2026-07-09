import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { strftime } from "./strftime";
import { getPreferences, getZonedParts } from "./timezone";

export default function Command() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const prefs = getPreferences();
  const parts = getZonedParts(now, prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  return (
    <List>
      <List.Item
        icon="📅"
        title={formatted}
        subtitle={prefs.timezone}
        actions={
          <ActionPanel>
            <Action.CopyToClipboard title="Copy to Clipboard" content={formatted} />
          </ActionPanel>
        }
      />
    </List>
  );
}
