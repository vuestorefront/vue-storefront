import { t } from "i18next";
// import inquirer from 'inquirer';
import isReasonableFilename from "reasonable-filename";
import { text, isCancel } from "@clack/prompts";
import formatToProjectName from "./formatToProjectName";

import { logSimpleWarningMessage } from "../magento2/functions/terminalHelpers";

const getProjectName = async (message: string): Promise<string> => {
  const projectName = await text({
    message,
    validate: (value?: string): string | void => {
      if (!value?.trim()) {
        return t<string>("domain.project_name.is_empty");
      }

      if (!isReasonableFilename(value)) {
        return t<string>("domain.project_name.is_not_directory");
      }
      return undefined;
    },
  });

  if (isCancel(projectName)) {
    logSimpleWarningMessage(t("command.generate_store.message.canceled"));
    process.exit(0);
  }

  return formatToProjectName(projectName as string);
};

export default getProjectName;
