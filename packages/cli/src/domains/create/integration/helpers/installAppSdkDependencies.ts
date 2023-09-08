import { installDeps } from "../../../../utils";

export const installAppSdkDependencies = async (
  directoryName: string,
  packageManager: string
): Promise<void> => {
  await installDeps(
    {
      path: directoryName,
      entryMessage: "Installing SDK dependencies...",
      exitMessage: "SDK Dependencies have been installed successfully!",
    },
    packageManager
  );
};
