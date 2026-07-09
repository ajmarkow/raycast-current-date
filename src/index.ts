import { Clipboard, environment, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";

const command = async () => {
  const now = new Date();

  const date = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const subtitle = `📅 ${date}`;
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
      onAction: () => Clipboard.copy(subtitle),
    };
    await toast.show();
  }
};

export default command;
