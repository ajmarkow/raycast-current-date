import { Clipboard, getPreferenceValues, Toast, updateCommandMetadata } from "@raycast/api";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

const command = async () => {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  await updateCommandMetadata({ subtitle: formatted });

  if (environment.launchType === LaunchType.UserInitiated) {
    await Clipboard.copy(formatted);
    await new Toast({ style: Toast.Style.Success, title: "Copied!", message: formatted }).show();
  }
};

export default command;
