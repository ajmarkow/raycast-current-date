import { getPreferenceValues, updateCommandMetadata } from "@raycast/api";
import { strftime } from "./strftime";
import { getZonedParts, Preferences } from "./timezone";

const command = async () => {
  const prefs = getPreferenceValues<Preferences>();
  const parts = getZonedParts(new Date(), prefs);
  const formatted = strftime(prefs.dateFormat || "%A, %B %d, %Y", parts);

  await updateCommandMetadata({ subtitle: `${formatted} | ⌘C or click to copy` });
};

export default command;
