import { t } from "i18next";
import isReasonableFilename from "reasonable-filename";

import { text, isCancel } from "@clack/prompts";
import { logSimpleWarningMessage } from "../functions/terminalHelpers";
import { formatToProjectName } from "../../project-name";
import { checkExistingDockerContainers } from "../docker";

/** Prompt user to enter Magento directory name */
const getMagentoDirName = async (message: string): Promise<string> => {
  const magentoDirName = await text({
    message,
    initialValue: "magento",
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

  if (isCancel(magentoDirName)) {
    logSimpleWarningMessage(t("command.generate_store.message.canceled"));
    process.exit(0);
  }

  const existingContainers = await checkExistingDockerContainers(
    formatToProjectName(magentoDirName as string)
  );

  if (existingContainers) {
    return getMagentoDirName(t("command.generate_store.magento.docker_exists"));
  }

  return formatToProjectName(magentoDirName as string);
};

export default getMagentoDirName;
