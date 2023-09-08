import fs from "fs";
import { confirm, isCancel, spinner, text } from "@clack/prompts";
import picocolors from "picocolors";
import { existsDirectory, log } from "../../../../utils";

export const handleDirectoryName = async (
  projectDir: string
): Promise<string> => {
  let directoryName = projectDir;
  const sp = spinner();

  if (!directoryName) {
    directoryName = (await text({
      message: "How we will name your integration?",
    })) as string;

    if (isCancel(directoryName)) {
      log("Integration creation has been canceled");
      process.exit(0);
    }
  }

  const isDirExists = await existsDirectory(directoryName);

  if (isDirExists) {
    const isOverwrite = await confirm({
      message: `Directory ${directoryName} already exists. Do you want to overwrite it?`,
      active: "Yes",
    });

    if (isCancel(isOverwrite)) {
      log("Integration creation has been canceled");
      process.exit(0);
    }

    if (isOverwrite) {
      sp.start(picocolors.cyan("deleting directory..."));
      await fs.rmSync(directoryName, { recursive: true, force: true });
      await fs.mkdirSync(directoryName);
      sp.stop(picocolors.green("directory has been deleted!"));
    } else {
      await handleDirectoryName("");
    }
  }

  return directoryName;
};
