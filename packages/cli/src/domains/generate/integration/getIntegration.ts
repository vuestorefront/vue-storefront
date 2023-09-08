import { select, isCancel } from "@clack/prompts";
import { t } from "i18next";
import type Integration from "./Integration";
import fetchIntegrations from "./fetchIntegrations";
import { getGitRepositoryURL } from "../git-repository-url";

import { logSimpleWarningMessage } from "../magento2/functions/terminalHelpers";

type CustomIntegration = {
  name: string;
  gitRepositoryURL: null;
};

type Options = {
  message: string;
  customIntegrationRepositoryMessage: string;
};

const getIntegration = async (options: Options): Promise<Integration> => {
  const { message, customIntegrationRepositoryMessage } = options;

  const integrations: Integration[] = await fetchIntegrations();

  const customIntegration: CustomIntegration = {
    name: "Custom integration",
    gitRepositoryURL: null,
  };

  const choices = [...integrations, customIntegration].map((integration) => ({
    name: integration.name,
    value: integration.name,
  }));

  const answer = await select({
    options: choices,
    message,
  });

  if (isCancel(answer)) {
    logSimpleWarningMessage(t("command.generate_store.message.canceled"));
    process.exit(0);
  }

  if (answer !== customIntegration.name) {
    const selectedIntegration = integrations.find(
      (integration) => integration.name === answer
    );

    if (!selectedIntegration) {
      throw new Error("Integration not found");
    }

    return selectedIntegration;
  }

  return {
    name: customIntegration.name,
    gitRepositoryURL: await getGitRepositoryURL(
      customIntegrationRepositoryMessage
    ),
  };
};

export default getIntegration;
