import { t } from "i18next";
import { confirm, isCancel } from "@clack/prompts";
import { logSimpleWarningMessage } from "../functions/terminalHelpers";

/** Pormpt user is they have Magento 2 keys */
const isMagentoKeys = async (message: string): Promise<boolean | symbol> => {
  const hasMagentoAccessKeys = await confirm({
    message,
    initialValue: true,
  });

  if (isCancel(hasMagentoAccessKeys)) {
    logSimpleWarningMessage(t("command.generate_store.message.canceled"));
    process.exit(0);
  }

  return hasMagentoAccessKeys;
};

export default isMagentoKeys;
