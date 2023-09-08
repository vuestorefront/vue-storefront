import { spawn } from "child_process";
import { spinner } from "@clack/prompts";
import picocolors from "picocolors";
import { t } from "i18next";

/** Generate sample data and upgrade */
const installDeps = async (
  vsfDirName: string,
  writeLog: (message: string) => void
) => {
  const options = {
    cwd: vsfDirName,
  };

  const sp = spinner();

  return new Promise((resolve) => {
    const install = spawn("yarn", options);

    sp.start(
      picocolors.cyan(t("command.generate_store.progress.install_deps_start"))
    );

    install.stdout.on("data", (data) => {
      writeLog(data.toString());
    });

    install.stderr.on("data", (data) => {
      writeLog(data.toString());
    });

    install.on("close", () => {
      sp.stop(
        picocolors.green(t("command.generate_store.progress.install_deps_end"))
      );
      resolve(1);
    });
  });
};

export default installDeps;
