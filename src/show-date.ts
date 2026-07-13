import { Clipboard, environment, getPreferenceValues, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";
import strftime from "strftime";
import { getZoneOffsetMinutes, Preferences } from "./timezone";

const command = async () => {
  const prefs = getPreferenceValues<Preferences>();
  const now = new Date();
  const formatted = strftime.timezone(getZoneOffsetMinutes(now, prefs))(prefs.dateFormat || "%A, %B %d, %Y", now);

  await updateCommandMetadata({ subtitle: `${formatted} · Press enter to copy` });

  if (environment.launchType === LaunchType.UserInitiated) {
    await Clipboard.copy(formatted);
    const unsupported = formatted.match(/%[-_0]?[A-Za-z]/g) ?? [];
    await new Toast({
      style: Toast.Style.Success,
      title: "Copied to Clipboard",
      message:
        unsupported.length > 0
          ? `Unsupported tokens: ${[...new Set(unsupported)].join(", ")} — ${formatted}`
          : formatted,
    }).show();
  }
};

export default command;
