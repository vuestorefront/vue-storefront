import { spawn } from "child_process";
import { t } from "i18next";
import {
  logSimpleErrorMessage,
  logSimpleSuccessMessage,
} from "./terminalHelpers";

const checkNodeVersion = (nodeString: string): boolean => {
  const nodeVersion = nodeString.split("v")[1]?.split(".")[0];
  const subNodeVersion = nodeString.split("v")[1]?.split(".")[1];

  if (Number(nodeVersion) === 16 && Number(subNodeVersion) >= 13) {
    return true;
  }

  return false;
};

/** Checking if Node version is correct as per prerequisites */
const checkNode = async (
  writeLog: (message: string) => void
): Promise<void> => {
  const node = spawn("node", ["-v"]);

  return await new Promise((resolve) => {
    node.stdout.on("data", (data) => {
      writeLog(data.toString());
      if (!checkNodeVersion(data.toString())) {
        logSimpleErrorMessage(t("command.generate_store.magento.node_not_ok"));
        process.exit(1);
      }
    });

    node.on("close", () => {
      writeLog(t("command.generate_store.magento.node_ok"));
      logSimpleSuccessMessage(t("command.generate_store.magento.node_ok"));
      resolve();
    });
  });
};

export default checkNode;
