import { spawn } from "child_process";
import { t } from "i18next";
import {
  logSimpleErrorMessage,
  logSimpleInfoMessage,
  simpleLog,
} from "./terminalHelpers";

const checkYarnVersion = (yarnString: string): boolean => {
  const yarnVersion = yarnString.split(".")[0];

  if (Number(yarnVersion) === 1 || Number(yarnVersion) === 2) {
    return true;
  }

  return false;
};

/** Checking if Yarn is installed */
const checkYarn = async (
  writeLog: (message: string) => void
): Promise<void> => {
  const yarn =
    process.platform === "win32"
      ? spawn("yarn.cmd", ["--version"])
      : spawn("yarn", ["--version"]);

  yarn.stdout.on("data", (data) => {
    if (!checkYarnVersion(data.toString())) {
      writeLog(t("command.generate_store.magento.yarn_not_ok"));
      logSimpleErrorMessage(t("command.generate_store.magento.yarn_not_ok"));
      logSimpleInfoMessage(t("command.generate_store.magento.failed_log"));
      process.exit(1);
    }
  });

  yarn.stderr.on("data", (data) => {
    writeLog(data.toString());
    simpleLog(data.toString());
  });

  const isYarnVersionCorrect = await new Promise((resolve) => {
    yarn.on("close", (code) => resolve(code === 0));
  });

  if (!isYarnVersionCorrect) {
    writeLog(t("command.generate_store.magento.yarn_not_ok"));
    logSimpleErrorMessage(t("command.generate_store.magento.yarn_not_ok"));
    logSimpleInfoMessage(t("command.generate_store.magento.failed_log"));
    process.exit(1);
  }
};

export default checkYarn;
