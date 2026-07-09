import { Action, ActionPanel, getPreferenceValues, List, popToRoot, updateCommandMetadata } from "@raycast/api";
import { useEffect } from "react";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

export default function Command() {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  useEffect(() => {
    updateCommandMetadata({ subtitle: formatted });
  }, [formatted]);

  return (
    <List>
      <List.Item
        title={formatted}
        actions={
          <ActionPanel>
            <Action.CopyToClipboard
              title="Copy to Clipboard"
              content={formatted}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
              onCopy={() => popToRoot()}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
