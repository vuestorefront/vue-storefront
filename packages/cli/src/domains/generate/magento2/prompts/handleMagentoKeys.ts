import { password, isCancel } from "@clack/prompts";
import { t } from "i18next";
import fs from "fs";
import path from "path";
import os from "os";
import { logSimpleWarningMessage } from "../functions/terminalHelpers";

const homeDir = os.homedir();

/** The answers expected in the form of 'inquirer'. */
type MagentoKeys = {
  accessKey: string;
  secretKey: string;
};

/** Handle input for Magento 2 access keys */
const handleMagentoKeys = async (): Promise<MagentoKeys> => {
  const accessKey = await password({
    message: t("command.generate_store.magento.access_key"),
  });

  const secretKey = await password({
    message: t("command.generate_store.magento.secret_key"),
  });

  if (isCancel(accessKey || secretKey)) {
    logSimpleWarningMessage(t("command.generate_store.message.canceled"));
    process.exit(0);
  }

  // creating auth.json file in home directory for composer
  await new Promise((resolve) => {
    //  if .composer directory does not exist, create it
    if (!fs.existsSync(path.join(homeDir, ".composer"))) {
      fs.mkdirSync(path.join(homeDir, ".composer"));
    }

    // check if file exists
    if (fs.existsSync(path.join(homeDir, ".composer", "auth.json"))) {
      // read file
      const authFile = fs.readFileSync(
        path.join(homeDir, ".composer", "auth.json"),
        "utf-8"
      );

      // parse JSON
      const authJson = JSON.parse(authFile);

      // check if keys are already in file
      authJson["http-basic"] = {
        "repo.magento.com": {
          username: accessKey,
          password: secretKey,
        },
      };

      // write file
      fs.writeFileSync(
        path.join(homeDir, ".composer", "auth.json"),
        JSON.stringify(authJson, null, 2),
        "utf-8"
      );
    } else {
      // create file
      const authJson = {
        "http-basic": {
          "repo.magento.com": {
            username: accessKey,
            password: secretKey,
          },
        },
        "bitbucket-oauth": {},
        "github-oauth": {},
        "gitlab-oauth": {},
        "gitlab-token": {},
        bearer: {},
      };

      fs.writeFileSync(
        path.join(homeDir, ".composer", "auth.json"),
        JSON.stringify(authJson, null, 2),
        "utf-8"
      );
    }

    resolve(1);
  });

  return {
    accessKey: accessKey as string,
    secretKey: secretKey as string,
  };
};

export default handleMagentoKeys;
