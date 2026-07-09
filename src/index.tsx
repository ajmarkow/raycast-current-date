import { Clipboard, getPreferenceValues, MenuBarExtra, showHUD } from "@raycast/api";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

export default function Command() {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  return (
    <MenuBarExtra title={formatted}>
      <MenuBarExtra.Item
        title="Copy to Clipboard"
        onAction={async () => {
          await Clipboard.copy(formatted);
          await showHUD("Copied to Clipboard");
        }}
      />
    </MenuBarExtra>
  );
}
