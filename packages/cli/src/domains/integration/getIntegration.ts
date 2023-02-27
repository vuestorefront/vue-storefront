// import inquirer from 'inquirer';
import type Integration from './Integration';
import fetchIntegrations from './fetchIntegrations';
import { getGitRepositoryURL } from '../git-repository-url';

import { select } from '@clack/prompts';

type CustomIntegration = {
  name: string;
  gitRepositoryURL: null;
};

/** The answers expected in the form of 'inquirer'. */
// type Answers = {
//   integration: Integration | CustomIntegration;
// };

type Options = {
  message: string;
  customIntegrationRepositoryMessage: string;
};

const getIntegration = async (options: Options): Promise<Integration> => {
  const { message, customIntegrationRepositoryMessage } = options;

  const integrations = await fetchIntegrations();

  const customIntegration: CustomIntegration = {
    name: 'Custom integration',
    gitRepositoryURL: null
  };

  const choices = [...integrations, customIntegration].map((integration) => ({
    name: integration.name,
    value: integration.name
  }));

  const answer = await select({
    options: choices,
    message
  });

  if (answer !== customIntegration.name) {
    return integrations.find(
      (integration) => integration.name === answer
    ) as Integration;
  }

  return {
    name: customIntegration.name,
    gitRepositoryURL: await getGitRepositoryURL(
      customIntegrationRepositoryMessage
    )
  };
};

export default getIntegration;
