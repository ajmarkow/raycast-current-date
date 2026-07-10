import { Clipboard, environment, getPreferenceValues, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

const command = async () => {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  await updateCommandMetadata({ subtitle: `${formatted} · Press enter to copy` });

  if (environment.launchType === LaunchType.UserInitiated) {
    await Clipboard.copy(formatted);
    const unsupported = [...new Set(formatted.match(/%[A-Za-z]/g) ?? [])];
    await new Toast({
      style: Toast.Style.Success,
      title: unsupported.length > 0 ? `Copied — unsupported tokens: ${unsupported.join(", ")}` : "Copied to Clipboard",
      message: formatted,
    }).show();
  }
};

export default command;
