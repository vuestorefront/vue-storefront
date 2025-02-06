import { spawn } from "child_process";

import { note, spinner } from "@clack/prompts";
import picocolors from "picocolors";
import { t } from "i18next";
import {
  logSimpleErrorMessage,
  logSimpleInfoMessage,
} from "../functions/terminalHelpers";
import removeDockerContainer from "./removeDocker";

/** Handles Magento 2 Docker Image installation */
const installMagentoImage = async (
  magentoDirName: string,
  magentoDomainName: string,
  writeLog: (message: string) => void
): Promise<any> => {
  const options = {
    cwd: magentoDirName,
  };

  const sp = spinner();

  return new Promise((resolve) => {
    const curl = spawn(
      "curl",
      [
        "-s",
        "https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup",
      ],
      options
    );
    const bash = spawn("bash", ["-s", "--", magentoDomainName], options);

    let stdout = "";

    note(t("command.generate_store.magento.note_long"));

    sp.start(
      picocolors.cyan(t("command.generate_store.progress.docker_start"))
    );

    curl.stdout.pipe(bash.stdin);

    bash.stdout.on("data", (data) => {
      if (
        data.toString().toLowerCase().includes("system") &&
        data.toString().toLowerCase().includes("password")
      ) {
        sp.stop(
          picocolors.yellow(t("command.generate_store.magento.password"))
        );
      }

      if (data.toString().includes("Restarting containers to apply updates")) {
        sp.start(
          picocolors.cyan(t("command.generate_store.progress.docker_start"))
        );
      }
    });

    bash.stderr.on("data", async (data) => {
      stdout += data.toString();
      if (stdout.includes("port is already allocated")) {
        sp.stop();
        logSimpleErrorMessage(t("command.generate_store.magento.port_busy"));
        // delete the directory
        await removeDockerContainer(magentoDirName);
      }
    });

    bash.on("exit", async (code) => {
      if (code === 0) {
        sp.stop(
          picocolors.green(t("command.generate_store.progress.docker_end"))
        );
        resolve(1);
      } else {
        sp.stop(
          picocolors.red(t("command.generate_store.progress.docker_failed"))
        );

        if (
          stdout.includes('Project directory "/var/www/html/." is not empty')
        ) {
          note(t("command.generate_store.magento.image_exists"));
        }
        // create a log file
        writeLog(stdout);

        logSimpleInfoMessage(t("command.generate_store.magento.failed_log"));
      }
    });
  });
};

export default installMagentoImage;
