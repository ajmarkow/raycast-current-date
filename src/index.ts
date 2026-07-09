import {
  Clipboard,
  environment,
  getPreferenceValues,
  LaunchType,
  LocalStorage,
  Toast,
  updateCommandMetadata,
} from "@raycast/api";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

const BACKGROUND_REFRESH_CONFIRMED_KEY = "backgroundRefreshConfirmed";

const command = async () => {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  if (environment.launchType === LaunchType.Background) {
    await LocalStorage.setItem(BACKGROUND_REFRESH_CONFIRMED_KEY, true);
  }
  const backgroundRefreshConfirmed = await LocalStorage.getItem<boolean>(BACKGROUND_REFRESH_CONFIRMED_KEY);

  const subtitle = backgroundRefreshConfirmed
    ? `${formatted} · Enter to copy`
    : `${formatted} · Enable Background Refresh to auto-update`;

  await updateCommandMetadata({ subtitle });

  if (environment.launchType === LaunchType.UserInitiated) {
    await Clipboard.copy(formatted);
    await new Toast({
      style: Toast.Style.Success,
      title: "Copied to Clipboard",
      message: `${formatted} — this replaced your previous clipboard contents`,
    }).show();
  }
};

export default command;
