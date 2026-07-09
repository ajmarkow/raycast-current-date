import { Clipboard, environment, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";
import { strftime } from "./strftime";
import { getPreferences, getZonedParts } from "./timezone";

const command = async () => {
  const prefs = getPreferences();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);
  const subtitle = formatted;

  await updateCommandMetadata({ subtitle });

  if (environment.launchType === LaunchType.UserInitiated) {
    const toast = new Toast({
      style: Toast.Style.Success,
      title: "Refreshed!",
      message: subtitle,
    });
    toast.primaryAction = {
      title: "Copy to Clipboard",
      shortcut: { modifiers: ["cmd", "shift"], key: "c" },
      onAction: () => Clipboard.copy(formatted),
    };
    await toast.show();
  }
};

export default command;
