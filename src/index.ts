import { Clipboard, environment, getPreferenceValues, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

const command = async () => {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  await updateCommandMetadata({ subtitle: formatted });

  if (environment.launchType === LaunchType.UserInitiated) {
    const toast = new Toast({
      style: Toast.Style.Success,
      title: "Refreshed!",
      message: formatted,
    });
    toast.primaryAction = {
      title: "Copy to Clipboard",
      shortcut: { modifiers: ["ctrl"], key: "c" },
      onAction: () => Clipboard.copy(formatted),
    };
    await toast.show();
  }
};

export default command;
