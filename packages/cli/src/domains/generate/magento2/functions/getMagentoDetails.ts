import fs from "fs";
import { t } from "i18next";
import { note } from "@clack/prompts";
import confirmOverwrite from "../prompts/confirmOverwrite";
import getMagentoDirName from "../prompts/getMagentoDirName";
import isMagentoKeys from "../prompts/isMagentoKeys";
import { logSimpleErrorMessage, simpleLog } from "./terminalHelpers";
import handleMagentoKeys from "../prompts/handleMagentoKeys";

const getMagentoDetails = async (projectName?: string) => {
  let magentoAccessKey: string;
  let magentoSecretKey: string;

  note(t("command.generate_store.magento.info"));

  let magentoDirName = await getMagentoDirName(
    t("command.generate_store.magento.directory")
  );

  if (magentoDirName === projectName) {
    logSimpleErrorMessage(
      t("command.generate_store.magento.error.same_dir", {
        magentoDirName,
        projectName,
      })
    );

    magentoDirName = await getMagentoDirName(
      t("command.generate_store.magento.directory")
    );
  }

  if (!fs.existsSync(magentoDirName)) {
    fs.mkdirSync(magentoDirName);
  } else {
    magentoDirName = await confirmOverwrite({
      message: t("command.generate_store.magento.overwrite", {
        magentoDirName,
      }),
      magentoDirName,
    });
  }

  const hasMagentoKeys = await isMagentoKeys(
    t("command.generate_store.magento.access_keys")
  );

  if (hasMagentoKeys) {
    simpleLog(t("command.generate_store.magento.provide_keys"));
    const { accessKey, secretKey } = await handleMagentoKeys();

    magentoAccessKey = accessKey;
    magentoSecretKey = secretKey;
  } else {
    simpleLog(t("command.generate_store.magento.no_keys"));

    simpleLog(t("command.generate_store.magento.provide_keys"));
    const { accessKey, secretKey } = await handleMagentoKeys();

    magentoAccessKey = accessKey;
    magentoSecretKey = secretKey;
  }

  return {
    magentoDirName,
    magentoAccessKey,
    magentoSecretKey,
  };
};

export default getMagentoDetails;
