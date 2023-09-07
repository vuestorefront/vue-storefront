import { note } from "@clack/prompts";
import { t } from "i18next";
import { installMagentoImage } from "./docker";

import {
  copyAuth,
  handleGraphQL,
  handleSampleData,
  isGenerateSampleData,
} from "./functions";

import { logSimpleSuccessMessage } from "./functions/terminalHelpers";

interface MagentoDetails {
  isInstallMagento: boolean;
  magentoDirName: string;
  magentoDomain: string;
  magentoAccessKey: string;
  magentoSecretKey: string;
  writeLog: (message: string) => void;
}

/** Function responsible for all Magento 2 installation process */
export const installMagento = async ({
  magentoDirName,
  magentoDomain,
  magentoAccessKey,
  magentoSecretKey,
  writeLog,
}: MagentoDetails) => {
  await installMagentoImage(magentoDirName, magentoDomain, writeLog);
  await copyAuth(magentoDirName, magentoAccessKey, magentoSecretKey);
  await handleGraphQL(magentoDirName, writeLog);

  const isGenerateData = await isGenerateSampleData(
    t("command.generate_store.magento.sample_data")
  );

  if (isGenerateData) {
    await handleSampleData(magentoDirName, writeLog);
  } else {
    note(t("command.generate_store.magento.sample_data_note"));
  }

  logSimpleSuccessMessage(t("command.generate_store.magento.success"));
};
