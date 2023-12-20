import execa from "execa";
import { spinner } from "@clack/prompts";
import picocolors from "picocolors";

interface InstallDepsOptions {
  path: string;
  entryMessage: string;
  exitMessage: string;
}

/** Generate sample data and upgrade */
export const installDeps = async (
  { path, entryMessage, exitMessage }: InstallDepsOptions,
  packageManager: string
) => {
  const options = {
    cwd: path,
  };

  const sp = spinner();
  try {
    sp.start(picocolors.cyan(entryMessage));

    await execa(packageManager, ["install"], options);
    await execa(packageManager, ["install"], { cwd: `${options.cwd}/cli` });

    sp.stop(picocolors.green(exitMessage));
  } catch (error) {
    console.error("Error installing dependencies:", error);
  }
};
