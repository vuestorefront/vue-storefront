import { spawn } from "child_process";
import { t } from "i18next";
import {
  logSimpleErrorMessage,
  logSimpleInfoMessage,
  simpleLog,
} from "../functions/terminalHelpers";

/** Checking if Docker is installed and running on user's machine */
const checkDocker = async (
  writeLog: (message: string) => void
): Promise<void> => {
  const docker =
    process.platform === "darwin"
      ? spawn("docker", ["info"])
      : spawn("sudo", ["docker", "info"]);

  docker.stderr.on("data", (data) => {
    writeLog(data.toString());
    simpleLog(data.toString());
  });

  const isDockerInstalled = await new Promise((resolve) => {
    docker.on("close", (code) => resolve(code === 0));
  });

  if (!isDockerInstalled) {
    writeLog(
      "Docker is not installed or not running. Please make sure that prerequisites are complied with and run command again."
    );
    logSimpleErrorMessage(
      "Docker is not installed or not running. Please make sure that prerequisites are complied with and run command again."
    );
    logSimpleInfoMessage(t("command.generate_store.magento.failed_log"));
    process.exit(1);
  } else {
    writeLog("🐳 Docker is installed and running.");
    logSimpleInfoMessage("🐳 Docker is installed and running.");
  }
};

export default checkDocker;
